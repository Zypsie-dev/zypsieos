// app/api/execute/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { command } = await req.json();

  let output: string;
  
  switch (command) {
    case 'help':
      output = 'Available commands: help, clear, echo, date';
      break;
    case 'clear':
      output = ''; // Clear command, no output
      break;
    case 'date':
      output = new Date().toString();
      break;
    case command.startsWith('echo ') ? command : '':
      output = command.slice(5);
      break;
    default:
      output = `Command not found: ${command}`;
      break;
  }

  return NextResponse.json({ output });
}
