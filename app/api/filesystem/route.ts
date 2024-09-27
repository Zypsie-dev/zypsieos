import fs from 'fs/promises';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';
interface File {
  id: string;
  parentId: string | null;
  name: string;
  type: 'file' | 'folder';
  tags: string[];
  lastAccessed: Date;
}

const ROOT_DIR = path.join(process.cwd(), 'public', 'root');

async function readDirectoryStructure(
  dirPath: string,
  parentId: string | null = null
): Promise<File[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files: File[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(ROOT_DIR, fullPath);
    const id = Buffer.from(relativePath).toString('base64');

    if (entry.isDirectory()) {
      files.push({
        id,
        parentId,
        name: entry.name,
        type: 'folder',
        tags: [],
        lastAccessed: new Date(),
      });

      const children = await readDirectoryStructure(fullPath, id);

      files.push(...children);
    } else {
      files.push({
        id,
        parentId,
        name: entry.name,
        type: 'file',
        tags: [],
        lastAccessed: new Date(),
      });
    }
  }

  return files;
}

export async function GET() {
  try {
    await fs.mkdir(ROOT_DIR, { recursive: true }); // Ensure the root directory exists
    const files = await readDirectoryStructure(ROOT_DIR);

    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read directory structure' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, type, parentId } = await request.json();
    const parentPath = parentId
      ? path.join(ROOT_DIR, Buffer.from(parentId, 'base64').toString())
      : ROOT_DIR;
    const fullPath = path.join(parentPath, name);

    if (type === 'folder') {
      await fs.mkdir(fullPath, { recursive: true });
    } else {
      await fs.writeFile(fullPath, '');
    }

    return NextResponse.json(
      { message: 'File created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create file' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const relativePath = Buffer.from(id, 'base64').toString();
    const fullPath = path.join(ROOT_DIR, relativePath);

    await fs.rm(fullPath, { recursive: true, force: true });
    
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = await request.json();
    const relativePath = Buffer.from(id, 'base64').toString();
    const fullPath = path.join(ROOT_DIR, relativePath);
    const newPath = updates.name
      ? path.join(path.dirname(fullPath), updates.name)
      : fullPath;

    if (updates.name && fullPath !== newPath) {
      await fs.rename(fullPath, newPath);
    }

    return NextResponse.json({ message: 'File updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    );
  }
}
