'use client';

import React, { useEffect, useState } from 'react';

interface BatteryStatus {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export default function Battery() {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getBatteryInfo = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery: any = await (navigator as any).getBattery();

          updateBatteryStatus(battery);

          battery.addEventListener('chargingchange', () =>
            updateBatteryStatus(battery)
          );
          battery.addEventListener('levelchange', () =>
            updateBatteryStatus(battery)
          );
        } catch (error) {
          console.error('Error accessing battery information:', error);
        }
      } else {
        console.log('Battery API not supported');
      }
    };

    const updateBatteryStatus = (battery: any) => {
      setBatteryStatus({
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level * 100,
      });
    };

    getBatteryInfo();
  }, []);

  if (!batteryStatus) {
    return (
      <div className="text-sm text-gray-500">
        <svg
          className="hover:macos-hand"
          fill="none"
          height="24"
          viewBox="0 0 26 20"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            width="18"
            x="1"
            y="7"
          />

          <rect fill="currentColor" height="4" width="2" x="20" y="10" />

        </svg>
      </div>
    );
  }

  const getBatteryIcon = () => {
    const fillWidth = Math.max(0, Math.min(100, batteryStatus.level)) * 0.165; // 21.5 is the width of the battery body

    return (
      <svg
        className="hover:macos-hand"
        fill="none"
        height="24"
        viewBox="0 0 26 20"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          width="18"
          x="1"
          y="7"
        />

        <rect fill="currentColor" height="4" width="2" x="20" y="10" />

        <rect fill="#34C759" height="8" width={fillWidth} x="2" y="8" />

        {batteryStatus.charging && (
          <path
            d="M10 8.5 L8 11.5 H11 L9 14.5 L12 11.5 H9 L10 8.5"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        )}
      </svg>
    );
  };

  // const getTimeEstimate = () => {
  //   if (batteryStatus.charging) {
  //     return batteryStatus.chargingTime !== Infinity
  //       ? `${Math.round(batteryStatus.chargingTime / 60)} min until full`
  //       : 'Calculating...';
  //   }

  //   return batteryStatus.dischargingTime !== Infinity
  //     ? `${Math.round(batteryStatus.dischargingTime / 60)} min remaining`
  //     : 'Calculating...';
  // };

  return (
    <div
      className="relative inline-flex items-center m-0 p-0 cursor-default"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {getBatteryIcon()}
      {/* <span className="text-sm font-medium">{`${Math.round(batteryStatus.level)}%`}</span> */}
      {/* {showDetails && (
        <div className="absolute bg-white left-0 mt-2 p-2 rounded-lg shadow-lg text-xs top-full w-48">
          <p className="font-semibold mb-1">
            {batteryStatus.charging
              ? 'Battery is charging'
              : 'On battery power'}
          </p>
          <p>{getTimeEstimate()}</p>
        </div>
      )} */}
    </div>
  );
}
