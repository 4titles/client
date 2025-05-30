'use client'

import { Skeleton } from '@/components/ui/common/skeleton'
import { Tilt } from '@/components/ui/custom/content/tilt'
import { AccentSpotlight } from '@/components/ui/elements/AccentSpotlight'
import { Hint } from '@/components/ui/elements/Hint'
import { LogoImage } from '@/components/ui/elements/LogoImage'
import {
    FavorableType,
    Title,
    useIsFavoriteQuery,
} from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/tw-merge'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { FavoriteButton } from '../../favorites/FavoriteButton'
import { useTitleBasicInfo } from '../hooks'

interface TitlePosterCardProps {
    title: Title
    className?: string
    initialIsFavorite?: boolean
    onFavoriteChange?: (isFavorite: boolean) => void
}

export function TitlePosterCard({
    title,
    className,
    initialIsFavorite,
    onFavoriteChange,
}: TitlePosterCardProps) {
    const { name, posterUrl, releaseYear, productionCountry } =
        useTitleBasicInfo(title)
    const { isAuthenticated } = useAuth()

    const [localIsFavorite, setLocalIsFavorite] = useState<boolean | undefined>(
        initialIsFavorite,
    )

    const { data: favoriteData, loading: isLoadingFavorite } =
        useIsFavoriteQuery({
            variables: {
                input: {
                    favorableId: title.id,
                    favorableType: FavorableType.Title,
                    contextId: null,
                },
            },
            skip: !isAuthenticated || initialIsFavorite !== undefined,
            fetchPolicy: 'cache-first',
        })

    useEffect(() => {
        if (initialIsFavorite !== undefined) {
            setLocalIsFavorite(initialIsFavorite)
        } else if (favoriteData?.isFavorite !== undefined) {
            setLocalIsFavorite(favoriteData.isFavorite)
        }
    }, [favoriteData, initialIsFavorite])

    const isFavorite = localIsFavorite ?? false

    const handleFavoriteChange = (newStatus: boolean) => {
        setLocalIsFavorite(newStatus)

        if (onFavoriteChange) {
            onFavoriteChange(newStatus)
        }
    }

    return (
        <div className={cn('group relative w-full', className)}>
            <Tilt
                rotationFactor={5}
                isRevese
                style={{
                    transformOrigin: 'center center',
                }}
                springOptions={{
                    stiffness: 300,
                    damping: 30,
                }}
                className='relative h-full w-full overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-md'
            >
                <AccentSpotlight />

                <div className='absolute right-2 top-2 z-20'>
                    <FavoriteButton
                        favorableId={title.id}
                        favorableType={FavorableType.Title}
                        variant='outline'
                        size='icon'
                        initialIsFavorite={isFavorite}
                        onSuccess={handleFavoriteChange}
                    />
                </div>

                <Hint side='bottom'>
                    <NextLink
                        href={`/titles/${title.slug}`}
                        className='block h-full w-full'
                    >
                        <div className='flex h-full flex-col'>
                            <div className='relative aspect-[2/3] overflow-hidden'>
                                {posterUrl ? (
                                    <Image
                                        src={posterUrl}
                                        alt={name}
                                        fill
                                        className='select-none object-cover transition-transform duration-300 group-hover:scale-105'
                                        sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1600px) 25vw, 20vw'
                                        priority
                                        onError={e => {
                                            e.currentTarget.style.display =
                                                'none'
                                        }}
                                    />
                                ) : (
                                    <div className='relative aspect-[2/3]'>
                                        <div className='flex h-full w-full items-center justify-center bg-background/50'>
                                            <LogoImage className='size-40' />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col p-3'>
                                <h3 className='line-clamp-1 text-sm font-medium text-card-foreground transition-colors group-hover:text-primary'>
                                    {name}
                                </h3>
                                <div className='mt-1 flex items-center text-xs text-muted-foreground'>
                                    {releaseYear && (
                                        <span className='mr-2'>
                                            {releaseYear}
                                        </span>
                                    )}
                                    {productionCountry && (
                                        <span className='truncate'>
                                            {productionCountry.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </NextLink>
                </Hint>
            </Tilt>
        </div>
    )
}

export function TitlePosterCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('group relative w-full', className)}>
            <div className='relative h-full w-full overflow-hidden rounded-lg border border-border bg-card transition-all'>
                <div className='flex h-full flex-col'>
                    <div className='relative aspect-[2/3] overflow-hidden'>
                        <Skeleton className='h-full w-full' />
                    </div>

                    <div className='flex flex-col p-3'>
                        <Skeleton className='h-4 w-3/4' />
                        <div className='mt-1 flex items-center gap-2'>
                            <Skeleton className='h-3 w-14' />
                            <Skeleton className='h-3 w-20' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
