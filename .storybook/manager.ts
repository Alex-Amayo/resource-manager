import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light', // or 'dark'

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#313fd1',
  colorSecondary: '#313fd1',
  
  // Brand information
  brandImage: 'https://eqdlycoo48.ufs.sh/f/e0ig7JYH0pJBYunVegKEHV04O3qdAmTnyMGQrj9gfUi8ueP6',
  brandUrl: 'https://yourwebsite.com',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});