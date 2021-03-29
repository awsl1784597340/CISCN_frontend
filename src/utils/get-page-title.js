import defaultSettings from '@/settings'

// const title = defaultSettings.title || 'Vue Admin Template'
const title = '信安国赛'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
