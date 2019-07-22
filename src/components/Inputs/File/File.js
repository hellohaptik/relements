import React from 'react';
import PropTypes from 'prop-types';
import * as API from 'api';

import { IMAGE_EXTENSIONS } from 'constants';
import * as genericUtils from 'utils/generic';
import Loader from 'components/UI/Loader';
import Icon from 'components/UI/Icon';
import PlusIcon from 'icons/plus.svg';
import TrashIcon from 'icons/trash.svg';
import PlaceholderIcon from 'icons/placeholder.svg';
import styles from './File.scss';

import FilePlaceholder from './components/FilePlaceholder';
import ImagePlaceholder from './components/ImagePlaceholder';
import ImageProgressBar from './components/ImageProgressBar';

const FILE_ACCEPT_TYPES = 'image/png, image/jpg, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword';
const IMAGE_ACCEPT_TYPES = 'image/png, image/jpg, image/jpeg';

export default class Image extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
    ratio: PropTypes.string,
    baseWidth: PropTypes.number,
  };

  _newUploadItem = {
    isUploading: true,
    uploadedPercent: 25,
    previewURL: undefined,
  };

  state = {
    uploads: [],
    filenames: [],
    uploadsCompleted: 0,
  };

  render() {
    const { value, multiple } = this.props;
    let values = [];
    if (value) {
      values = multiple ? this._transform(value) : this._transform([value]);
    }

    const uploads = values.concat(this.state.uploads);
    return (
      <div className={`${styles.files}`}>
        {uploads.length === 0 ? this._renderPlaceholder() : this._renderFiles(uploads)}
        {uploads.length === 0 ? this._renderInput(multiple) : null}
      </div>
    );
  }

  _renderPlaceholder = () => {
    if (this.props.type === 'file') return <FilePlaceholder />;
    return <ImagePlaceholder />;
  };

  _renderFiles = uploads => (
    <div className={styles.filesList}>
      {uploads.map(this._renderPreview)}
      {this.props.multiple ? this._renderAddMoreButton() : null}
    </div>
  );

  _renderAddMoreButton = () => (
    <div className={styles.addNewFile}>
      <Icon src={PlusIcon} className={styles.addNewFileIcon} />
      <span className={styles.addNewFileText}>Add more images</span>
      {this._renderInput(this.props.multiple)}
    </div>
  );

  _renderInput = multiple => (
    <input
      className={styles.fileInput}
      onChange={this._handleFile}
      type="file"
      multiple={multiple}
      accept={this.props.type === 'file' ? FILE_ACCEPT_TYPES : IMAGE_ACCEPT_TYPES}
    />
  );

  _renderPreview = (upload, i) => {
    if (upload.fileType === 'FILE') return this._renderFilePreview(upload, i);
    return this._renderImagePreview(upload, i);
  };

  _renderImagePreview = (upload, i) => {
    const {
      isUploading, uploadedPercent, previewURL, value,
    } = upload;
    const imageRatio = this.props.ratio || 1.77;
    const width = this.props.baseWidth || 290;
    const minWidth = width;
    const height = width / imageRatio;
    const URL = value || previewURL;
    return (
      <div key={i} className={styles.imageInputWrapper} style={{ width, height, minWidth }}>
        {this._renderImage(URL, isUploading, i)}
        {this._renderLoader(isUploading)}
        <ImageProgressBar complete={uploadedPercent} active={isUploading} />
      </div>
    );
  };

  _renderFilePreview = (upload, i) => {
    const {
      isUploading, uploadedPercent, previewURL, value,
    } = upload;
    const URL = value || previewURL;
    return (
      <div key={i} className={styles.filePreviewWrapper}>
        {this._renderFile(URL, value, isUploading, i)}
        {this._renderLoader(isUploading)}
        <ImageProgressBar complete={uploadedPercent} active={isUploading} />
      </div>
    );
  };

  _renderImage = (previewURL, isUploading, index) => {
    const isUploadingClassName = isUploading ? styles.isUploading : '';

    if (!genericUtils.isValidURL(previewURL)) {
      return (
        <div className={styles.customKeyImage}>
          <Icon className={styles.carouselImagePlaceholderIcon} src={PlaceholderIcon} />
          {previewURL}
        </div>
      );
    }

    return (
      <div className={styles.imageInputPreviewWrapper}>
        <img src={previewURL} className={`${styles.imageInputPreview} ${isUploadingClassName}`} />
        <div onClick={() => this._deleteFile(index)} className={styles.imageInputPreviewDelete}>
          <Icon src={TrashIcon} className={styles.imageInputPreviewDeleteIcon} />
        </div>
      </div>
    );
  };

  _renderFile = (previewURL, value, isUploading, index) => {
    const isUploadingClassName = isUploading ? styles.isUploading : '';
    return (
      <div className={`${styles.filePreview} ${isUploadingClassName}`}>
        <a href={value} target="_blank" className={styles.filePreviewTitle}>
          {this.state.filenames[index] || 'Attachment'}
        </a>
        <div onClick={() => this._deleteFile(index)} className={styles.filePreview}>
          <Icon src={TrashIcon} className={styles.filePreviewDeleteIcon} />
        </div>
      </div>
    );
  };

  _renderLoader = (isUploading) => {
    const isUploadingClassName = isUploading ? styles.isUploading : '';
    return (
      <div className={`${styles.loader} ${isUploadingClassName}`}>
        <Loader />
      </div>
    );
  };

  _transform = (values) => {
    return values.map((value) => {
      const extenstionRegex = /(?:\.([^.]+))?$/;
      const fileExtension = extenstionRegex.exec(value.split('?')[0])[1];
      const isImage = IMAGE_EXTENSIONS.includes(fileExtension);
      return {
        isUploading: false,
        uploadedPercent: 0,
        fileType: isImage ? 'IMAGE' : 'FILE',
        previewURL: value,
        value,
      };
    });
  };

  _deleteFile = (index) => {
    let value = '';
    if (this.props.multiple) {
      value = this.props.value.filter((_, i) => i !== index);
    }

    this.props.onChange(value);
  };

  _handleFile = (e) => {
    const files = e.target.files;
    if (!this._areFilesValid(files)) return;
    const filenames = [];
    const uploads = [...files].map((file, i) => {
      this._uploadFile(file, i, files.length);
      filenames[i] = file.name;
      const extenstionRegex = /(?:\.([^.]+))?$/;
      const fileExtension = extenstionRegex.exec(file.name)[1];
      const isImage = IMAGE_EXTENSIONS.includes(fileExtension);
      return { ...this._newUploadItem, previewURL: URL.createObjectURL(file), fileType: isImage ? 'IMAGE' : 'FILE' };
    });
    this.setState({ uploads, filenames });
  };

  _uploadFile = (file, index, numFiles) => {
    API.uploadFile(
      file,
      uploadedPercent => this._onUploadProgress(uploadedPercent, index),
      fileURL => this._onUploadComplete(fileURL, index, numFiles)
    );
  };

  _onUploadProgress = (uploadedPercent, index) => {
    const uploads = this.state.uploads;
    uploads[index].uploadedPercent = uploadedPercent;
    this.setState({ uploads });
  };

  _onUploadComplete = (fileURL, index, numFiles) => {
    const uploads = this.state.uploads;
    const value = this.props.value || [];
    const uploadsCompleted = this.state.uploadsCompleted + 1;
    uploads[index].isUploading = false;
    uploads[index].uploadedPercent = 0;
    uploads[index].value = fileURL;
    this.setState({ uploads, uploadsCompleted }, () => {
      if (this.props.onChange && uploadsCompleted >= numFiles) {
        if (this.props.multiple) {
          this.props.onChange(value.concat(uploads.map(upload => upload.value)));
        } else {
          this.props.onChange(uploads[0].value);
        }
        setTimeout(() => this.setState({ uploads: [], uploadsCompleted: 0 }), 0);
      }
    });
  };

  _areFilesValid = (files) => {
    let isValid = true;
    const errorMessages = [];
    [...files].map((file) => {
      if (this.props.type !== 'file' && file.size > 1024 * 1024) {
        errorMessages.push(`File: ${file.name} must be less than 1MB`);
        isValid = false;
      } else if (this.props.type === 'file' && file.size > 1024 * 1024 * 2) {
        errorMessages.push(`File: ${file.name} must be less than 2MB`);
        isValid = false;
      }
    });

    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
    }

    return isValid;
  };
}
