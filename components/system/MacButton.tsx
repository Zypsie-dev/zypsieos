import React from 'react';
import { Button, ButtonProps } from '@nextui-org/button';

export default function MacOSButton(props: ButtonProps) {
  return (
    <Button {...props} className={`macos-hand ${props.className || ''}`} >
      {props.children}
      </Button>
  );
}
