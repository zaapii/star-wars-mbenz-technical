import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { twMerge } from 'tailwind-merge'

dayjs.extend(relativeTime)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractAndCapitalizePath(url: string): string {
  const parsed = new URL(url)
  const segments = parsed.pathname.split('/').filter(Boolean)
  const resource = segments[segments.length - 1]
  return resource.charAt(0).toUpperCase() + resource.slice(1)
}

export function humanReadableDate(dataUpdatedAt: number): string {
  return dayjs(dataUpdatedAt).fromNow()
}
