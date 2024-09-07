'use client';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import Menu from './dialog';
const Apple = ({ size, color }: { size: string; color: string }) => {
  return Menu({
    trigger: (
      <svg
        fill={color}
        height={size}
        viewBox="-52.01 0 560.035 560.035"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655" />
      </svg>
    ),
    items: [
      { key: 'new', label: 'New file' },
      { key: 'copy', label: 'Copy link' },
      { key: 'edit', label: 'Edit file' },
      { key: 'delete', label: 'Delete file', isDanger: true },
    ],
  });
};

// const Apple = ({ size, color }: { size: string; color: string }) => {
//   return (
//     <Dropdown>
//       <DropdownTrigger className="hover:macos-hand">
//           <svg
//             fill={color}
//             height={size}
//             viewBox="-52.01 0 560.035 560.035"
//             width={size}
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655" />
//           </svg>
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Static Actions">
//         <DropdownItem key="new">New file</DropdownItem>
//         <DropdownItem key="copy">Copy link</DropdownItem>
//         <DropdownItem key="edit">Edit file</DropdownItem>
//         <DropdownItem key="delete" className="text-danger" color="danger">
//           Delete file
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

export default Apple;
