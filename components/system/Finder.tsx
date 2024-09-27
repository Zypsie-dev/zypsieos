import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  HardDrive,
  Grid,
  List,
  Search,
  Clock,
  Columns,
  Music,
} from 'lucide-react';
import { Input } from '@nextui-org/input';
import { Card, CardBody } from '@nextui-org/card';

import Button from './MacButton';
import PhotoViewer from './PhotoViewer';
import MusicPlayer from './MusicPlayer';

import { renderFileIcon } from '@/lib/renderFileIcon';
import { useFileSystem } from '@/Context/FileSystemContext';
import { useWindowContext } from '@/Context/windowContext';
import { File, sideNavItems } from '@/types';

const ViewMode = {
  GRID: 'grid',
  LIST: 'list',
  COLUMNS: 'columns',
};

export default function Component() {
  const {
    files,
    currentDirectory,
    getChildren,
    setCurrentDirectory,
    recentFiles,
    getFilesByTag,
  } = useFileSystem();
  const { addWindow } = useWindowContext();
  const [viewMode, setViewMode] = useState(ViewMode.GRID);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [currentView, setCurrentView] = useState<'folder' | 'recent' | 'tag'>(
    'folder'
  );

  useEffect(() => {
    if (currentView === 'folder') {
      setCurrentFiles(getChildren(currentDirectory) as any);
    } else if (currentView === 'recent') {
      setCurrentFiles(recentFiles as any);
    }
  }, [currentDirectory, currentView, getChildren, recentFiles, getFilesByTag]);

  const currentFolder = files.find((f) => f.id === currentDirectory);

  const navigateUp = () => {
    if (currentFolder && currentFolder.parentId !== null) {
      setCurrentDirectory(currentFolder.parentId);
    } else {
      setCurrentDirectory(null); // Navigate to root
    }
  };

  const navigateTo = (file: File) => {
    if (file.type === 'folder') {
      setCurrentDirectory(file.id);
    } else {
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (
        extension === 'jpg' ||
        extension === 'jpeg' ||
        extension === 'png' ||
        extension === 'webp'
      ) {
        addWindow(
          file.name,
          <PhotoViewer photoName={file.name}/>,
          600,
          400
        );
      }
      else if(extension === 'mp3' || extension === 'wav' || extension === 'flac') {
        addWindow(
          'Music',
          <MusicPlayer songName={file.name}/>,
          600,
          400
        );
      }
    }
  };

  const getBreadcrumbs = () => {
    const breadcrumbs: File[] = [];
    let current = currentFolder;

    while (current) {
      breadcrumbs.unshift(current as any);
      current = files.find((f) => f.id === current?.parentId);
    }

    return breadcrumbs;
  };

  const filteredFiles = currentFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const sidebarItems: sideNavItems[] = [
    {
      id: 'favorites',
      title: 'Favorites',
      items: [
        { id: null, name: 'Filesystem', icon: HardDrive },
        { id: 'recents', name: 'Recents', icon: Clock },
      ],
    },
  ];

  const handleSidebarItemClick = (itemId: string | null) => {
    switch (itemId) {
      case 'recents':
        setCurrentView('recent');
        break;
      case null:
        setCurrentView('folder');
        setCurrentDirectory(null);
        break;
      default:
        const folder = files.find((f) => f.id === itemId);

        if (folder && folder.type === 'folder') {
          setCurrentView('folder');
          setCurrentDirectory(folder.id);
        }
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 overflow-hidden macos-cursor">
      {/* Navigation bar */}
      <nav className="flex items-center justify-between py-1 bg-gray-700">
        <div className="flex items-center space-x-1">
          <Button isIconOnly variant="light" size="sm" onClick={navigateUp}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button disabled isIconOnly size="sm" variant="light">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            {getBreadcrumbs().map((folder, index) => (
              <React.Fragment key={folder.id}>
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => setCurrentDirectory(folder.id)}
                >
                  {folder.name}
                </Button>
                {index < getBreadcrumbs().length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            isIconOnly
            size="sm"
            variant={viewMode === ViewMode.GRID ? 'solid' : 'light'}
            onClick={() => setViewMode(ViewMode.GRID)}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant={viewMode === ViewMode.LIST ? 'solid' : 'light'}
            onClick={() => setViewMode(ViewMode.LIST)}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant={viewMode === ViewMode.COLUMNS ? 'solid' : 'light'}
            onClick={() => setViewMode(ViewMode.COLUMNS)}
          >
            <Columns className="h-4 w-4" />
          </Button>
          {searchOpen ? (
            <Input
              className="w-48 macos-cursor"
              placeholder="Search"
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          ) : (
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Card className="w-36 m-0 rounded-none bg-gray-600">
          <CardBody className="p-1">
            <div className="space-y-4">
              {sidebarItems.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xs font-semibold mb-2 text-gray-200">
                    {section.title}
                  </h3>
                  {section.items.map((item) => (
                    <Button
                      key={item.id}
                      className="w-full justify-start p-1"
                      size="sm"
                      variant="light"
                      onClick={() => handleSidebarItemClick(item.id)}
                    >
                      <item.icon
                        className={`mr-1 h-4 w-4 ${item.color || ''}`}
                      />
                      <span>{item.name}</span>
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Main content area */}
        <div className="flex-1 overflow-auto ">
          {viewMode === ViewMode.GRID && (
            <div className="flex space-x-3 flex-wrap p-4">
              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  className="flex flex-col items-center macos-hand max-w-20"
                  onClick={() => navigateTo(file)}
                >
                  {renderFileIcon({ file, size: 48 })}
                  <p className="text-center mt-1 truncate w-full text-xs text-black">
                    {file.name}
                  </p>
                </button>
              ))}
            </div>
          )}
          {viewMode === ViewMode.LIST && (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 macos-hand">
                  <th className="pt-2 pl-2">Name</th>
                  <th className="pt-2 pl-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file: File, index: number) => (
                  <tr
                    key={file.id}
                    className={`hover:bg-gray-200 macos-hand transition-colors duration-150 ease-in-out ${
                      index % 2 === 1 ? '' : 'bg-gray-300'
                    }`}
                    onClick={() => navigateTo(file)}
                  >
                    <td className="flex items-center">
                      <div className="w-6 h-6 flex items-center justify-center mr-2 m-0">
                        {renderFileIcon({ file, size: 20 })}
                      </div>
                      <span className="text-sm text-gray-900">{file.name}</span>
                    </td>
                    <td className="text-sm text-gray-600">{file.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {viewMode === ViewMode.COLUMNS && (
            <div className="flex overflow-x-auto text-black">
              {getBreadcrumbs().map((folder) => (
                <div
                  key={folder.id}
                  className="flex-none w-64 border-r border-gray-200 p-2"
                >
                  <h3 className="font-semibold mb-2">{folder.name}</h3>
                  {getChildren(folder.id).map((file) => (
                    <button
                      key={file.id}
                      className="flex items-center w-full p-1 hover:bg-gray-100 rounded"
                      onClick={() => navigateTo(file as any)}
                    >
                      {renderFileIcon({ file, size: 20 })}
                      <span className="ml-2 truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
