import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  array,
  text,
  object,
  boolean,
} from "@storybook/addon-knobs";
import Dropdown from "./Dropdown";
import Docs from "./Dropdown.mdx";

const stories = storiesOf("Components|Inputs/Dropdown", module);
stories.addDecorator(withKnobs);
const defaultProps = {
  // placeholder: PropTypes.string,
  placeholder: "Select",
  // className: PropTypes.string,
  // value: PropTypes.string,
  value: "Default value",
  // label: PropTypes.string,
  label: "Select dropdown",
  // onChange: PropTypes.func,
  // onFocus: PropTypes.func,
  // onBlur: PropTypes.func,
  // options: PropTypes.array,
  options: [
    { text: "Option text 1" },
    { text: "Option text 2" },
    { text: "Option text 3" },
    { text: "Option text 4" },
  ],

  // optionKey: PropTypes.string,
  optionKey: "text",
  // noOptionsText: PropTypes.string,
  noOptionsText: "No options found",
  // error: PropTypes.string,
  // errorMessage: PropTypes.string,
  // errorMsgClassName: PropTypes.string,
  // hint: PropTypes.string,
  hint: "This is a dropdown",
};

stories
  .add("Default", () => {
    return <DropdownTest />;
  })
  .add("With Search", () => {
    return <DropdownTest withSearch />;
  })
  .add("With Chips", () => {
    return <DropdownTest withMultiple />;
  })
  .add("With Create", () => {
    return <DropdownTest withCreate />;
  })
  .add("Documentation", () => {
    return <Docs />;
  });

const DropdownTest = props => {
  const options = defaultProps.options.map((option, i) => ({
    text: text(`Option ${i + 1}`, option.text),
  }));
  const [value, setValue] = React.useState();
  return (
    <Dropdown
      placeholder="Test placeholder"
      className="my-dropdown"
      prefixClassName="my-yoooo"
      options={options}
      label="This is the label"
      onChange={setValue}
      value={value}
      {...props}
    />
  );
};
