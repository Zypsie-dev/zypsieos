'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

import { useFileSystem } from '@/Context/FileSystemContext';
type TerminalLine = {
  text: string;
  type: 'input' | 'output' | 'error';
};

export default function Terminal() {
  const {
    files,
    addFile,
    deleteFile,
    updateFile,
    getChildren,
    currentDirectory,
    setCurrentDirectory,
    recentFiles,
    getFilesByTag,
    addTag,
    removeTag,
  } = useFileSystem();

  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: 'Welcome to macOS Terminal \n Enter help to see the commands lists.', type: 'output' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLine = (text: string, type: TerminalLine['type'] = 'output') => {
    setLines((prev) => [...prev, { text, type }]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    addLine(`${currentDirectory ?? '/'} $ ${input}`, 'input');
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    const [command, ...args] = input.split(' ');

    await executeCommand(command.toLowerCase(), args);

    setInput('');
  };

  const executeCommand = async (command: string, args: string[]) => {
    switch (command) {
      case 'ls':
        listDirectory();
        break;
      case 'cd':
        changeDirectory(args[0]);
        break;
      case process.env.DIR as string:
        await makeDirectory(args[0]);
        break;
      case process.env.TOUCH as string:
        await createFile(args[0]);
        break;
      case process.env.RM as string:
        await removeFile(args[0]);
        break;
      case process.env.MV as string:
        await moveFile(args[0], args[1]);
        break;
      case 'cat':
        await catFile(args[0]);
        break;
      case 'pwd':
        addLine(currentDirectory ?? '/');
        break;
      case 'tag':
        await handleTag(args[0], args[1]);
        break;
      case 'untag':
        await handleUntag(args[0], args[1]);
        break;
      case 'find':
        findFiles(args[0]);
        break;
      case 'recent':
        listRecentFiles();
        break;
      case 'clear':
        setLines([]);
        break;
      case 'help':
        showHelp();
        break;
      default:
        addLine(`Command not found: ${command}`, 'error');
    }
  };

  const listDirectory = () => {
    const currentDirId =
      files.find((f) => f.name === currentDirectory)?.id ?? null;
    const children = getChildren(currentDirId);

    if (children.length === 0) {
      addLine('Directory is empty');
    } else {
      children.forEach((file) => {
        const color = file.type === 'folder' ? 'text-blue-400' : '';

        addLine(`<span class="${color}">${file.name}</span>`);
      });
    }
  };

  const changeDirectory = (path: string) => {
    if (!path) {
      setCurrentDirectory(null);

      return;
    }

    let newPath: string | null;

    if (path === '..') {
      const currentDirId = files.find((f) => f.name === currentDirectory)?.id;
      const parentDir = files.find(
        (f) => f.id === files.find((f) => f.id === currentDirId)?.parentId
      );

      newPath = parentDir ? parentDir.name : null;
    } else if (path === '/') {
      newPath = null;
    } else {
      const currentDirId =
        files.find((f) => f.name === currentDirectory)?.id ?? null;
      const targetDir = getChildren(currentDirId).find(
        (f) => f.name === path && f.type === 'folder'
      );

      newPath = targetDir ? path : null;
    }

    if (newPath !== undefined) {
      setCurrentDirectory(newPath);
    } else {
      addLine(`cd: no such file or directory: ${path}`, 'error');
    }
  };

  const makeDirectory = async (name: string) => {
    if (!name) {
      addLine('mkdir: missing operand', 'error');

      return;
    }

    try {
      const currentDirId =
        files.find((f) => f.name === currentDirectory)?.id ?? null;
        
      await addFile({
        parentId: currentDirId,
        name,
        type: 'folder',
        tags: [],
      });
      addLine(`Directory '${name}' created`);
    } catch (error) {
      addLine(
        `mkdir: cannot create directory '${name}': An error occurred`,
        'error'
      );
    }
  };

  const createFile = async (name: string) => {
    if (!name) {
      addLine('touch: missing file operand', 'error');

      return;
    }

    try {
      const currentDirId =
        files.find((f) => f.name === currentDirectory)?.id ?? null;

      await addFile({
        parentId: currentDirId,
        name,
        type: 'file',
        tags: [],
      });
      addLine(`File '${name}' created`);
    } catch (error) {
      addLine(
        `touch: cannot create file '${name}': An error occurred`,
        'error'
      );
    }
  };

  const removeFile = async (name: string) => {
    if (!name) {
      addLine('rm: missing operand', 'error');

      return;
    }

    const currentDirId =
      files.find((f) => f.name === currentDirectory)?.id ?? null;
    const file = getChildren(currentDirId).find((f) => f.name === name);

    if (!file) {
      addLine(
        `rm: cannot remove '${name}': No such file or directory`,
        'error'
      );
      
      return;
    }

    try {
      await deleteFile(file.id!);
      addLine(`Removed '${name}'`);
    } catch (error) {
      addLine(`rm: cannot remove '${name}': An error occurred`, 'error');
    }
  };

  const moveFile = async (source: string, destination: string) => {
    if (!source || !destination) {
      addLine('mv: missing file operand', 'error');

      return;
    }

    const currentDirId =
      files.find((f) => f.name === currentDirectory)?.id ?? null;
    const sourceFile = getChildren(currentDirId).find((f) => f.name === source);
  

    if (!sourceFile) {
      addLine(
        `mv: cannot stat '${source}': No such file or directory`,
        'error'
      );

      return;
    }

    try {
      await updateFile(sourceFile.id!, { name: destination });
      addLine(`Renamed '${source}' to '${destination}'`);
    } catch (error) {
      addLine(
        `mv: cannot move '${source}' to '${destination}': An error occurred`,
        'error'
      );
    }
  };

  const catFile = async (name: string) => {
    if (!name) {
      addLine('cat: missing file operand', 'error');

      return;
    }

    const currentDirId =
      files.find((f) => f.name === currentDirectory)?.id ?? null;
    const file = getChildren(currentDirId).find(
      (f) => f.name === name && f.type === 'file'
    );

    if (!file) {
      addLine(`cat: ${name}: No such file or directory`, 'error');

      return;
    }

    // In a real implementation, you would fetch the file contents here
    addLine(`Contents of ${name}:`);
    addLine('(File contents would be displayed here)');
  };

  const handleTag = async (fileName: string, tag: string) => {
    if (!fileName || !tag) {
      addLine('tag: missing file name or tag', 'error');

      return;
    }

    const currentDirId =
      files.find((f) => f.name === currentDirectory)?.id ?? null;
    const file = getChildren(currentDirId).find((f) => f.name === fileName);

    if (!file) {
      addLine(`tag: ${fileName}: No such file or directory`, 'error');

      return;
    }

    addTag(file.id!, tag);
    addLine(`Added tag '${tag}' to '${fileName}'`);
  };

  const handleUntag = async (fileName: string, tag: string) => {
    if (!fileName || !tag) {
      addLine('untag: missing file name or tag', 'error');
      
      return;
    }

    const currentDirId =
      files.find((f) => f.name === currentDirectory)?.id ?? null;
    const file = getChildren(currentDirId).find((f) => f.name === fileName);

    if (!file) {
      addLine(`untag: ${fileName}: No such file or directory`, 'error');

      return;
    }

    removeTag(file.id!, tag);
    addLine(`Removed tag '${tag}' from '${fileName}'`);
  };

  const findFiles = (tag: string) => {
    if (!tag) {
      addLine('find: missing tag', 'error');

      return;
    }

    const foundFiles = getFilesByTag(tag);

    if (foundFiles.length === 0) {
      addLine(`No files found with tag '${tag}'`);
    } else {
      addLine(`Files with tag '${tag}':`);
      foundFiles.forEach((file) => addLine(file.name));
    }
  };

  const listRecentFiles = () => {
    if (recentFiles.length === 0) {
      addLine('No recent files');
    } else {
      addLine('Recent files:');
      recentFiles.forEach((file) => addLine(file.name));
    }
  };

  const showHelp = () => {
    addLine('Available commands:');
    addLine('  ls              - List directory contents');
    addLine('  cd <dir>        - Change directory');
    addLine('  cat <file>      - Display file contents');
    addLine('  pwd             - Print working directory');
    addLine('  tag <file> <tag> - Add a tag to a file');
    addLine('  untag <file> <tag> - Remove a tag from a file');
    addLine('  find <tag>      - Find files by tag');
    addLine('  recent          - List recent files');
    addLine('  clear           - Clear the terminal screen');
    addLine('  help            - Show this help message');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        setHistoryIndex((prev) => prev + 1);
        setInput(history[history.length - 1 - historyIndex - 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        setHistoryIndex((prev) => prev - 1);
        setInput(
          historyIndex === 0
            ? ''
            : history[history.length - 1 - historyIndex + 1]
        );
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const lastWord = input.split(' ').pop() || '';
      const currentDirId =
        files.find((f) => f.name === currentDirectory)?.id ?? null;
      const matches = getChildren(currentDirId)
        .filter((f) => f.name.startsWith(lastWord))
        .map((f) => f.name);

      if (matches.length === 1) {
        setInput((prev) =>
          prev.replace(new RegExp(`${lastWord}$`), matches[0])
        );
      } else if (matches.length > 1) {
        addLine(matches.join('  '));
      }
    }
  };

  return (
    <div className="bg-gray-900 text-green-400 font-mono text-sm w-full h-full flex flex-col p-3 shadow-lg border border-gray-700">
      <div className="flex-grow overflow-y-auto mb-2 custom-scrollbar">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`mb-1 ${
              line.type === 'input'
                ? 'text-blue-400'
                : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-green-400'
            }`}
          >
            {line.type === 'input' && (
              <span className="text-yellow-400 mr-2">{currentDirectory} $</span>
            )}
            <span dangerouslySetInnerHTML={{ __html: line.text }} />
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form
        className="flex items-center bg-gray-800 rounded px-3 py-2 m-0"
        onSubmit={handleSubmit}
      >
        <ChevronRight className="text-yellow-400 mr-2" size={16} />
        <span className="text-yellow-400 mr-2">{currentDirectory}</span>
        <span className="text-yellow-400 mr-2">$</span>
        <input
          ref={inputRef}
          className="flex-grow bg-transparent outline-none text-white"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
}
