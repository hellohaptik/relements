import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import ContextMenu from 'components/Overlays/ContextMenu';
import styles from './HeaderProfile.scss';

const PAGES = {
  mogambo_all_view: {
    title: 'Mogambo',
    url: '/mogambo',
  },
  teja_view_compare_clients: {
    title: 'Analytics',
    url: '/dashboard',
  },
  plutus_transaction_view: {
    title: 'Plutus',
    url: '/plutus',
  },
  content_store_view: {
    title: 'Content Store',
    url: '/admin_tools/custom_messages/',
  },
  admin_publisher_tools_view: {
    title: 'Admin Tools',
    url: '/haptik_admin',
  },
};

const HeaderProfile = ({
  children, className, onLogout, permissions = [], helpSection,
}) => {
  return (
    <div className={`${styles.headerProfile} ${className}`}>
      {/* <Button className={styles.headerProfileFeedbackButton} size="big">
        Give Feedback
      </Button> */}
      {helpSection && (
        <ContextMenu.Icon
          iconType="question"
          className={styles.headerProfileFeedbackIcon}
          offset={{ top: 38, left: -32 }}
          maxMenuHeight="600px"
        >
          {helpSection}
        </ContextMenu.Icon>
      )}
      {permissions.length > 0 ? (
        <ContextMenu.Icon iconType="grid" className={styles.headerProfileFeedbackIcon} offset={{ top: 38, left: -32 }}>
          {permissions
            .filter((permission, pos) => {
              return permissions.indexOf(permission) == pos;
            })
            .sort((a, b) => {
              if (!PAGES[a] && !PAGES[b]) return 1;
              if (!PAGES[a] || !PAGES[b]) return -1;
              return PAGES[a].title > PAGES[b].title;
            })
            .map((permission, i) => {
              const page = PAGES[permission];
              if (!page) return null;
              return (
                <ContextMenu.Item size="big" href={page.url}>
                  {page.title}
                </ContextMenu.Item>
              );
            })}
        </ContextMenu.Icon>
      ) : null}
      <ContextMenu.Icon
        iconComponent={renderProfileImage()}
        className={styles.headerProfileFeedbackIcon}
        offset={{ top: 38, left: -32 }}
      >
        <ContextMenu.Item size="big" href="/profile/">
          My Profile
        </ContextMenu.Item>
        {children}
        <ContextMenu.Item size="big" onClick={onLogout}>
          Logout
        </ContextMenu.Item>
      </ContextMenu.Icon>
    </div>
  );
};

function renderProfileImage() {
  return (
    <div className={styles.headerProfileIcon}>
      <Icon iconType="profile" />
    </div>
  );
}

HeaderProfile.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default HeaderProfile;
