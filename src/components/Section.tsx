import React from 'react'


export default function Section({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
    return (
        <section id={id} className={`scroll-mt-24 ${className}`}>
        {children}
        </section>
    )
}