"use client"

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { activateUser } from '../../redux/slices/authSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useRouter } from 'next/navigation'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector} from 'react-redux'
 

// Define the type for your dispatch function
type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

const VerifyCode: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const activationToken = useSelector((state:any)=> state.registerUser.activationToken);
  
    const [activationCode, setActivationCode] = useState<string>("")
  
    useEffect(()=>{
      if(activationToken){
        console.log(activationToken,'this is the token')
      }

    },[activationToken, ])

  const handleInputChange = (index: number, value: string) => {

  
    // Update the corresponding value in the state
    const filteredValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if(filteredValue){
      const newOtpValues = [...otpValues];
      newOtpValues[index] = filteredValue;
      setOtpValues(newOtpValues);
  
      // Move focus to the next input field if value is entered
      if (value !== '' && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };
  const handleSubmit = (e: React.SyntheticEvent)=>{

    e.preventDefault();
    if(otpValues.includes("")){
      console.log('please enter the complete code')
      return;
    }
    const activationCode = otpValues.join("")
    dispatch(activateUser({code:activationCode, token:activationToken}))
    router.push('/login');
    // console.log(otpValues.join(""), 'this is token')
    // console.log(otpValues, 'this is token')
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
      if(index === 0){
        setOtpValues(['','','',''])
      }
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='flex gap-5 mb-5'>
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
    <Button className='w-full' disabled={isLoading}>
    {isLoading && (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    )}
    Verify
  </Button>
  </form>
  );
};

export default VerifyCode;
