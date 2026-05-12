import { useState, useEffect } from 'react';
import { PROJECTS } from '@/data/projects';
import avatarFile from '@/assets/avatar.webp';

const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}` : undefined;

interface AssetLoadingState {
  isLoading: boolean;
  progress: number;
  loadedAssets: number;
  totalAssets: number;
}

// Key for sessionStorage to track if assets have been loaded
const ASSETS_LOADED_KEY = 'portfolio_assets_loaded';

export function useAssetPreloader(): AssetLoadingState {
  const [loadingState, setLoadingState] = useState<AssetLoadingState>({
    isLoading: true,
    progress: 0,
    loadedAssets: 0,
    totalAssets: 0,
  });

  useEffect(() => {
    // Check if assets were already loaded in this session
    const assetsAlreadyLoaded = sessionStorage.getItem(ASSETS_LOADED_KEY) === 'true';
    
    if (assetsAlreadyLoaded) {
      // Skip loading screen for subsequent navigations
      setLoadingState({
        isLoading: false,
        progress: 100,
        loadedAssets: 0,
        totalAssets: 0,
      });
      return;
    }

    // Collect all critical assets to preload
    const criticalAssets: string[] = [];
    
    // Avatar image
    criticalAssets.push(avatarFile);
    
    // Project thumbnails (most important for initial view)
    PROJECTS.forEach(project => {
      if (project.thumb) {
        criticalAssets.push(withBase(project.thumb)!);
      }
    });

    // Set total assets
    setLoadingState(prev => ({ ...prev, totalAssets: criticalAssets.length }));

    let loadedCount = 0;

    const loadAsset = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (src.endsWith('.mp4')) {
          // For videos, just check if they exist (don't fully preload due to size)
          const video = document.createElement('video');
          video.onloadedmetadata = () => {
            loadedCount++;
            setLoadingState(prev => ({
              ...prev,
              loadedAssets: loadedCount,
              progress: (loadedCount / criticalAssets.length) * 100
            }));
            resolve();
          };
          video.onerror = () => {
            loadedCount++;
            setLoadingState(prev => ({
              ...prev,
              loadedAssets: loadedCount,
              progress: (loadedCount / criticalAssets.length) * 100
            }));
            resolve(); // Don't fail the whole loading process for one asset
          };
          video.preload = 'metadata';
          video.src = src;
        } else {
          // For images, fully preload
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            setLoadingState(prev => ({
              ...prev,
              loadedAssets: loadedCount,
              progress: (loadedCount / criticalAssets.length) * 100
            }));
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            setLoadingState(prev => ({
              ...prev,
              loadedAssets: loadedCount,
              progress: (loadedCount / criticalAssets.length) * 100
            }));
            resolve(); // Don't fail the whole loading process for one asset
          };
          img.src = src;
        }
      });
    };

    // Load all critical assets
    Promise.all(criticalAssets.map(asset => loadAsset(asset)))
      .then(() => {
        // Mark assets as loaded for this session
        sessionStorage.setItem(ASSETS_LOADED_KEY, 'true');
        
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setLoadingState(prev => ({
            ...prev,
            isLoading: false,
            progress: 100
          }));
        }, 500);
      })
      .catch((error) => {
        console.warn('Some assets failed to load:', error);
        // Still proceed even if some assets fail
        sessionStorage.setItem(ASSETS_LOADED_KEY, 'true');
        setTimeout(() => {
          setLoadingState(prev => ({
            ...prev,
            isLoading: false,
            progress: 100
          }));
        }, 500);
      });

  }, []);

  return loadingState;
}
