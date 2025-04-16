'use client'

import { Button } from '@/components/ui/common/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import FadeContent from '@/components/ui/custom/content/fade-content'
import { PasswordInput } from '@/components/ui/custom/password-input'
import { Spinner } from '@/components/ui/custom/spinner'
import BlurText from '@/components/ui/custom/text/blur-text'
import { useCreateAccountMutation } from '@/graphql/generated/output'
import { useFormValidation } from '@/hooks/useFormValidation'
import {
    createAccountSchema,
    CreateAccountSchemaType,
} from '@/schemas/auth/create-account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AuthWrapper } from '../AuthWrapper'

export function CreateAccountForm() {
    const t = useTranslations('auth.register')
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<CreateAccountSchemaType>({
        resolver: zodResolver(
            createAccountSchema({
                usernameMinLengthValidationError: t(
                    'usernameMinLengthValidationError',
                ),
                usernameInvalidCharactersValidationError: t(
                    'usernameInvalidCharactersValidationError',
                ),
                emailValidationError: t('emailValidationError'),
                passwordMinLengthValidationError: t(
                    'passwordMinLengthValidationError',
                ),
                passwordWeaknessError: t('passwordWeaknessError'),
            }),
        ),
        defaultValues: {
            username: '',
            email: '',
            password: '',
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

    const [create, { loading: isAccountCreating }] = useCreateAccountMutation({
        onCompleted() {
            setIsSuccess(true)
        },
        onError() {
            toast.error(t('serverErrorMessage'))
        },
    })

    async function onSubmit(input: CreateAccountSchemaType) {
        setIsSubmitted(true)
        if (form.formState.isValid) {
            create({ variables: { input } })
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
                        className='text-md font-semibold text-foreground md:text-xl'
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
                            name='username'
                            render={({ field }) => (
                                <FormItem className='space-y-1.5'>
                                    <FormLabel>{t('usernameLabel')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='nostylist44'
                                            disabled={isAccountCreating}
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className='h-3.5 md:h-1'>
                                        {shouldShowErrors && (
                                            <FormMessage className='text-xs' />
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />

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
                                            disabled={isAccountCreating}
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className='h-3.5 md:h-1'>
                                        {shouldShowErrors && (
                                            <FormMessage className='text-xs' />
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='space-y-1.5'>
                                    <FormLabel>{t('passwordLabel')}</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder='********'
                                            disabled={isAccountCreating}
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className='h-3.5 md:h-1'>
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
                            disabled={isSubmitDisabled(isAccountCreating)}
                        >
                            {isAccountCreating ? (
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
