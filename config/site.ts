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
    { name: 'Finder', icon: '/icons/dock/finder.png', id: 'Finder' },
    { name: 'Mail', icon: '/icons/dock/mail.png', id: 'Mail' },
    { name: 'Music', icon: '/icons/dock/music.png', id: 'Music' },
    { name: 'Photos', icon: '/icons/dock/photos.png', id: 'Photos' },
    {
      name: 'Terminal',
      icon: '/icons/dock/terminal.png',
      id: 'terminal-window',
    },
  ],
  appleMenu: [
    { key: 'about', label: 'About This Mac', section: true },
    {
      key: 'system',
      label: 'System Preferences',
      section: false,
      onCLick: 'system',
    },
    { key: 'recent', label: 'Recent Items', section: true, onCLick: 'recent' },
    {
      key: 'force',
      label: 'Force Quit',
      shortCut: '⌘⇧F',
      section: true,
      onCLick: 'force',
    },
    { key: 'sleep', label: 'Sleep', section: true, onCLick: 'sleep' },
    { key: 'restart', label: 'Restart', section: false, onCLick: 'restart' },
    {
      key: 'shutdown',
      label: 'Shut Down',
      section: false,
      onCLick: 'shutdown',
    }
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};

