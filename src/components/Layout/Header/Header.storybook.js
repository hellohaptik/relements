import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from 'components/UI/Button';
import ContextMenu from 'components/Overlays/ContextMenu';
import Header from './Header';
import HeaderLogo from './HeaderLogo';
import HeaderProfile from './HeaderProfile';
import HeaderButtons from './HeaderButtons';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

storiesOf('Components|Layout/Header', module).add('Default', () => {
  const story = (
    <Header>
      <HeaderLeft>
        <HeaderLogo>Bot Maker</HeaderLogo>
      </HeaderLeft>
      <HeaderRight>
        <HeaderButtons>
          <Button size="big" primary>
            Train
          </Button>
          <Button size="big">Transfer</Button>
          <ContextMenu.Button
            size="big"
            title="General Nodes"
            offset={{ top: 40, left: -144 }}
          >
            <ContextMenu.Item size="big">Bot General Nodes</ContextMenu.Item>
            <ContextMenu.Item size="big">Story General Nodes</ContextMenu.Item>
          </ContextMenu.Button>
          <ContextMenu.Button
            size="big"
            title="More"
            offset={{ top: 40, left: -108 }}
          >
            <ContextMenu.Item size="big">Extract Bot</ContextMenu.Item>
            <ContextMenu.Item size="big">General Responses</ContextMenu.Item>
            <ContextMenu.Item size="big">Node Priority</ContextMenu.Item>
          </ContextMenu.Button>
        </HeaderButtons>
        <HeaderProfile
          permissions={[
            'athena_user_logout',
            'expert_daily_password_update',
            'athena_chat_review',
            'athena_chat_transfer_payment',
            'athena_chat_transfer_call',
            'expert_dashboard_view_agents',
            'expert_dashboard_add_edit_agents',
            'admin_publisher_tools_view',
            'mogambo_all_view',
            'mogambo_all_edit',
            'mogambo_all_transfer',
            'plutus_transaction_view',
            'plutus_refund_tools_view',
            'admin_wallet_tools_view',
            'content_store_view',
            'expert_auto_logout_inactive',
            'expert_auto_add_new_partner',
            'all_tools_transfer',
            'teja_edit_columns_for_messages',
            'teja_view_compare_clients',
            'templates_view',
            'templates_edit',
            'athena_user_logout',
            'athena_user_logout',
            'expert_daily_password_update',
            'athena_chat_review',
            'athena_chat_transfer_payment',
            'athena_chat_transfer_call',
            'expert_dashboard_view_agents',
            'expert_dashboard_add_edit_agents',
            'admin_publisher_tools_view',
            'mogambo_all_view',
            'mogambo_all_edit',
            'mogambo_all_transfer',
            'plutus_transaction_view',
            'admin_permission_groups_view',
            'admin_partners_view',
            'plutus_refund_tools_view',
            'admin_wallet_tools_view',
            'content_store_view',
            'admin_canned_response_view',
            'teja_edit_columns_for_messages',
            'teja_view_compare_clients',
            'templates_view',
            'templates_edit',
          ]}
        />
      </HeaderRight>
    </Header>
  );
  return story;
});
