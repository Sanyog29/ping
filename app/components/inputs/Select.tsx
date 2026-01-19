'use client'

import ReactSelect from 'react-select';

interface SelectProps {
    label: string;
    value?: Record<string, any>;
    onChange: (value: any) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, disabled }) => {
    return (
        <div className="z-50">
            <label className="block text-sm font-semibold leading-6 text-gray-700 mb-2">
                {label}
            </label>
            <div className="mt-1">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999
                        }),
                        control: (base, state) => ({
                            ...base,
                            borderRadius: '12px',
                            padding: '4px 8px',
                            backgroundColor: state.isFocused ? '#fff' : '#f9fafb',
                            borderColor: state.isFocused ? '#6366f1' : '#e5e7eb',
                            boxShadow: state.isFocused
                                ? '0 0 0 3px rgba(99, 102, 241, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                : '0 1px 3px rgba(0, 0, 0, 0.08)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: '#a5b4fc',
                                backgroundColor: '#fff'
                            }
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected
                                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                : state.isFocused
                                    ? '#eef2ff'
                                    : '#fff',
                            background: state.isSelected
                                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                : state.isFocused
                                    ? '#eef2ff'
                                    : '#fff',
                            color: state.isSelected ? '#fff' : '#374151',
                            padding: '12px 16px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            borderRadius: '8px',
                            margin: '4px 8px',
                            width: 'calc(100% - 16px)',
                            fontWeight: state.isSelected ? '500' : '400',
                            '&:active': {
                                backgroundColor: '#c7d2fe'
                            }
                        }),
                        menu: (base) => ({
                            ...base,
                            borderRadius: '16px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            border: '1px solid #e5e7eb',
                            overflow: 'hidden',
                            padding: '4px 0',
                            animation: 'fadeIn 0.2s ease'
                        }),
                        multiValue: (base) => ({
                            ...base,
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            borderRadius: '20px',
                            padding: '2px 4px',
                            boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)'
                        }),
                        multiValueLabel: (base) => ({
                            ...base,
                            color: '#fff',
                            fontWeight: '500',
                            fontSize: '13px',
                            padding: '2px 8px'
                        }),
                        multiValueRemove: (base) => ({
                            ...base,
                            color: '#fff',
                            borderRadius: '50%',
                            marginRight: '4px',
                            transition: 'all 0.15s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                cursor: 'pointer'
                            }
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: '#9ca3af',
                            fontSize: '14px'
                        }),
                        input: (base) => ({
                            ...base,
                            color: '#1f2937',
                            fontSize: '14px'
                        }),
                        indicatorSeparator: () => ({
                            display: 'none'
                        }),
                        dropdownIndicator: (base, state) => ({
                            ...base,
                            color: state.isFocused ? '#6366f1' : '#9ca3af',
                            transition: 'all 0.2s ease',
                            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            '&:hover': {
                                color: '#6366f1'
                            }
                        })
                    }}
                    classNames={{
                        control: () => "text-sm"
                    }}
                    placeholder="Select members..."
                />
            </div>
        </div>
    )
};

export default Select;