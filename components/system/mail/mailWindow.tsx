'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/input';
import { MailIcon, SendIcon, XIcon } from 'lucide-react';

import Button from '@/components/system/MacButton';

const emails = [
  {
    id: 1,
    from: 'Nabin Shrestha',
    subject: 'Welcome to My macOS Clone Portfolio',
    preview:
      "Hi there! Welcome to your personalized macOS experience. Here's how to get started...",
    date: '10:30 AM',
    body: "Hi [User's Name],\n\nWelcome to your personalized macOS clone portfolio!\n\nI am excited to have you explore this Apple-inspired experience I've built. Here's what you can do:\n\n- Explore Projects: Take a look at the projects I've worked on.\n- Interact with Apps: Open different 'apps' like you would on macOS to learn more about me and my skills.\n- Seamless Navigation: Navigate smoothly through the site with features similar to the real macOS environment.\n\nFeel free to click around, and I hope you enjoy this unique take on a portfolio site!\n\nBest regards,\nNabin Shrestha\n\nP.S.: If you run into any issues or have feedback, I'd love to hear from you!",
  },
];

export default function Component() {
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [from, setFrom] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 const handleSend = async () => {
   setResponseMessage('Sending email...');
   try {
     const res = await fetch('/api/mail', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ from, subject, message }),
     });

     if (!res.ok) {
       throw new Error(`HTTP error! status: ${res.status}`);
     }
     const result = await res.json();
     
     setIsModalOpen(false);
     setResponseMessage(result.message);

     if (result.success) {
       setIsModalOpen(false);
       setSubject('');
       setMessage('');
       setFrom('');
     }
   } catch (error) {
     console.error('Error sending email:', error);
     setResponseMessage(
       'An error occurred while sending the email. Please try again.'
     );
   }
 };

  return (
    <div className="w-full h-full bg-white shadow-2xl overflow-hidden flex flex-col relative macos-cursor">
      {/* Email App Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mail List */}
        <div className="w-1/3 flex flex-col bg-gray-100 border-r border-gray-200">
          <div className="p-2">
            <Button
              className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Email Me
              <MailIcon className="ml-2 h-4 w-4" />
            </Button>
            <div className="h-auto w-full overflow-auto ">
              {emails.map((email) => (
                <Card
                  key={email.id}
                  isPressable
                  className={`macos-hand w-full mb-2 transition-colors duration-150 hover:bg-blue-100
                  ${selectedEmail.id === email.id ? 'bg-blue-300' : 'bg-blue-200 hover:bg-blue-100'}`}
                  shadow="none"
                  onPress={() => setSelectedEmail(email)}
                >
                  <CardBody className="p-2 w-full text-gray-700">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm">
                        {email.from}
                      </span>
                      <span className="text-xs text-gray-500">
                        {email.date}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm mb-1">
                      {email.subject}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {email.preview}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mail View */}
        <div className="flex-1 bg-white p-6 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedEmail.subject}
              </h2>
            </div>
            <div className="flex items-center mb-3">
              <div>
                <p className="font-semibold text-gray-800">
                  {selectedEmail.from}
                </p>
                <p className="text-sm text-gray-500">{selectedEmail.date}</p>
              </div>
            </div>
            <div className="mt-3 text-gray-700 text-sm whitespace-pre-wrap">
              {selectedEmail.body}
            </div>
          </div>
        </div>
      </div>

      {/* Email Composition Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-7">
          <div
            ref={modalRef}
            className="bg-white w-2/3 rounded-lg shadow-lg overflow-hidden"
            style={{ maxWidth: '800px', minHeight: '300px' }}
          >
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                New Message
              </h2>
              <Button
                isIconOnly
                className="text-gray-400 hover:text-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <Input
                className="bg-gray-100 macos-cursor"
                placeholder="From"
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <Input
                placeholder="Subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Textarea
                className="resize-none"
                placeholder="Type your message here"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end p-4 bg-gray-100 border-t border-gray-200">
              <Button
                className="mr-2 text-primary"
                variant="bordered"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSend}>
                Send
                <SendIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
