import { FileIcon } from 'lucide-react';
import Image from 'next/image';
export const renderFileIcon = ({ file, size }: { file: any; size: number }) => {
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
      let iconPath = '/Icons/files/';

      if (
        extension === 'jpg' ||
        extension === 'jpeg' ||
        extension === 'png' ||
        extension === 'webp'
      ) {
        iconPath = '/root/Photos/' + file.name;
      }

      switch (extension) {
        case 'pdf':
          return (
            <Image
            alt="PDF"
            height={size}
            src={iconPath + 'pdf.png'}
            width={size}
            />
          );
        case 'doc':
        case 'docx':
          return (
            <Image
            alt="DOCS"
            height={size}
              src={iconPath + 'docs.png'}
              width={size}
            />
          );
        case 'ppt':
          return (
            <Image
            alt="PPT"
            height={size}
              src={iconPath + 'ppt.png'}
              width={size}
            />
          );
        case 'mp3':
          return (
            <Image
            alt="MP3"
            height={size}
              src={iconPath + 'mp3.png'}
              width={size}
            />
          );
        case 'jpeg':
        case 'jpg':
        case 'png':
        case 'webp':
          return <Image alt="PDF" src={iconPath} height={size} width={size} />;
        default:
          return <FileIcon size={32} className="text-gray-500" />;
      }
    }
  };