'use client';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { ReactNode } from 'react';

interface AppleProps {
  size: string;
  color: string;
  trigger: ReactNode;
  items: { key: string; label: string; isDanger?: boolean, shortCut?:string,section?:boolean }[];
}

const Menu = ({ trigger, items }: AppleProps) => {
  return (
    <Dropdown className='menu-glass m-0'>
      <DropdownTrigger className="hover:macos-hand">
        {trigger ? (
          trigger
        ) : (
          <p>Not found</p>
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            className={item.isDanger ? 'text-danger' : 'm-0 p-1.5 '}
            color={item.isDanger ? 'danger' : undefined}
            shortcut={item.shortCut}
           // showDivider={item.section}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Menu;
