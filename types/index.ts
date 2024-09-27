import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface NavItem {
  label: string;
}

export interface NavMenuIcon {
  icon: string;
  size: number | string;
}

export interface SiteConfig {
  navItems: NavItem[];
  navMenuIcons: NavMenuIcon[];
}

type FileType = 'file' | 'folder';

export interface File {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  parentId?: string | null;
  children?: File[];
  path?: string;
}

interface navItems {
  id: string | null;
  name: string;
  icon: any;
  color?: string;
}
export interface sideNavItems {
  id: string | null;
  title: string;
  icon?: any;
  items: navItems[];
}
