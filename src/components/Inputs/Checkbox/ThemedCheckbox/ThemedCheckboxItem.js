import React from "react";
import PropTypes from "prop-types";
import Icon from "@src/components/UI/Icon";
import styled from "styled-components";
import variant from "@styled-system/variant";
import Text from "@src/components/UI/Text";
import Box from "@src/components/UI/Box";

import TickIcon from "@src/icons/checkmark.svg";

const checkboxWrapperItem = variant({
  prop: "mode",
  scale: "checkboxItemWrapperModes",
  variants: {
    inline: {},
  },
});

// Non customizable CSS props
const checkboxItemStyle = props => ({
  alignItems: "center",
  cursor: !props.disabled && "pointer",
  pointerEvents: props.disabled && "none",
  "&:last-child": {
    marginBottom: 0,
  },
});

const ThemedCheckboxItemWrapper = styled(Box)(
  checkboxItemStyle,
  checkboxWrapperItem,
);

const iff = (condition, then, otherwise) => (condition ? then : otherwise);

const checkboxItem = variant({
  scale: "checkboxVariants",
  variants: {},
});

// Non customizable CSS props
const checkboxStyle = props => ({
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.2s ease-out",
  backgroundColor: props.value
    ? iff(
        props.disabled,
        props.theme.colors.grey.deep,
        props.theme.colors.blue.haptik,
      )
    : props.theme.colors.background,
  width: 18,
  height: 18,
  marginRight: props.theme.space.sm,
  borderRadius: props.theme.space.xs,
  borderWidth: props.theme.borderWidths.xs,
  borderColor: props.disabled
    ? props.theme.colors.grey.deep
    : props.theme.colors.blue.haptik,
  padding: 0,
});

const ThemedCheckbox = styled(Box)(checkboxStyle, checkboxItem);

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
    <ThemedCheckboxItemWrapper
      disabled={disabled}
      mode={mode}
      onClick={e => onChange(!value, e)}
    >
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
