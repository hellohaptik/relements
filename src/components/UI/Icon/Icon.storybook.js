import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from './Icon';
import Docs from './Icon.mdx';

storiesOf('UI/Icon', module).add('Documentation', () => {
  return <Docs />;
});


export const IconSheet = (props) => {
  return (
    props.list.map((item) => {
      return <Icon src={item} />;
    })
  );
};
