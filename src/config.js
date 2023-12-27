module.exports = {
  email: 'danioropezasoria@gmail.com',

  socialMedia: [
    {
      name: 'Email',
      url: 'mailto:danioropezasoria@gmail.com',
    },
    {
      name: 'Linkedin',
      url: 'https://linkedin.com/in/dani-oropeza',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/danioropeza',
    },
  ],

  routes: [
    {
      title: 'About me',
      to: '/',
      iconName: 'AboutMe',
    },
    {
      title: 'Projects',
      to: '/projects',
      iconName: 'Projects',
    },
    {
      title: 'Articles',
      to: '/articles',
      iconName: 'Articles',
    },
    {
      title: 'Videos',
      to: '/videos',
      iconName: 'Videos',
    },
    {
      title: 'Certificates',
      to: '/certificates',
      iconName: 'Certificates',
    },
  ],

  colors: {
    green: '#64ffda',
    lightBlack: '#1D1D1D',
    black: '#000000',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
