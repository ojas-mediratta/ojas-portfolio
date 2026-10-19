import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/Container';
import MouseGlow from '@/components/MouseGlow';
import Reading from '@/sections/Reading';

export default function ReadingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-bg text-text antialiased">
      <MouseGlow />
      <div className="relative z-10 py-12 md:py-20">
        <Container>
          <Link to="/" className="inline-flex items-center gap-1 py-2 text-sm text-accent-cyan hover:text-accent-cyan hover:underline underline-offset-4">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back
          </Link>
        </Container>
        <Reading />
      </div>
    </main>
  );
}
