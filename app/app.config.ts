export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    }
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'Sticker.ly API Wrapper'
  },
  header: {
    title: 'Sticker.ly API Wrapper',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/sergiooak/sticker-ly-api-wrapper',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false
  },
  toc: {
    title: 'Table of Contents'
  }
})
