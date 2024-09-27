import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const imageDir = path.join(process.cwd(), 'public', 'root','Photos');
  const files = await fs.readdir(imageDir);

  const images = files
    .filter((file) =>
      ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(
        path.extname(file).toLowerCase()
      )
    )
    .map((file) => ({
      title: path.parse(file).name,
      path: `/root/Photos/${file}`,
    }));

  return NextResponse.json(images);
}
