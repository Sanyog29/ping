'use client'
import React from 'react'
import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputsProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Inputs: React.FC<InputsProps> = ({ id, label, type = "text", disabled, required, register, errors }) => {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600"
      >
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={id}
          {...register(id, { required })}
          className={clsx(
            "block w-full rounded-xl border-2 px-4 py-3",
            "text-gray-900 text-sm placeholder:text-gray-400",
            "bg-gray-50 transition-all duration-200 ease-out",
            "focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100",
            "hover:border-indigo-300 hover:bg-white",
            "outline-none",
            errors[id] && "border-rose-400 focus:border-rose-500 focus:ring-rose-100",
            disabled && "opacity-50 cursor-not-allowed bg-gray-100"
          )}
          style={{
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
          }}
        />
        {errors[id] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default Inputs;
