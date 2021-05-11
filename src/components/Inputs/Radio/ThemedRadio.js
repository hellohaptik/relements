import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "@src/components/UI/Text";
import Box from "@src/components/UI/Box";

const RadioIcon = styled("div")({
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  marginRight: "8px",
  transition: "box-shadow 0.25s ease",
  backgroundColor: props => props.theme.colors.background,
  boxShadow: props =>
    props.checked
      ? `inset 0 0 0 5px ${props.theme.colors.blue.dark}`
      : `inset 0 0 0 1px ${props.theme.colors.blue.dark}`,
});

const Item = styled(Box)({
  cursor: "pointer",
  padding: 0,
  flexShrink: 0,
  alignItems: "center",
});

export const RadioItem = ({
  children,
  value,
  selected,
  onClick,
  marginProp,
}) => {
  return (
    <Item onClick={() => onClick(value)} {...marginProp}>
      <RadioIcon checked={selected === value} />
      <Text variant="body.lg">{children}</Text>
    </Item>
  );
};

RadioItem.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  selected: PropTypes.string,
  onClick: PropTypes.func,
  marginProp: PropTypes.object,
};

const RadioBody = ({ children, onChange, marginProp }) => {
  const [selected, setSelected] = React.useState();
  React.useEffect(() => {
    onChange && onChange(selected);
  }, [selected]);
  const childrenWithProps = React.Children.map(children, element =>
    React.cloneElement(element, { onClick: setSelected, selected, marginProp }),
  );

  return <>{childrenWithProps}</>;
};

RadioBody.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  marginProp: PropTypes.object,
};

export const RadioInline = ({ children, onChange }) => {
  const marginProp = { marginRight: "md" };
  return (
    <Box>
      <RadioBody onChange={onChange} marginProp={marginProp}>
        {children}
      </RadioBody>
    </Box>
  );
};

RadioInline.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export const RadioStacked = ({ children, onChange }) => {
  const marginProp = { marginBottom: "md" };
  return (
    <Box flexDirection="column">
      <RadioBody onChange={onChange} marginProp={marginProp}>
        {children}
      </RadioBody>
    </Box>
  );
};

RadioStacked.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export function ThemedRadio({ children }) {
  return <>{children}</>;
}

ThemedRadio.propTypes = {
  children: PropTypes.node,
};

ThemedRadio.Inline = RadioInline;
ThemedRadio.Stacked = RadioStacked;
ThemedRadio.Item = RadioItem;
