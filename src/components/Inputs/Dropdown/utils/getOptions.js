import React from "react";

import Text from "@src/components/UI/Text";
import { DropdownCreateText } from "../ThemedDropdown";

/**
 * getOptions takes some input props and returns
 * the list of options to be rendered by the dropdown component
 * @param {object}    config
 * @param {Object[]}  options         list of options to filter
 * @param {string}    optionKey       the main key for the label. option[optionKey] gives the label
 * @param {string}    noOptionsText   The text to show in case no options are visible
 * @param {string}    createPrefix    In case creation is allowed, then the prefix to append the new text
 * @param {boolean}   withCreate      Whether creation is allowed
 * @param {Object}    value           The currently selected value
 * @param {string}    text            The currently typed value
 * }
 */
export default function getOptions({
  options,
  optionKey,
  noOptionsText,
  createPrefix,
  withCreate,
  value,
  text,
  withCheckbox = false,
  withMultiple = false,
  themed,
}) {
  const isUsingCheckbox = withCheckbox && withMultiple;
  // ===first===
  // filter out the already selected options
  // based on the value.
  // ===second===
  // transform the array of objects to a simple array of objects matching
  // the following structure. Each option is an object
  // {
  //   label: text to be displayed
  //   value: the actual value to be returned on change
  //   isNew: is a newly created input
  //   isZeroState: is a zero state option (when no options available)
  // }
  const flatValue = value.map(valueItem => valueItem[optionKey]);
  const flatOptions = options.map(valueItem => valueItem[optionKey]);
  let filteredOptions = options
    .filter(option => isUsingCheckbox || !flatValue.includes(option[optionKey]))
    .map(option => ({
      label: option[optionKey],
      value: option,
      [isUsingCheckbox && "isSelected"]: flatValue.includes(option[optionKey]),
    }));

  // if creation is allowed we check if the typed text is the same as an option
  // if not, then we inject an option at the top allowing them to create a value
  if (withCreate && !flatOptions.includes(text) && text.trim()) {
    filteredOptions = [
      {
        label: !themed ? (
          `${createPrefix} <strong>${text}</strong>`
        ) : (
          <>
            <DropdownCreateText>{createPrefix}</DropdownCreateText>
            <Text variant="h4.semi-bold">{text}</Text>
          </>
        ),
        value: { [optionKey]: text, type: "CREATE" },
        isNew: true,
      },
      ...filteredOptions,
    ];
  }

  // if there are no filtered options then we return a zero state which is an array with just
  // the zero state option
  return filteredOptions.length
    ? filteredOptions
    : [
        {
          label: noOptionsText,
          value: null,
          isZeroState: true,
        },
      ];
}
