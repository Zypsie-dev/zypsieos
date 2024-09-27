import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Image as Img } from '@nextui-org/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

import Button from './MacButton';
import PhotoViewer from './PhotoViewer';
import { useWindowContext } from '@/Context/windowContext';

interface Photo {
  id: string;
  title: string;
  path: string;
  description: string;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { addWindow } = useWindowContext();

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/Photos');
        if (!response.ok) throw new Error('Failed to fetch photos');
        const data: Photo[] = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load photos. Please try again later.');
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  useEffect(() => {
    const updateWindowSize = () => {
      if (containerRef.current) {
        setWindowSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const handlePhotoSelect = useCallback((photo: Photo) => {
    addWindow(photo.id, <PhotoViewer photoName={photo.path.replace('/root/Photos/','')} /> , 800,450);
  }, []);


  if (loading)
    return <div className="text-center mt-10">Loading photos...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto">
      <div className="w-full h-full grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4 p-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-square w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Img
              isZoomed
              alt={photo.title}
              className="w-fit h-fit object-cover"
              src={photo.path}
              onClick={() => handlePhotoSelect(photo)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
