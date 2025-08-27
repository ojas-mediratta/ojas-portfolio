import React, { useEffect, useState } from 'react'

export default function TypingEffect({ words, speed = 120, pause = 900 }: { words: string[]; speed?: number; pause?: number }) {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [forward, setForward] = useState(true)

    useEffect(() => {
        if (index >= words.length) setIndex(0)

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (forward ? 1 : -1))

            if (forward && subIndex === words[index].length) {
                setForward(false)
                setTimeout(() => { }, pause)
            } else if (!forward && subIndex === 0) {
                setForward(true)
                setIndex((prev) => (prev + 1) % words.length)
            }
        }, forward ? speed : speed / 2)

        return () => clearTimeout(timeout)
    }, [subIndex, index, forward, words, speed, pause])

    return (
        <span className="font-semibold">
            {words[index].substring(0, subIndex)}
            <span className="opacity-70">|</span>
        </span>
    )
}
