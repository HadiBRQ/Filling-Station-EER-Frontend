'use client'
import { Button } from '@/components/ui/button'
import { useConfig } from '@/hooks/use-config'
import Image from 'next/image'
import React from 'react'

const MenuWidget = () => {
    const [config] = useConfig();
    if (config.sidebar === 'compact') return null
    return (
        <>
        </>
    )
}

export default MenuWidget