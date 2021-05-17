import React from "react";
import { variant } from "styled-system";
import styled from "styled-components";
import PropTypes from "prop-types";
import Box from "@src/components/UI/Box";
import RadioItem from "./RadioItem";

/**
 * Intermediatory component to in-house state logic for Radio
 * @component
 * @param {Object} props
 * @param {Object} props.children
 * @param {()=>{}} props.onChange
 * @param {Object} props.designProps
 */
const RadioBody = ({ children, onChange, ...designProps }) => {
  const [selectedValue, setSelectedValue] = React.useState();
  React.useEffect(() => {
    onChange && onChange(selectedValue);
  }, [selectedValue]);
  const childrenWithProps = React.Children.map(children, element =>
    React.cloneElement(element, {
      onClick: setSelectedValue,
      selectedValue,
      ...designProps,
    }),
  );

  return <>{childrenWithProps}</>;
};

RadioBody.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export const RadioWrapper = styled(Box)(
  variant({
    prop: "mode",
    variants: {
      inline: { flexDirection: "row" },
      stacked: { flexDirection: "column" },
    },
  }),
);

RadioWrapper.defaultProps = {
  variant: "primary",
};

/**
 *
 * @param {Object} props
 * @param {Object} props.children
 * @param {string} props.mode
 * @param {string} props.variant
 * @returns
 */
export function Radio({ children, ...restProps }) {
  return (
    <RadioWrapper {...restProps}>
      <RadioBody {...restProps}>{children}</RadioBody>
    </RadioWrapper>
  );
}

Radio.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.string,
  variant: PropTypes.string,
};

Radio.defaultProps = {
  mode: "inline",
  variant: "primary",
};

Radio.Item = RadioItem;
