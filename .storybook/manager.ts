import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light', // or 'dark'

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#f37c85',
  colorSecondary: '#3d4f8d',
  
  // Brand information
  brandImage: 'https://eqdlycoo48.ufs.sh/f/e0ig7JYH0pJBFi2eMrhLtA3BXgw6RyGusFhQziaPHIcdjWm5',
  brandUrl: 'https://yourwebsite.com',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});