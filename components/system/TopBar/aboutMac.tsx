import { Card, CardBody } from '@nextui-org/card';

import Button from '../MacButton';

export default function AboutMac() {
  return (
    <Card className="w-full h-full mx-auto shadow-lg"> {/* Full width and height based on parent */}
      <CardBody className="p-3 sm:p-4"> {/* Adjust padding as needed */}
        <div className="space-y-3 sm:space-y-4"> {/* Control spacing */}
          <div className="flex justify-center">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-sm sm:text-base font-semibold">MacBook Pro</h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              16-inch, 2021
            </p>
          </div>
          <div className="space-y-1 text-[10px] sm:text-xs"> {/* Adjust text size */}
            {[
              { label: 'Chip', value: 'Apple M1 Max' },
              { label: 'Memory', value: '32 GB' },
              { label: 'Startup disk', value: 'Macintosh HD' },
              { label: 'Serial number', value: 'X02YZ1ZYZX' },
              { label: 'macOS', value: 'Ventura 13.0' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-muted-foreground">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <Button size="sm" className="w-full">
            More Info...
          </Button>
          <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground">
            Regulatory Certification
            <br />
            TM and © 1983-2022 Apple Inc.
            <br />
            All Rights Reserved.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
