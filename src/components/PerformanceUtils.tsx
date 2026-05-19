// Performance monitoring and optimization utilities
export function prefetchAsset(url: string): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
}

export function preloadCriticalAssets(): void {
  // Preload the most important assets with highest priority
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Preload avatar and first project thumbnail
      const criticalImages = [
        '/public/media/blip-auv/blip_thumb.webp',
        '/public/media/buzzcaster/buzzcaster_thumb.webp',
        '/public/media/et55/et55_thumb.webp'
      ];

      criticalImages.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }
}

export function setupIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void
): IntersectionObserver | null {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      rootMargin: '50px', // Start loading 50px before element enters viewport
      threshold: 0.1
    });
  }
  return null;
}
