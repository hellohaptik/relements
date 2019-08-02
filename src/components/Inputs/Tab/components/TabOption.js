import React from "react";
import PropTypes from "prop-types";

import styles from "./TabOption.scss";

const TabOption = ({
  children,
  onClick,
  selected,
  innerRef,
  prefixClassName,
}) => {
  return (
    <div
      ref={innerRef}
      className={`${styles.tabOption} ${
        selected ? styles.selected : ""
      } ${prefixClassName}-option ${
        selected ? `${prefixClassName}-option-selected` : ""
      }`}
      onClick={onClick}
    >
      <span
        className={`${styles.tabOptionText} ${
          selected ? styles.selected : ""
        } ${prefixClassName}-option-text ${
          selected ? `${prefixClassName}-option-selected-text` : ""
        }`}
      >
        {children}
      </span>
    </div>
  );
};

TabOption.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  innerRef: PropTypes.func,
  prefixClassName: PropTypes.string,
};

export default TabOption;
