import fs from 'fs/promises';
import path from 'path';

import { parseFile } from 'music-metadata';

interface Song {
  title: string;
  artist: string;
  album: string;
  path: string;
}

export async function getMusicFiles(): Promise<Song[]> {
  const musicDir = path.join(process.cwd(), 'public', 'music');
  const files = await fs.readdir(musicDir);

  const songs: Song[] = await Promise.all(
    files
      .filter((file) =>
        ['.mp3', '.wav', '.ogg'].includes(path.extname(file).toLowerCase())
      )
      .map(async (file) => {
        const filePath = path.join(musicDir, file);
        const metadata = await parseFile(filePath);

        return {
          title: metadata.common.title || path.parse(file).name,
          artist: metadata.common.artist || 'Unknown Artist',
          album: metadata.common.album || 'Unknown Album',
          path: `/music/${file}`,
        };
      })
  );

  return songs;
}
