// FileIcon.tsx
import React from 'react';
import { File } from 'lucide-react';

interface FileIconProps {
  file: File;
  onClick: () => void;
}

export const FileIcon: React.FC<FileIconProps> = ({ file, onClick }) => {
  return (
    <button
      className="flex flex-col items-center m-2 cursor-pointer"
      onClick={onClick}
    >
      <File className="w-12 h-12 text-blue-500" />
      <span className="text-sm mt-1">{file.name}</span>
    </button>
  );
};

// Folder.tsx
import { useFileSystem } from '@/Context/FileSystemContext';
// import { FileIcon } from './FileIcon';

interface FolderProps {
  folderId: string;
}

export const Folder: React.FC<FolderProps> = ({ folderId }) => {
  const { files } = useFileSystem();
  const folder = files.find((f) => f.id === folderId);

  if (!folder || folder.type !== 'folder') {
    return null;
  }

  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      {folder.children?.map((file) => (
        <FileIcon
          key={file.id}
          file={file}
          onClick={() => {
            /* Handle file/folder open */
          }}
        />
      ))}
    </div>
  );
};

// // Desktop.tsx
// import React from 'react';
// import { Folder } from './Folder';

export const Desktop: React.FC = () => {
  return (
    <div className="h-screen bg-gray-200 p-4">
      <Folder folderId="desktop" />
    </div>
  );
};
