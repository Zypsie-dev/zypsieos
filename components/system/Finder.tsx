import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  File as FileIcon,
  HardDrive,
  Grid,
  List,
  Columns,
  Share2,
  Tag,
  Search,
  Clock,
  File as Docs,
  Dock
} from 'lucide-react';
import { Input } from '@nextui-org/input';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import Button from './MacButton';

import { useFileSystem } from '@/Context/FileSystemContext';
import { File, sideNavItems } from '@/types';
import Application from '@/public/Icons/Application';

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
  const [viewMode, setViewMode] = useState(ViewMode.GRID);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [currentView, setCurrentView] = useState<'folder' | 'recent' | 'tag'>(
    'folder'
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (currentView === 'folder') {
      setCurrentFiles(getChildren(currentDirectory));
    } else if (currentView === 'recent') {
      setCurrentFiles(recentFiles);
    } else if (currentView === 'tag' && selectedTag) {
      setCurrentFiles(getFilesByTag(selectedTag));
    }
  }, [
    currentDirectory,
    currentView,
    selectedTag,
    getChildren,
    recentFiles,
    getFilesByTag,
  ]);

  const currentFolder = files.find((f) => f.id === currentDirectory);

  const navigateUp = () => {
    if (currentFolder && currentFolder.parentId !== null) {
      setCurrentDirectory(currentFolder.parentId || '0');
    } else {
      setCurrentDirectory('0'); // Navigate to root
    }
  };

  const navigateTo = (file: File) => {
    if (file.type === 'folder') {
      setCurrentDirectory(file.id);
    }
  };

  const getBreadcrumbs = () => {
    const breadcrumbs: File[] = [];
    let current = currentFolder;

    while (current) {
      breadcrumbs.unshift(current);
      current = files.find((f) => f.id === current?.parentId);
    }

    return breadcrumbs;
  };

  const filteredFiles = currentFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const renderFileIcon = ({file,size} : {file:File , size:number}) => {
    if (file.type === 'folder') {
      return (
        <Image
          src="/icons/folder.ico"
          width={size ? size : 48}
          height={size ? size : 48}
          alt="Folder"
        />
      );
    } else {
      const extension = file.name.split('.').pop()?.toLowerCase();

      switch (extension) {
        case 'pdf':
          return <FileIcon size={32} className="text-red-500" />;
        case 'doc':
        case 'docx':
          return <FileIcon size={32} className="text-blue-600" />;
        case 'xls':
        case 'xlsx':
          return <FileIcon size={32} className="text-green-600" />;

          solid: return <FileIcon size={32} className="text-gray-500" />;
      }
    }
  };

  const sidebarItems : sideNavItems[] = [
    {
      id: 'favorites',
      title: 'Favorites',
      items: [
        { id: '0', name: 'Zypsie', icon: HardDrive },
        { id: 'recents', name: 'Recents', icon: Clock },
        {id: '1', name: 'Desktop', icon: Dock},
        { id: '2', name: 'Documents', icon: Docs },
        { id: '3', name: 'Applications', icon: Application },
      ],
    },
    // {
    //   id: 'tags',
    //   title: 'Tags',
    //   items: [
    //     { id: 'work', name: 'Work', icon: Tag, color: 'text-blue-500' },
    //     {
    //       id: 'personal',
    //       name: 'Personal',
    //       icon: Tag,
    //       color: 'text-green-500',
    //     },
    //     { id: 'system', name: 'System', icon: Tag, color: 'text-red-500' },
    //   ],
    // },
  ];

  const handleSidebarItemClick = (itemId: string) => {
    switch (itemId) {
      case 'airdrop':
      case 'icloud-drive':
      case 'shared':
        alert(`Navigating to ${itemId} is not implemented in this demo.`);
        break;
      case 'recents':
        setCurrentView('recent');
        break;
      case 'work':
      case 'personal':
      case 'system':
        setCurrentView('tag');
        setSelectedTag(itemId);
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
                  className="flex flex-col items-center macos-hand"
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
                      onClick={() => navigateTo(file)}
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