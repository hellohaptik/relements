import React from 'react';
import Icon from 'components/UI/Icon';
import PlaceholderIcon from 'icons/placeholder.svg';
import styles from './ImagePlaceholder.scss';

const ImagePlaceholder = () => (
  <div className={styles.imagePlaceholder}>
    <Icon className={styles.imagePlaceholderIcon} src={PlaceholderIcon} />
    <div className={styles.imagePlaceholderText}>
      <span className={styles.imagePlaceholderTextTitle}>Upload / Drag & Drop Image</span>
      <span className={styles.imagePlaceholderTextSubtitle}>Dimensions: 450px X 450px</span>
      <span className={styles.imagePlaceholderTextSubtitle}>Max File Size: 1MB</span>
      <span className={styles.imagePlaceholderTextSubtitle}>Supported Formats: .png, .jpg</span>
    </div>
  </div>
);

export default ImagePlaceholder;
