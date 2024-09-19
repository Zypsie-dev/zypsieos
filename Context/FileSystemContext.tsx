import React, { createContext, useContext, useState, useEffect } from 'react';

interface File {
  id: string;
  parentId: string | null;
  name: string;
  type: 'file' | 'folder';
  tags: string[];
  lastAccessed: Date;
}

interface FileSystemContextType {
  files: File[];
  addFile: (file: File) => void;
  deleteFile: (id: string) => void;
  updateFile: (id: string, updates: Partial<File>) => void;
  getChildren: (parentId: string | null) => File[];
  currentDirectory: string | null;
  setCurrentDirectory: React.Dispatch<React.SetStateAction<string | null>>;
  recentFiles: File[];
  getFilesByTag: (tag: string) => File[];
  addTag: (fileId: string, tag: string) => void;
  removeTag: (fileId: string, tag: string) => void;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(
  undefined
);

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);

  if (!context) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  
  return context;
};

export const FileSystemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<File[]>([
    {
      id: '0',
      parentId: null,
      name: 'Zypsie',
      type: 'folder',
      tags: [],
      lastAccessed: new Date(),
    },
    {
      id: '1',
      parentId: '0',
      name: 'Desktop',
      type: 'folder',
      tags: [],
      lastAccessed: new Date(),
    },
    {
      id: '2',
      parentId: '1',
      name: 'Documents',
      type: 'folder',
      tags: [],
      lastAccessed: new Date(),
    },
    {
      id: '3',
      parentId: '0',
      name: 'Applications',
      type: 'folder',
      tags: [],
      lastAccessed: new Date(),
    },
  ]);

  const [currentDirectory, setCurrentDirectory] = useState<string | null>('0');
  const [recentFiles, setRecentFiles] = useState<File[]>([]);

  useEffect(() => {
    updateRecentFiles();
  }, [files]);

  const addFile = (newFile: File) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      { ...newFile, lastAccessed: new Date() },
    ]);
  };

  const deleteFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const updateFile = (id: string, updates: Partial<File>) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id
          ? { ...file, ...updates, lastAccessed: new Date() }
          : file
      )
    );
  };

  const getChildren = (parentId: string | null) => {
    return files.filter((file) => file.parentId === parentId);
  };

  const updateRecentFiles = () => {
    const sortedFiles = [...files]
      .filter((file) => file.type === 'file')
      .sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
    setRecentFiles(sortedFiles.slice(0, 10)); // Get the 10 most recently accessed files
  };

  const getFilesByTag = (tag: string) => {
    return files.filter((file) => file.tags.includes(tag));
  };

  const addTag = (fileId: string, tag: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId && !file.tags.includes(tag)
          ? { ...file, tags: [...file.tags, tag] }
          : file
      )
    );
  };

  const removeTag = (fileId: string, tag: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId
          ? { ...file, tags: file.tags.filter((t) => t !== tag) }
          : file
      )
    );
  };

  return (
    <FileSystemContext.Provider
      value={{
        files,
        currentDirectory,
        addFile,
        deleteFile,
        updateFile,
        getChildren,
        setCurrentDirectory,
        recentFiles,
        getFilesByTag,
        addTag,
        removeTag,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};
