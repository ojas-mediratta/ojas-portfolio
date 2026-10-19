import { useState } from 'react';
import { ArrowUpRight, BookOpen, Star } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import reading from '@/data/reading.json';

type Book = {
  id: string;
  title: string;
  author: string;
  url: string;
  cover: string | null;
  rating: number | null;
  finishedAt: string | null;
};

function BookEntry({ book, finished }: { book: Book; finished: boolean }) {
  const [coverFailed, setCoverFailed] = useState(false);
  return (
    <li className="border-b border-border pb-6">
      <a
        href={book.url}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full items-start gap-4 text-text transition-colors hover:text-accent-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-purple"
      >
        <div className="flex h-28 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden border-2 border-border bg-panel">
          {book.cover && !coverFailed ? (
            <img
              src={book.cover}
              alt=""
              width={72}
              height={112}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
              onError={() => setCoverFailed(true)}
            />
          ) : <BookOpen className="size-6 text-subtext" aria-hidden="true" />}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-medium leading-snug group-hover:underline underline-offset-4">{book.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-subtext">{book.author}</p>
          {finished && book.rating !== null && (
            <div className="mt-3 flex gap-0.5 text-accent-purple" role="img" aria-label={`My rating: ${book.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3" fill={i < book.rating! ? 'currentColor' : 'none'} aria-hidden="true" />
              ))}
            </div>
          )}
          {finished && book.finishedAt && (
            <p className="mt-2 text-xs text-subtext">
              Finished <time dateTime={book.finishedAt}>{new Date(book.finishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })}</time>
            </p>
          )}
        </div>
      </a>
    </li>
  );
}

function Shelf({ title, books, finished = false }: { title: string; books: Book[]; finished?: boolean }) {
  return (
    <div className="mt-8">
      <h2 className="mb-5 text-sm font-medium text-subtext">{title}</h2>
      {books.length ? (
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => <BookEntry key={book.id} book={book} finished={finished} />)}
        </ul>
      ) : <p className="text-sm text-subtext">{finished ? 'No finished books on this shelf yet.' : 'Nothing on this shelf right now.'}</p>}
    </div>
  );
}

export default function Reading() {
  if (!reading.updatedAt) return null;
  return (
    <Section id="reading">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Reading</h1>
          <a href={reading.profileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 py-2 text-sm text-subtext transition-colors hover:text-accent-purple hover:underline underline-offset-4">
            Goodreads <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <Shelf title="Currently reading" books={reading.currentlyReading} />
        <Shelf title="Recently read" books={reading.recentlyRead} finished />
        <p className="mt-5 text-xs text-subtext">
          Updated <time dateTime={reading.updatedAt}>{new Date(reading.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>
        </p>
      </Container>
    </Section>
  );
}
