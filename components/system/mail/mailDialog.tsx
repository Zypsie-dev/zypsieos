'use client';

import React, { useState } from 'react';
import {
  Input,
  Textarea,
} from '@nextui-org/input';
import {Modal,
    ModalContent,
    useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter} from '@nextui-org/modal';
import { MailIcon, SendIcon } from 'lucide-react';

import Button from '@/components/system/MacButton';
export default function Component() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Here you would typically handle sending the email
    console.log('Sending email:', {
      to: 'zypsierider@gmail.com',
      subject,
      message,
    });
    onClose();
    setSubject('');
    setMessage('');
  };

  return (
    <>
      <Button onPress={onOpen} className="w-full mb-4 bg hover:bg-focus text-white rounded-md">
        Email Me
        <MailIcon className="ml-2" />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Message
              </ModalHeader>
              <ModalBody>
                <Input
                  label="To"
                  value="zypsierider@gmail.com"
                  variant="bordered"
                  isDisabled
                />
                <Input
                  label="Subject"
                  placeholder="Enter your subject"
                  variant="bordered"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  label="Message"
                  placeholder="Type your message here"
                  variant="bordered"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  minRows={5}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSend}
                  endContent={<SendIcon size={16} />}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
