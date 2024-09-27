'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Image as Img } from '@nextui-org/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

import Button from './MacButton';

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

  const handlePhotoSelect = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
    setZoom(1);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPhoto(null);
    setZoom(1);
  }, []);

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedPhoto) return;
      const currentIndex = photos.findIndex(
        (photo) => photo.path === selectedPhoto.path
      );
      const newIndex =
        direction === 'prev'
          ? (currentIndex - 1 + photos.length) % photos.length
          : (currentIndex + 1) % photos.length;

      setSelectedPhoto(photos[newIndex]);
      setZoom(1);
    },
    [selectedPhoto, photos]
  );

  const handleZoom = useCallback((zoomIn: boolean) => {
    setZoom((prevZoom) => {
      const newZoom = zoomIn ? prevZoom * 1.2 : prevZoom / 1.2;

      return Math.min(Math.max(newZoom, 0.5), 3);
    });
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading photos...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,11rem))] gap-2 p-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-square w-fit h-fit"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Img
              isZoomed
              alt={photo.title}
              className="w-full h-full max-w-48 max-h-48 object-cover"
              src={photo.path}
              onClick={() => handlePhotoSelect(photo)}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="bg-background rounded-lg overflow-hidden w-full h-full max-w-xl max-h-[80%] flex flex-col"
              exit={{ scale: 0.9, opacity: 0 }}
              initial={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-grow overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    drag={zoom > 1}
                    dragConstraints={{
                      left: -((zoom - 1) * 300),
                      right: (zoom - 1) * 300,
                      top: -((zoom - 1) * 300),
                      bottom: (zoom - 1) * 300,
                    }}
                    style={{
                      scale: zoom,
                      cursor: zoom > 1 ? 'move' : 'auto',
                    }}
                  >
                    <Image
                      alt={selectedPhoto.title}
                      className="w-full h-full object-contain"
                      height={300}
                      src={selectedPhoto.path}
                      width={300}
                    />
                  </motion.div>
                </div>
                <Button
                  isIconOnly
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full"
                  variant="ghost"
                  onClick={handleCloseModal}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
                <div className="absolute bottom-4 right-4 space-x-2">
                  <Button
                    isIconOnly
                    className="text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full"
                    variant="ghost"
                    onClick={() => handleZoom(true)}
                  >
                    <ZoomIn className="h-6 w-6" />
                    <span className="sr-only">Zoom In</span>
                  </Button>
                  <Button
                    isIconOnly
                    className="text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full"
                    variant="ghost"
                    onClick={() => handleZoom(false)}
                  >
                    <ZoomOut className="h-6 w-6" />
                    <span className="sr-only">Zoom Out</span>
                  </Button>
                </div>
              </div>
              <div className="p-1 bg-background">
                <h2 className="text-xl font-bold mb-2">
                  {selectedPhoto.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedPhoto.description}
                </p>
              </div>
              <div className="flex justify-between p-1 bg-background">
                <Button
                  className="flex items-center text-sm"
                  variant="bordered"
                  onClick={() => handleNavigate('prev')}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  className="flex items-center text-sm"
                  variant="bordered"
                  onClick={() => handleNavigate('next')}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
