import React, { useRef } from "react";
import PropTypes from "prop-types";

import { rgba } from "@src/utils/generic";
import Context from "@src/components/Context";

import { useTabs } from "../_common/hooks/useTabs";
import { useInput } from "../_common/hooks/useInput";
import { Label } from "../_common/Label";
import TabOption from "./components/TabOption";
import styles from "./Tab.scss";

function Tab({
  className,
  prefixClassName,
  error,
  label,
  options = [],
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  optionKey,
}) {
  const {
    handleChange,
    handleRef,
    width,
    offset,
    activeIndex,
    displayOptions,
  } = useTabs(value, onChange, options, optionKey);
  const { primaryColor } = React.useContext(Context);
  const _TextInputDOM = useRef();
  const { focused, handleFocus, handleBlur } = useInput(
    _TextInputDOM,
    onFocus,
    onBlur,
  );
  const disabledClassName = disabled ? styles.disabled : "";
  return (
    <div
      data-testid="tab"
      tabIndex="0"
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`${styles.tab} ${className} ${prefixClassName}`}
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.dropdownLabel} ${prefixClassName}-label`}
      >
        {label}
      </Label>
      <div
        style={{ borderColor: primaryColor }}
        className={`${styles.tabOptionsWrapper} ${disabledClassName} ${prefixClassName}-options-wrapper`}
      >
        <div
          style={{ backgroundColor: rgba(primaryColor, 0.2) }}
          className={`${styles.tabOptions} ${prefixClassName}-options`}
        >
          {displayOptions.map((displayOption, i) => {
            return (
              <TabOption
                innerRef={handleRef(i)}
                onClick={handleChange(i)}
                selected={activeIndex === i}
                prefixClassName={prefixClassName}
              >
                {displayOption}
              </TabOption>
            );
          })}
        </div>
        <div
          className={`${styles.tabOptionsBG} ${prefixClassName}-selected`}
          style={{ width, left: offset, backgroundColor: primaryColor }}
        />
      </div>
    </div>
  );
}

Tab.propTypes = {
  /** The classname to be appended to the outermost element */
  className: PropTypes.string,
  /** prefix to be appended to the child elements */
  prefixClassName: PropTypes.string,
  /** Disables the Tabs  */
  disabled: PropTypes.bool,
  /** If error occurs, pass on the error */
  error: PropTypes.string,
  /** Label for Tabs  */
  label: PropTypes.string,
  /** On blur function */
  onBlur: PropTypes.func,
  /** On Tab change function */
  onChange: PropTypes.func,
  /** On focus function */
  onFocus: PropTypes.func,
  /** If array of object is passed, the key which is too be displayed */
  optionKey: PropTypes.string,
  /** Array of strings or objects to be passed as options */
  options: PropTypes.array,
  /** Current tab selected */
  value: PropTypes.string,
};

Tab.defaultProps = {
  className: "",
  prefixClassName: "",
  disabled: false,
  error: "",
  label: "",
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  optionKey: "",
  options: [],
  value: "",
};

Tab.classNames = {
  $prefix: "Outermost element",
  "$prefix-label": "Label element",
  "$prefix-options-wrapper": "Wrapper around options tab",
  "$prefix-options": "Container holding all the options",
  "$prefix-option": "Individual option",
  "$prefix-option-text": "Text inside individual option",
  "$prefix-selected": "Background above selected option",
  "$prefix-option-selected": "Selected option div",
  "$prefix-option-selected-text": "Selected option text",
};

export default Tab;
