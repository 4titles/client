export const LANGUAGE_COOKIE_NAME = 'language'
export const LANGUAGES = ['ru', 'en'] as const
export const LANGUAGE_OPTIONS = {
    ru: 'Русский',
    en: 'English',
} as const
export const DEFAULT_LANGUAGE: Language = 'ru'

export type Language = (typeof LANGUAGES)[number]
