import { addParameters, configure } from '@storybook/react';
import customTheme from './theme';
import './config.scss';

// import the documentation first
require('../src/documentation/index.storybook.js');

// automatically import all files ending in *.storybook.js
const req = require.context('../src', true, /.storybook.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    showPanel: false,
    isToolshown: false,
    sidebarAnimations: false,
    theme: customTheme,
  },
});

configure(loadStories, module);
