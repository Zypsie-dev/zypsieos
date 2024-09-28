'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Image as Img } from '@nextui-org/image';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const handlePhotoSelect = useCallback(
    (photo: Photo) => {
      addWindow(
        photo.id,
        <PhotoViewer photoName={photo.path.replace('/root/Photos/', '')} />,
        800,
        450
      );
    },
    [addWindow]
  );

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (loading)
    return <div className="text-center mt-10">Loading photos...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="w-full h-full overflow-y-auto p-4 bg-gray-900">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto"
        columnClassName="bg-clip-padding px-2"
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Img
              isZoomed
              alt={photo.title}
              className="w-full h-auto object-cover rounded-lg cursor-pointer"
              src={photo.path}
              onClick={() => handlePhotoSelect(photo)}
            />
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
}
