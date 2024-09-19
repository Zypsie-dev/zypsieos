import React, { useMemo } from 'react';
import { Wifi, Search } from 'lucide-react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';

import { ControlCenter } from './ControlCenterIcon';
import Apple from './TopBar/appleLogo';
import Battery from './TopBar/battery';

import { siteConfig } from '@/config/site';
import { SiteConfig } from '@/types';

type IconComponentType =
  | React.ComponentType<{ size?: number | string }>
  | (({size}:{size:number}) => JSX.Element);

const iconComponents: Record<string, IconComponentType> = {
  Battery,
  Wifi,
  ControlCenter,
  Search,
};

const formatDateTime = () => {
  const now = new Date();
  const date = now
    .toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    .replace(',', '');
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${date} ${time}`;
};

export default function TopBar() {
  const dateTime = useMemo(() => formatDateTime(), []);
  const { navItems, navMenuIcons } = siteConfig as SiteConfig;

  return (
    <Navbar
      className="min-h-[1.5rem] h-2 flex flex-row frosted-glass topbar"
      maxWidth="full"
    >
      <NavbarBrand className="m-0 p-0 max-w-fit max-h-fit">
          <Apple color="white" size="0.93rem" />
      </NavbarBrand>
      <NavbarContent className="gap-4" justify="start">
        {navItems.map((item, index) => (
          <NavbarItem
            key={item.label}
            className={`hover:cursor-pointer text-tiny hover:macos-hand ${index === 0 ? 'font-semibold' : 'font-light'}`}
          >
            {item.label}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className="gap-3" justify="end">
        {navMenuIcons.map((item) => {
          const Icon = iconComponents[item.icon] || null;

          return Icon ? (
            <NavbarItem key={item.icon} className="text-tiny hover:macos-hand">
              <Icon size={item.size as number} />
            </NavbarItem>
          ) : null;
        })}
        <NavbarItem className="text-tiny">{dateTime}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
