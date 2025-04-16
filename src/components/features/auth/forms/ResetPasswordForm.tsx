'use client'

import { Button } from '@/components/ui/common/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import FadeContent from '@/components/ui/custom/content/fade-content'
import { Spinner } from '@/components/ui/custom/spinner'
import BlurText from '@/components/ui/custom/text/blur-text'
import { useResetPasswordMutation } from '@/graphql/generated/output'
import { useFormValidation } from '@/hooks/useFormValidation'
import {
    resetPasswordSchema,
    ResetPasswordSchemaType,
} from '@/schemas/auth/reset-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AuthWrapper } from '../AuthWrapper'

export function ResetPasswordForm() {
    const t = useTranslations('auth.recovery.resetPassword')
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(
            resetPasswordSchema({
                emailValidationErrorMessage: t('emailValidationError'),
            }),
        ),
        defaultValues: {
            email: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const {
        setIsSubmitted,
        handleFormSubmit,
        shouldShowErrors,
        isSubmitDisabled,
    } = useFormValidation(form)

    const [resetPassword, { loading: isLoadingPasswordReset }] =
        useResetPasswordMutation({
            onCompleted() {
                setIsSuccess(true)
            },
            onError() {
                toast.error(t('errorMessage'), {
                    description: t('errorMessageDescription'),
                })
            },
        })

    async function onSubmit(data: ResetPasswordSchemaType) {
        setIsSubmitted(true)
        if (form.formState.isValid) {
            resetPassword({ variables: { data } })
        }
    }

    return (
        <AuthWrapper
            heading={t('heading')}
            backButtonQuestion={t('backButtonQuestion')}
            backButtonLabel={t('backButtonLabel')}
            backButtonHref='/account/login'
        >
            {isSuccess ? (
                <div className='flex flex-col items-center gap-4 py-4 text-center'>
                    <BlurText
                        className='text-md justify-center font-semibold text-foreground md:text-xl'
                        text={t('successAlertTitle')}
                        delay={100}
                    />
                    <FadeContent delay={125} duration={1500} blur={true}>
                        <p className='max-w-fit text-sm text-muted-foreground'>
                            {t('successAlertDescription')}
                        </p>
                    </FadeContent>
                </div>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        onSubmitCapture={handleFormSubmit}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='space-y-1.5'>
                                    <FormLabel>{t('emailLabel')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='nostylist@gmail.com'
                                            disabled={isLoadingPasswordReset}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {t('emailFieldDescription')}
                                    </FormDescription>
                                    <div className='h-2.5 md:h-1'>
                                        {shouldShowErrors && (
                                            <FormMessage className='text-xs' />
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Separator />

                        <Button
                            type='submit'
                            className='h-11 w-full'
                            disabled={isSubmitDisabled(isLoadingPasswordReset)}
                        >
                            {isLoadingPasswordReset ? (
                                <Spinner />
                            ) : (
                                t('submitButton')
                            )}
                        </Button>
                    </form>
                </Form>
            )}
        </AuthWrapper>
    )
}
