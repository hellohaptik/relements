import React from 'react';
import Icon from 'components/UI/Icon';
import PlaceholderIcon from 'icons/file_placeholder.svg';
import styles from './FilePlaceholder.scss';

const FilePlaceholder = () => (
  <div className={styles.filePlaceholder}>
    <Icon className={styles.filePlaceholderIcon} src={PlaceholderIcon} />
    <div className={styles.filePlaceholderText}>
      <span className={styles.filePlaceholderTextTitle}>Upload / Drag & Drop File</span>
      <span className={styles.filePlaceholderTextSubtitle}>Max File Size: 2MB</span>
      <span className={styles.filePlaceholderTextSubtitle}>Supported Formats: .jpg, .png, .pdf, .docx</span>
    </div>
  </div>
);

export default FilePlaceholder;
