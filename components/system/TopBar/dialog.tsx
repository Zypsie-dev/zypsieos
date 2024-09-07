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
  items: { key: string; label: string; isDanger?: boolean }[];
}

const Menu = ({ trigger, items }: AppleProps) => {
  return (
    <Dropdown>
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
            className={item.isDanger ? 'text-danger' : ''}
            color={item.isDanger ? 'danger' : undefined}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Menu;
