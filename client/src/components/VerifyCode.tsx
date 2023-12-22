"use client"

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';


const VerifyCode: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [isLoading, setIsLoading] = React.useState<boolean>(false);


  const handleInputChange = (index: number, value: string) => {
    // Update the corresponding value in the state
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input field if value is entered
    if (value !== '' && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };
  const handleSubmit =()=>{
    // api call and re routing
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    // Move focus to the previous input field on backspace
    if (event.key === 'Backspace') {
      if (index > 0) {
        // If not the first input, move focus to the previous input and clear its value
        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
        inputRefs[index - 1].current?.focus();
      }
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='flex gap-5'>
      {otpValues.map((value, index) => (
        <Input
          className='text-center text-2xl'
          key={index}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          ref={inputRefs[index]}
        />
      ))}
    </div>
    <Button disabled={isLoading}>
    {isLoading && (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    )}
    Verify
  </Button>
  </form>
  );
};

export default verifyCode;
