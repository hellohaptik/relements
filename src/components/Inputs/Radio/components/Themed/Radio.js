import React from "react";
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
const RadioBody = ({ children, onChange, designProps }) => {
  const [selectedValue, setSelectedValue] = React.useState();
  React.useEffect(() => {
    onChange && onChange(selectedValue);
  }, [selectedValue]);
  const childrenWithProps = React.Children.map(children, element =>
    React.cloneElement(element, {
      onClick: setSelectedValue,
      selectedValue,
      designProps,
    }),
  );

  return <>{childrenWithProps}</>;
};

RadioBody.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  designProps: PropTypes.object,
};

/**
 * Component to render radio options inline
 * @component
 * @param {Object} props
 * @param {Object} props.children
 * @param {()=>{}} props.onChange
 */
export const RadioInline = ({ children, onChange }) => {
  const designProps = { marginRight: "md" };
  return (
    <Box>
      <RadioBody onChange={onChange} designProps={designProps}>
        {children}
      </RadioBody>
    </Box>
  );
};

RadioInline.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
};

/**
 * Component to render radio options stacked
 * @component
 * @param {Object} props
 * @param {Object} props.children
 * @param {()=>{}} props.onChange
 */
export const RadioStacked = ({ children, onChange }) => {
  const designProps = { marginBottom: "md" };
  return (
    <Box flexDirection="column">
      <RadioBody onChange={onChange} designProps={designProps}>
        {children}
      </RadioBody>
    </Box>
  );
};

RadioStacked.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
};

/**
 *
 * @param {Object} props
 * @param {Object} props.children
 * @returns
 */
export function Radio({ children }) {
  return <>{children}</>;
}

Radio.propTypes = {
  children: PropTypes.node,
};

Radio.Inline = RadioInline;
Radio.Stacked = RadioStacked;
Radio.Item = RadioItem;
