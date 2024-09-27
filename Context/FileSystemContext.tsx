'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface File {
  id: string | null;
  parentId: string | null;
  name: string;
  type: 'file' | 'folder';
  tags: string[];
  lastAccessed: Date;
}

interface FileSystemContextType {
  files: File[];
  addFile: (file: Omit<File, 'id' | 'lastAccessed'>) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  updateFile: (id: string, updates: Partial<File>) => Promise<void>;
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
  const [files, setFiles] = useState<File[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState<string | null>(null);
  const [recentFiles, setRecentFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    updateRecentFiles();
  }, [files]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/filesystem');
      const data = await response.json();

      setFiles(data);
      setCurrentDirectory(currentDirectory?currentDirectory:null);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const addFile = async (newFile: Omit<File, 'id' | 'lastAccessed'>) => {
    try {
      await fetch('/api/filesystem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFile),
      });
      await fetchFiles();
    } catch (error) {
      console.error('Failed to add file:', error);
    }
  };

  const deleteFile = async (id: string) => {
    try {
      await fetch('/api/filesystem', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      await fetchFiles();
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const updateFile = async (id: string, updates: Partial<File>) => {
    try {
      await fetch('/api/filesystem', {
        method: 'PUT',
        
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates }),
      });
      await fetchFiles();
    } catch (error) {
      console.error('Failed to update file:', error);
    }
  };

  const getChildren = (parentId: string | null) => {
    return files.filter((file) => file.parentId === parentId);
  };

  const updateRecentFiles = () => {
    const sortedFiles = [...files]
      .filter((file) => file.type === 'file')
      .sort(
        (a, b) =>
          new Date(b.lastAccessed).getTime() -
          new Date(a.lastAccessed).getTime()
      );
      
    setRecentFiles(sortedFiles.slice(0, 10));
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
