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
  marginRight: "8px",
  border: props => `1px solid ${props.theme.colors.blue.haptik}`,
  backgroundColor: props => props.theme.colors.backgroundColor,
});

const RadioIconInner = styled("div")({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  transition: "opacity 0.25s ease, transform 0.25s ease",
  transform: props => (props.selected ? "scale(1, 1)" : "scale(0.5, 0.5)"),
  opacity: props => (props.selected ? 1 : 0),
  backgroundColor: props => props.theme.colors.blue.haptik,
});

const RadioIcon = ({ selected }) => (
  <RadioIconOuter>
    <RadioIconInner selected={selected} />
  </RadioIconOuter>
);

RadioIcon.propTypes = {
  selected: PropTypes.bool,
};

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
      <RadioIcon selected={selected === value} />
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
