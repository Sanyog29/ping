'use client'    
import React from 'react'
import clsx from 'clsx';

interface ButtonProps{
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?:boolean;
    disabled?:boolean;
    children:React.ReactNode;
    onClick?:() => void;
    secondary?:boolean;
    danger?:boolean;
}   

const Button : React.FC<ButtonProps> = ({type, fullWidth, disabled, children, onClick , secondary, danger}) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={clsx("flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50 disabled:cursor-default", fullWidth && "w-full", disabled && "cursor-default opacity-50" , secondary ? 'text-grey-900' : 'text-white', danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600', !secondary && !danger && 'bg-sky-600 hover:bg-sky-400 focus-visible:outline-sky -600')} >
      {children}
    </button>
  )
}

export default Button;


