'use client'

import { createContext, useContext, useState } from 'react'

type BackgroundType = 'default' | 'aurora' | 'grid'

interface BackgroundContextType {
    backgroundType: BackgroundType
    setBackgroundType: (type: BackgroundType) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
    undefined,
)

export function BackgroundProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [backgroundType, setBackgroundType] =
        useState<BackgroundType>('default')

    return (
        <BackgroundContext.Provider
            value={{ backgroundType, setBackgroundType }}
        >
            {children}
        </BackgroundContext.Provider>
    )
}

export function useBackground() {
    const context = useContext(BackgroundContext)
    if (!context) {
        throw new Error(
            'useBackground must be used within a BackgroundProvider',
        )
    }
    return context
}
