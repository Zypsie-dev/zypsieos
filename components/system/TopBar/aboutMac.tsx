import { Card, CardBody } from '@nextui-org/card';
import { Monitor } from 'lucide-react';

import Button from '@/components/system/MacButton';

const macInfo = [
  { label: 'Model', value: 'MacBook Pro' },
  { label: 'Size', value: '13-inch, 2021' },
  { label: 'Chip', value: 'Apple M3 Max' },
  { label: 'Memory', value: '32 GB' },
  { label: 'Startup disk', value: 'Macintosh HD' },
];

export default function AboutMac() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardBody className="p-6 space-y-6">
        <div className="flex justify-center">
          <Monitor className="w-16 h-16 text-primary" />
        </div>
        <div className="space-y-4">
          {macInfo.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                index < 2 ? 'text-center flex-col space-y-1' : ''
              }`}
            >
              <span
                className={`text-muted-foreground ${
                  index < 2
                    ? 'text-lg font-semibold text-foreground'
                    : 'text-sm'
                }`}
              >
                {item.label}
              </span>
              <span className={index < 2 ? 'text-sm' : 'text-sm font-medium'}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <Button className="w-full">More Info...</Button>
        {/* <p className="text-[10px] text-center text-muted-foreground">
          Regulatory Certification
          <br />
          TM and © 1983-2024 Apple Inc.
          <br />
          All Rights Reserved.
        </p> */}
      </CardBody>
    </Card>
  );
}
