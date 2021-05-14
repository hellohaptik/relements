import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "@src/components/UI/Text";
import Box from "@src/components/UI/Box";

const RadioIconOuter = styled("div")({
  width: "18px",
  height: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  marginRight: props => `${props.theme.space.sm}px`,
  border: props =>
    `1px solid ${
      props.disabled
        ? props.theme.colors.grey.dark
        : props.theme.colors.blue.haptik
    }`,
  backgroundColor: props => props.theme.colors.backgroundColor,
});

const RadioIconInner = styled("div")({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  transition: "opacity 0.25s ease, transform 0.25s ease",
  transform: props => (props.selected ? "scale(1, 1)" : "scale(0.5, 0.5)"),
  opacity: props => (props.selected ? 1 : 0),
  backgroundColor: props =>
    props.disabled
      ? props.theme.colors.grey.dark
      : props.theme.colors.blue.haptik,
});

/**
 * Component to render radio icon
 * @param {Object} props
 * @param {boolean} props.selected
 * @param {boolean} props.disabled
 */
const RadioIcon = props => (
  <RadioIconOuter {...props}>
    <RadioIconInner {...props} />
  </RadioIconOuter>
);

RadioIcon.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

const Item = styled(Box)({
  cursor: props => (props.disabled ? "not-allowed" : "pointer"),
  padding: 0,
  flexShrink: 0,
  alignItems: "center",
});

/**
 * Component to render radio options
 * @param {Object} props
 * @param {Object} props.children
 * @param {string} props.value
 * @param {string} props.selectedValue
 * @param {()=>{}} props.onClick
 * @param {Object} props.designProps
 * @param {boolean} props.disabled
 */
const RadioItem = ({
  children,
  value,
  selectedValue,
  onClick,
  designProps,
  disabled = false,
}) => {
  return (
    <Item
      onClick={() => {
        !disabled && onClick && onClick(value);
      }}
      disabled={disabled}
      {...designProps}
    >
      <RadioIcon selected={selectedValue === value} disabled={disabled} />
      <Text variant="body.lg" color={disabled ? "grey.dark" : "text"}>
        {children}
      </Text>
    </Item>
  );
};

RadioItem.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  selectedValue: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  designProps: PropTypes.object,
};

export default RadioItem;
