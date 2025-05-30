'use client'

import { Spinner } from '@/components/ui/elements/Spinner'
import { useVerifyAccountMutation } from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { AUTH_ROUTES } from '@/libs/constants/auth.constants'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { AuthWrapper } from '../AuthWrapper'

export function VerifyAccountForm() {
    const t = useTranslations('auth.verify')

    const REDIRECT_ON_ERROR_TIMEOUT_IN_MS = 1500

    const router = useRouter()
    const searchParams = useSearchParams()

    const token = searchParams.get('token') ?? ''

    const { authorize } = useAuth()

    const handleVerifySuccess = useCallback(() => {
        authorize()
        toast.success(t('successMessage'))
        router.push(AUTH_ROUTES.AFTER_LOGIN)
    }, [t, router])

    const handleVerifyError = useCallback(() => {
        toast.error(t('errorMessage'), {
            description: t('errorMessageDescription'),
            duration: REDIRECT_ON_ERROR_TIMEOUT_IN_MS,
        })

        setTimeout(
            () => router.push(AUTH_ROUTES.LOGIN),
            REDIRECT_ON_ERROR_TIMEOUT_IN_MS,
        )
    }, [t, router])

    const [verify] = useVerifyAccountMutation({
        onCompleted: handleVerifySuccess,
        onError: handleVerifyError,
    })

    useEffect(() => {
        if (token) {
            verify({
                variables: {
                    data: { token },
                },
            })
        } else {
            handleVerifyError()
        }
    }, [token, verify, handleVerifyError])

    return (
        <AuthWrapper heading={t('heading')} showChildrenAnimation={false}>
            <div className='flex items-center justify-center'>
                <Spinner size='xl' color='border-primary' />
            </div>
        </AuthWrapper>
    )
}
