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