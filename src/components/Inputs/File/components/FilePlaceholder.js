import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import PlaceholderIcon from "icons/file_placeholder.svg";
import styles from "./FilePlaceholder.scss";

const FilePlaceholder = props => (
  <div className={`${styles.filePlaceholder} ${props.prefixClassName}-wrapper`}>
    <Icon
      className={`${styles.filePlaceholderIcon} ${props.prefixClassName}-icon`}
      src={props.customIcon || PlaceholderIcon}
    />
    <div
      className={`${styles.filePlaceholderText} ${props.prefixClassName}-text-wrapper`}
    >
      <span
        className={`${styles.filePlaceholderTextTitle} ${props.prefixClassName}-title`}
      >
        Upload / Drag & Drop File
      </span>
      <span
        className={`${styles.filePlaceholderTextSubtitle} ${props.prefixClassName}-filesize`}
      >
        {`Max File Size: ${props.maxFileSize}MB`}
      </span>
      <span
        className={`${styles.filePlaceholderTextSubtitle} ${props.prefixClassName}-format`}
      >
        Supported Formats: .jpg, .png, .pdf, .docx
      </span>
    </div>
  </div>
);

FilePlaceholder.propTypes = {
  prefixClassName: PropTypes.string,
  maxFileSize: PropTypes.number,
  customIcon: PropTypes.string,
};

export default FilePlaceholder;
