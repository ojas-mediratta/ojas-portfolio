import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, unlink, rmdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseShelf, syncReading } from './sync-reading.mjs';

const feed = (items = '', shelf = 'read') => `<rss><channel>
  <title>Ojas's bookshelf: ${shelf}</title>
  <link><![CDATA[https://www.goodreads.com/review/list_rss/161901344?shelf=${shelf}]]></link>
  ${items}
</channel></rss>`;
const item = (fields = '') => `<item>
  <book_id>123</book_id><title><![CDATA[Light & Matter]]></title>
  <author_name>A. Writer</author_name>${fields}
</item>`;

test('reads CDATA, personal rating, cover and dates without displaying review HTML', () => {
  const [book] = parseShelf(feed(item(`
    <user_rating>4</user_rating><average_rating>2.8</average_rating>
    <book_large_image_url>https://i.gr-assets.com/cover.jpg</book_large_image_url>
    <user_read_at>Wed, 12 Aug 2026 13:33:21 -0700</user_read_at>
    <user_review><![CDATA[<script>alert(1)</script>]]></user_review>`)), 'read');
  assert.equal(book.title, 'Light & Matter');
  assert.equal(book.rating, 4);
  assert.equal(book.finishedAt, '2026-08-12T20:33:21.000Z');
  assert.equal(book.cover, 'https://i.gr-assets.com/cover.jpg');
  assert.equal(book.url, 'https://www.goodreads.com/book/show/123');
  assert.equal('user_review' in book, false);
});

test('leaves missing dates and unrated books blank, and rejects unsafe image URLs', () => {
  const [book] = parseShelf(feed(item(`
    <user_rating>0</user_rating><average_rating>4.5</average_rating>
    <book_large_image_url>javascript:alert(1)</book_large_image_url>
    <user_read_at>unknown</user_read_at>`)), 'read');
  assert.equal(book.rating, null);
  assert.equal(book.finishedAt, null);
  assert.equal(book.cover, null);
});

test('sorts by finish date rather than feed order or date added, and limits to six books', () => {
  const items = Array.from({ length: 8 }, (_, i) => `<item>
    <book_id>${i + 1}</book_id><title>Book ${i + 1}</title><author_name>Writer</author_name>
    <user_read_at>2026-08-${String(i + 1).padStart(2, '0')}</user_read_at>
    <user_date_added>2026-09-${String(10 - i).padStart(2, '0')}</user_date_added>
  </item>`).join('');
  assert.deepEqual(parseShelf(feed(items), 'read').map((book) => book.id), ['8', '7', '6', '5', '4', '3']);
});

test('accepts an empty shelf but rejects errors, wrong shelves and incomplete books', () => {
  assert.deepEqual(parseShelf(feed(), 'read'), []);
  assert.throws(() => parseShelf('<html>Unavailable</html>', 'read'));
  assert.throws(() => parseShelf('<rss><channel>', 'read'));
  assert.throws(() => parseShelf(feed(), 'currently-reading'));
  assert.throws(() => parseShelf(feed('<item><title>Partial book</title></item>'), 'read'));
});

test('failed refresh preserves the existing snapshot; successful empty shelves clear it', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-reading-'));
  const output = join(directory, 'reading.json');
  try {
    await writeFile(output, 'previous snapshot');
    await assert.rejects(syncReading({
      output,
      fetchImpl: async (url) => url.searchParams.get('shelf') === 'read'
        ? { ok: false, status: 503 }
        : { ok: true, text: async () => feed('', 'currently-reading') },
    }));
    assert.equal(await readFile(output, 'utf8'), 'previous snapshot');
    await syncReading({ output, fetchImpl: async (url) => ({
      ok: true, text: async () => feed('', url.searchParams.get('shelf')),
    }) });
    const saved = JSON.parse(await readFile(output, 'utf8'));
    assert.deepEqual(saved.currentlyReading, []);
    assert.deepEqual(saved.recentlyRead, []);
  } finally {
    await unlink(output);
    await rmdir(directory);
  }
});
