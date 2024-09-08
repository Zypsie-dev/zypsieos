export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Zypsie',
  navItems: [
    {
      label: 'Finder',
    },
    {
      label: 'File',
    },
    {
      label: 'Edit',
    },
    {
      label: 'View',
    },
    {
      label: 'Go',
    },
    {
      label: 'Window',
    },
    {
      label: 'Help',
    },
  ],
  navMenuIcons: [
    {
      icon: 'Battery',
      label: 'battery',
      size: 20,
    },
    {
      icon: 'Wifi',
      label: 'wifi',
      size: 17,
    },
    {
      icon: 'Search',
      label: 'search',
      size: 17,
    },
    {
      icon: 'ControlCenter',
      label: 'control center',
      size: 20,
    },
  ],
  dockMenu: [
    { name: 'Finder', icon: '/icons/dock/finder.png' },
    { name: 'Mail', icon: '/icons/dock/mail.png' },
    { name: 'Chrome', icon: '/icons/dock/chrome.png' },
    { name: 'Music', icon: '/icons/dock/music.png' },
    { name: 'Photos', icon: '/icons/dock/photos.png' },
    { name: 'Terminal', icon: '/icons/dock/terminal.png' },
  ],
  appleMenu: [
    { key: 'about', label: 'About This Mac', section: true },
    { key: 'system', label: 'System Preferences', section: false },
    { key: 'appstore', label: 'App Store', section: true },
    { key: 'recent', label: 'Recent Items', section: true },
    { key: 'force', label: 'Force Quit', shortCut: '⌘⇧F', section: true },
    { key: 'sleep', label: 'Sleep', section: true },
    { key: 'restart', label: 'Restart', section: false },
    { key: 'shutdown', label: 'Shut Down', section: false },
    { key: 'lock', label: 'Lock Screen', section: true },
    { key: 'logout', label: 'Log Out', section: false },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}; 













