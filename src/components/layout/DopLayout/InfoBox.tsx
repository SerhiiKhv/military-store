import React from "react";

export default function InfoBox({ children, className }: { children: React.ReactNode, className?: string }){

    if(!className)className = "m-2 text-center text-2xl bg-blue-100 border-blue-300 rounded-2xl"

    return (
        <div className={className}>
            {children}
        </div>
    )
}