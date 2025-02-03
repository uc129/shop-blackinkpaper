import React from "react";

interface ButtonWithIconProps {
    icon: React.ReactNode;
    label: string;
    onClick: (e: React.MouseEvent) => void;
    classNames?: string;
    disabled?: boolean;
    rtl?: boolean;
    id?: string;
    isLink?: boolean;
}

export const ButtonWithIcon = ({ icon, label, onClick, classNames, disabled, rtl, id, isLink }: ButtonWithIconProps) => {


    return (
        <button id={id} onClick={onClick} disabled={disabled}
            className={` grid grid-cols-2  items-center mb-6 p-2 rounded-lg text-xs  text-foreground hover:-translate-y-[2px] transition-transform duration-200 ease-in-out
            ${classNames}
             ${rtl ? 'flex-row-reverse' : 'flex-row'}
             ${isLink ? 'pointer-events-none' : 'pointer-events-auto'} `
            }>
            <span className={isLink ? 'pointer-events-auto' : 'pointer-events-none'}> {icon}</span>
            <span className="ml-2 pointer-events-none">{label}</span>
        </button>
    )

}