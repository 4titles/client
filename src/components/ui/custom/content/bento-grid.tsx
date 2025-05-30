import { cn } from '@/utils/tw-merge'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Button } from '../../common/button'

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode
    className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
    name: string
    className: string
    background: ReactNode
    Icon: React.ElementType
    description: string
    href?: string
    cta?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
    return (
        <div
            className={cn(
                'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    ...props
}: BentoCardProps) => (
    <div
        key={name}
        className={cn(
            'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
            // light styles
            'border border-input bg-background/50',
            // dark styles
            'transform-gpu dark:border-none dark:border-transparent dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)]',
            className,
        )}
        {...props}
    >
        <div>{background}</div>
        <div
            className={cn(
                'pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6',
                href
                    ? 'transition-all duration-300 group-hover:-translate-y-10'
                    : '',
            )}
        >
            <Icon
                className={cn(
                    'h-12 w-12 origin-left transform-gpu text-foreground',
                    href
                        ? 'transition-all duration-300 ease-in-out group-hover:scale-75'
                        : '',
                )}
            />
            <h3 className='text-xl font-semibold text-foreground dark:text-foreground'>
                {name}
            </h3>
            <p className='max-w-lg text-muted-foreground'>{description}</p>
        </div>

        {href && cta && (
            <div
                className={cn(
                    'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100',
                )}
            >
                <Button
                    variant='ghost'
                    asChild
                    size='sm'
                    className='pointer-events-auto'
                >
                    <Link href={href}>
                        {cta}
                        <ArrowRightIcon className='ms-2 h-4 w-4 rtl:rotate-180' />
                    </Link>
                </Button>
            </div>
        )}
        <div
            className={cn(
                'pointer-events-none absolute inset-0',
                href
                    ? 'transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10'
                    : '',
            )}
        />
    </div>
)

export { BentoCard, BentoGrid }
