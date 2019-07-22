import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from './Icon';
import styles from './Icon.storybook.scss';
import { ICON_MAP } from './utils/getIcon';
import { Label } from '../../Inputs/_common/Label';
import Docs from './Icon.mdx';

storiesOf("Components|UI/Icon", module).add("Documentation", () => {
  return <Docs />;
});

export const IconSheet = () => {
  return (
    <div>
      { Object.keys(ICON_MAP).map((key) => {
        return (
          <div className={styles.container}>
            <Icon className={styles.iconsheet} src={ICON_MAP[key]} />
            <Label>{key}</Label>
          </div>
        );
      }) }
    </div>
  );
};
