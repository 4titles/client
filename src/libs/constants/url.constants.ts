export const APP_URL =
    (process.env.NEXT_PUBLIC_APP_URL as string) || 'https://4titles.com'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string
export const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL as string
export const TELEGRAM_BOT_URL =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || 'https://t.me/for_titles_bot'
