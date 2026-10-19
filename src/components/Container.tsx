import React from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto max-w-6xl xl:max-w-[1280px] px-5 sm:px-6 lg:px-8 xl:px-12">
            {children}
        </div>
    )
}
