import Image from 'next/image';
import { useState } from 'react';

interface ImageViewerProps {
  photoName: string;
}

export default function Component(
  { photoName }: ImageViewerProps = { photoName: 'default-image.jpg' }
) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
        <p className="text-gray-500 text-center p-4">
          Failed to load image: {photoName}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={`/root/Photos/${photoName}`}
        alt={`Photo: ${photoName}`}
        layout="fill"
        objectFit="contain"
        className="rounded-lg"
        onError={handleError}
      />
    </div>
  );
}
