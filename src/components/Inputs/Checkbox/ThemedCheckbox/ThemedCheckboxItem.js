import React from "react";
import PropTypes from "prop-types";
import Icon from "@src/components/UI/Icon";

import styled from "styled-components";

import { colors } from "@src/Theme/colors";
import Text from "@src/components/UI/Text";

import TickIcon from "@src/icons/checkmark.svg";

const ThemedCheckboxItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  cursor: ${props => !props.disabled && 'pointer'};
  margin-bottom: ${props => (props.mode === "stacked" ? "12px" : "0px")};
  pointer-events: ${props => props.disabled && 'none'};
`;

const iff = (condition, then, otherwise) => condition ? then : otherwise;

const ThemedCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-out;
  background-color: ${props => props.value ? iff(props.disabled, colors.grey.deep, colors.blue.dark) : colors.background};
  border: 1px solid ${props => (props.disabled ? colors.grey.deep : colors.blue.dark)};
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border-radius: 4px;
`;

const ThemedCheckboxIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  opacity: ${props => (props.value ? 1 : 0)};
  transform: translateY(${props => (props.value ? "0px" : "5px")});
  transition: 0.2s ease-out;
  svg * {
    stroke: #eaeaea;
    stroke-width: 2px;
  }
`;

const ThemedCheckboxItem = props => {
  const { label, onChange, value, disabled, mode } = props;

  return (
    <ThemedCheckboxItemWrapper disabled={disabled} mode={mode} onClick={e => onChange(!value, e)}>
      <ThemedCheckbox disabled={disabled} value={value}>
        <ThemedCheckboxIcon value={value} src={TickIcon} />
      </ThemedCheckbox>
      <Text variant="body.md">{label}</Text>
    </ThemedCheckboxItemWrapper>
  );
};

ThemedCheckboxItem.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  disabled: PropTypes.string,
  mode: PropTypes.string,
};

ThemedCheckboxItem.defaultProps = {
  mode: "inline",
};

export default ThemedCheckboxItem;