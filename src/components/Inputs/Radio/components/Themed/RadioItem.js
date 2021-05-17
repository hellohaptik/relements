import React from "react";
import PropTypes from "prop-types";
import { variant } from "styled-system";
import styled from "styled-components";
import Text from "@src/components/UI/Text";
import Box from "@src/components/UI/Box";

const RadioIconOuter = styled("div")(
  {
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    marginRight: props => `${props.theme.space.sm}px`,
    backgroundColor: props => props.theme.colors.backgroundColor,
    borderStyle: "solid",
    borderWidth: props => `${props.theme.borderWidths.xs}px`,
  },
  variant({
    variants: {
      primary: {
        borderColor: "blue.haptik",
      },
      disabled: {
        borderColor: "grey.dark",
      },
    },
  }),
);

const RadioIconInner = styled("div")(
  {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    transform: props => (props.selected ? "scale(1, 1)" : "scale(0.5, 0.5)"),
    opacity: props => (props.selected ? 1 : 0),
  },
  variant({
    variants: {
      primary: {
        backgroundColor: "blue.haptik",
      },
      disabled: {
        backgroundColor: "grey.dark",
      },
    },
  }),
);

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

const Item = styled(Box)(
  {
    padding: 0,
    flexShrink: 0,
    alignItems: "center",
  },
  variant({
    variants: {
      primary: {
        cursor: "pointer",
      },
      disabled: {
        cursor: "not-allowed",
      },
    },
  }),
  variant({
    prop: "mode",
    variants: {
      inline: {
        marginRight: "md",
      },
      stacked: {
        marginBottom: "md",
      },
    },
  }),
);

const RadioText = styled(Text)(
  variant({
    variants: {
      primary: {
        color: "text",
      },
      disabled: {
        color: "grey.dark",
      },
    },
  }),
);

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
  ...designProps
}) => {
  return (
    <Item
      onClick={() => {
        designProps.variant !== "disabled" && onClick && onClick(value);
      }}
      {...designProps}
    >
      <RadioIcon selected={selectedValue === value} {...designProps} />
      <RadioText variant="body.lg" {...designProps}>
        {children}
      </RadioText>
    </Item>
  );
};

RadioItem.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  selectedValue: PropTypes.string,
  variant: PropTypes.string,
  mode: PropTypes.string,
  onClick: PropTypes.func,
  designProps: PropTypes.object,
};

RadioItem.propTypes = {
  variant: "primary",
  mode: "inline",
};

export default RadioItem;
