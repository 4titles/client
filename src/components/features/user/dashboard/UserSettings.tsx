'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/common/tabs'
import { Heading } from '@/components/ui/elements/Heading'
import { useTranslations } from 'next-intl'
import { ChangeEmailForm } from './account/ChangeEmailForm'
import { ChangePasswordForm } from './account/ChangePasswordForm'
import { DeactivateCard } from './account/DeactivateCard'
import { TotpWrapper } from './account/totp/TotpWrapper'
import { ChangeColorForm } from './appearance/ChangeColorForm'
import { ChangeLanguageForm } from './appearance/ChangeLanguageForm'
import { ChangeThemeForm } from './appearance/ChangeThemeForm'
import { ChangeNotificationSettingsForm } from './notifications/ChangeNotificationSettingsForm'
import { ChangeAvatarForm } from './profile/ChangeAvatarForm'
import { ChangeInfoForm } from './profile/ChangeInfoForm'
import { SocialLinksForm } from './profile/SocialLinksForm/SocialLinksForm'
import { SessionsList } from './sessions/SessionsList'

export function UserSettings() {
    const t = useTranslations('dashboard.settings')

    return (
        <div className='lg:px-10'>
            <Heading
                title={t('header.heading')}
                description={t('header.description')}
                size='lg'
            />
            <Tabs defaultValue='profile' className='mt-3 w-full'>
                <div className='w-full md:max-w-3xl'>
                    <TabsList className='w-full'>
                        <div className='no-scrollbar flex w-full items-center justify-between overflow-x-auto'>
                            <TabsTrigger
                                value='profile'
                                className='flex-1 text-center'
                            >
                                {t('header.profile')}
                            </TabsTrigger>
                            <TabsTrigger
                                value='account'
                                className='flex-1 text-center'
                            >
                                {t('header.account')}
                            </TabsTrigger>
                            <TabsTrigger
                                value='appearance'
                                className='flex-1 text-center'
                            >
                                {t('header.appearance')}
                            </TabsTrigger>
                            <TabsTrigger
                                value='notifications'
                                className='flex-1 text-center'
                            >
                                {t('header.notifications')}
                            </TabsTrigger>
                            <TabsTrigger
                                value='sessions'
                                className='flex-1 text-center'
                            >
                                {t('header.sessions')}
                            </TabsTrigger>
                        </div>
                    </TabsList>
                </div>
                <TabsContent value='profile'>
                    <div className='mt-5 space-y-6'>
                        <Heading
                            title={t('profile.header.heading')}
                            description={t('profile.header.description')}
                        />
                        <ChangeAvatarForm />
                        <ChangeInfoForm />
                        <SocialLinksForm />
                    </div>
                </TabsContent>
                <TabsContent value='account'>
                    <div className='mt-5 space-y-6'>
                        <Heading
                            title={t('account.header.heading')}
                            description={t('account.header.description')}
                        />
                        <ChangeEmailForm />
                        <ChangePasswordForm />
                        <Heading
                            title={t('account.header.securityHeading')}
                            description={t(
                                'account.header.securityDescription',
                            )}
                        />
                        <TotpWrapper />
                        <Heading
                            title={t('account.header.deactivationHeading')}
                            description={t(
                                'account.header.deactivationDescription',
                            )}
                        />
                        <DeactivateCard />
                    </div>
                </TabsContent>
                <TabsContent value='appearance'>
                    <div className='mt-5 space-y-6'>
                        <Heading
                            title={t('appearance.header.heading')}
                            description={t('appearance.header.description')}
                        />
                        <ChangeThemeForm />
                        <ChangeLanguageForm />
                        <ChangeColorForm />
                    </div>
                </TabsContent>
                <TabsContent value='notifications'>
                    <div className='mt-5 space-y-6'>
                        <Heading
                            title={t('notifications.header.heading')}
                            description={t('notifications.header.description')}
                        />
                        <ChangeNotificationSettingsForm />
                    </div>
                </TabsContent>
                <TabsContent value='sessions'>
                    <div className='mt-5 space-y-6'>
                        <Heading
                            title={t('sessions.header.heading')}
                            description={t('sessions.header.description')}
                        />
                        <SessionsList />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
