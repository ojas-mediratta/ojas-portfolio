import { writeFile, rename } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

const userId = '161901344';
const profileUrl = `https://www.goodreads.com/user/show/${userId}-ojas`;
const defaultOutput = fileURLToPath(new URL('../src/data/reading.json', import.meta.url));
const parser = new XMLParser({ parseTagValue: false, isArray: (name) => name === 'item' });
const text = (value) => typeof value === 'string' ? value.trim() : '';

function date(value) {
  const timestamp = Date.parse(text(value));
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null;
}

function imageUrl(value) {
  try {
    const url = new URL(text(value));
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

export function parseShelf(xml, shelf) {
  if (/<!DOCTYPE/i.test(xml) || XMLValidator.validate(xml) !== true) {
    throw new Error(`Invalid XML for ${shelf}`);
  }
  const channel = parser.parse(xml)?.rss?.channel;
  if (!channel || !text(channel.title) || !text(channel.link)) {
    throw new Error(`Expected a Goodreads RSS feed for ${shelf}`);
  }
  const source = new URL(text(channel.link));
  if (source.hostname !== 'www.goodreads.com' ||
      source.pathname !== `/review/list_rss/${userId}` ||
      source.searchParams.get('shelf') !== shelf) {
    throw new Error(`Unexpected Goodreads shelf: ${shelf}`);
  }
  const books = new Map();
  for (const item of channel.item ?? []) {
    const id = text(item.book_id);
    const title = text(item.title);
    const author = text(item.author_name);
    if (!/^\d+$/.test(id) || !title || !author) {
      throw new Error(`Incomplete book in ${shelf}; keeping the previous snapshot`);
    }
    const rating = Number(item.user_rating);
    books.set(id, {
      id,
      title,
      author,
      url: `https://www.goodreads.com/book/show/${id}`,
      cover: imageUrl(item.book_large_image_url) ?? imageUrl(item.book_medium_image_url),
      rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : null,
      finishedAt: date(item.user_read_at),
      addedAt: date(item.user_date_added),
    });
  }
  const timestamp = (book) => Date.parse((shelf === 'read' && book.finishedAt) || book.addedAt || '') || 0;
  return [...books.values()].sort((a, b) => timestamp(b) - timestamp(a)).slice(0, 6);
}

async function fetchShelf(shelf, fetchImpl) {
  const url = new URL(`https://www.goodreads.com/review/list_rss/${userId}`);
  url.search = new URLSearchParams({
    shelf, per_page: '100', sort: shelf === 'read' ? 'date_read' : 'date_added', order: 'd',
  }).toString();
  const response = await fetchImpl(url, {
    headers: { Accept: 'application/rss+xml, application/xml, text/xml', 'User-Agent': 'OjasPortfolio/1.0' },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Goodreads ${shelf}: HTTP ${response.status}`);
  return parseShelf(await response.text(), shelf);
}

export async function syncReading({ fetchImpl = fetch, output = defaultOutput } = {}) {
  // Write only after both shelves succeed. A failed refresh never erases good data.
  const [currentlyReading, recentlyRead] = await Promise.all([
    fetchShelf('currently-reading', fetchImpl),
    fetchShelf('read', fetchImpl),
  ]);
  const snapshot = { profileUrl, updatedAt: new Date().toISOString(), currentlyReading, recentlyRead };
  await writeFile(`${output}.tmp`, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  await rename(`${output}.tmp`, output);
  return snapshot;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  syncReading().then((data) => {
    console.log(`Reading refreshed: ${data.currentlyReading.length} current, ${data.recentlyRead.length} finished.`);
  }).catch((error) => {
    console.error(`Reading refresh failed: ${error.message}`);
    process.exitCode = 1;
  });
}
