import React from "react";
import PropTypes from "prop-types";
import * as API from "api";
import cc from "classcat";

import { IMAGE_EXTENSIONS } from "constants";
import * as genericUtils from "utils/generic";
import Loader from "components/UI/Loader";
import Icon from "components/UI/Icon";
import PlusIcon from "icons/plus.svg";
import TrashIcon from "icons/trash.svg";
import PlaceholderIcon from "icons/placeholder.svg";
import styles from "./File.scss";

import FilePlaceholder from "./components/FilePlaceholder";
import ImagePlaceholder from "./components/ImagePlaceholder";
import ImageProgressBar from "./components/ImageProgressBar";

// eslint-disable-next-line max-len
const FILE_ACCEPT_TYPES =
  "image/png, image/jpg, image/jpeg, application/pdf, application/ vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword";
const IMAGE_ACCEPT_TYPES = "image/png, image/jpg, image/jpeg";

class File extends React.Component {
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
    const { value, multiple, className, prefixClassName } = this.props;
    let values = [];
    if (value) {
      values = multiple ? this._transform([value]) : this._transform([value]);
    }

    let { type } = this.props;

    if (type === "file") {
      type = FILE_ACCEPT_TYPES;
    } else if (type === "image") {
      type = IMAGE_ACCEPT_TYPES;
    }

    const uploads = values.concat(this.state.uploads);
    return (
      <div
        data-testid="file"
        className={`${styles.files} ${className} ${prefixClassName}`}
      >
        {uploads.length === 0
          ? this._renderPlaceholder()
          : this._renderFiles(uploads, type)}
        {uploads.length === 0 ? this._renderInput(type) : null}
      </div>
    );
  }

  _renderPlaceholder = () => {
    if (this.props.type === "file") {
      return (
        <FilePlaceholder
          prefixClassName={`${this.props.prefixClassName}-placeholder`}
          size={this.props.size}
        />
      );
    }
    return (
      <ImagePlaceholder
        prefixClassName={`${this.props.prefixClassName}-placeholder`}
        size={this.props.size}
        type={this.props.type}
        dimensions={this.props.dimensions}
      />
    );
  };

  _renderFiles = (uploads, type) => (
    <div
      className={`${styles.filesList} ${this.props.prefixClassName}-wrapper`}
    >
      {uploads.map(this._renderPreview)}
      {this.props.multiple ? this._renderAddMoreButton(type) : null}
    </div>
  );

  _renderAddMoreButton = type => (
    <div
      className={`${styles.addNewFile} ${this.props.prefixClassName}-addmore-wrapper`}
    >
      <Icon
        src={PlusIcon}
        className={`${styles.addNewFileIcon} ${this.props.prefixClassName}-addmore-icon`}
      />
      <span
        className={`${styles.addNewFileText} ${this.props.prefixClassName}-addmore-text`}
      >
        Add more images
      </span>
      {this._renderInput(type)}
    </div>
  );

  _renderInput = type => (
    <input
      className={`${styles.fileInput} ${this.props.prefixClassName}-input`}
      onChange={this._handleFile}
      type="file"
      accept={type}
      multiple={this.props.multiple}
    />
  );

  _renderPreview = (upload, i) => {
    if (upload.fileType === "FILE") return this._renderFilePreview(upload, i);
    return this._renderImagePreview(upload, i);
  };

  _renderImagePreview = (upload, i) => {
    const { isUploading, uploadedPercent, previewURL, value } = upload;
    const imageRatio = this.props.ratio || 1.77;
    const width = this.props.baseWidth || 290;
    const minWidth = width;
    const height = width / imageRatio;
    const URL = value || previewURL;
    return (
      <div
        key={i}
        className={`${styles.imageInputWrapper} ${this.props.prefixClassName}-image-wrapper`}
        style={{ width, height, minWidth }}
      >
        {this._renderImage(URL, isUploading, i)}
        {this._renderLoader(isUploading)}
        <ImageProgressBar
          prefixClassName={`${this.props.prefixClassName}-progressbar`}
          complete={uploadedPercent}
          active={isUploading}
        />
      </div>
    );
  };

  _renderFilePreview = (upload, i) => {
    const { isUploading, uploadedPercent, previewURL, value } = upload;
    const URL = value || previewURL;
    return (
      <div
        key={i}
        className={`${styles.filePreviewWrapper} ${this.props.prefixClassName}-file-wrapper`}
      >
        {this._renderFile(URL, value, isUploading, i)}
        {this._renderLoader(isUploading)}
        <ImageProgressBar
          prefixClassName={`${this.props.prefixClassName}-progressbar`}
          complete={uploadedPercent}
          active={isUploading}
        />
      </div>
    );
  };

  _renderImage = (previewURL, isUploading, index) => {
    const isUploadingClassName = isUploading ? styles.isUploading : "";

    if (!genericUtils.isValidURL(previewURL)) {
      return (
        <div
          className={`${styles.customKeyImage} ${this.props.prefixClassName}-image-preview`}
        >
          <Icon
            className={`${styles.carouselImagePlaceholderIcon} ${this.props.prefixClassName}-image-preview-icon`}
            src={PlaceholderIcon}
          />
          {previewURL}
        </div>
      );
    }

    const classNames = {
      main: cc([styles.imageInputPreview, isUploadingClassName]),
    };

    return (
      <div
        className={`${styles.imageInputPreviewWrapper} ${this.props.prefixClassName}-image-preview`}
      >
        <img
          src={previewURL}
          className={`${classNames.main} ${this.props.prefixClassName}-image-preview-image`}
        />
        <div
          onClick={() => this._deleteFile(index)}
          className={`${styles.imageInputPreviewDelete} ${this.props.prefixClassName}-image-preview-delete`}
        >
          <Icon
            src={TrashIcon}
            className={`${styles.imageInputPreviewDeleteIcon} ${this.props.prefixClassName}-image-preview-delete-icon`}
          />
        </div>
      </div>
    );
  };

  _renderFile = (previewURL, value, isUploading, index) => {
    const isUploadingClassName = isUploading ? styles.isUploading : "";
    return (
      <div
        className={`${styles.filePreview} ${isUploadingClassName} ${this.props.prefixClassName}-file-preview`}
      >
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.filePreviewTitle} ${this.props.prefixClassName}-file-preview-title`}
        >
          {this.state.filenames[index] || "Attachment"}
        </a>
        <div
          onClick={() => this._deleteFile(index)}
          className={`${styles.filePreview} ${this.props.prefixClassName}-file-preview-delete-wrapper`}
        >
          <Icon
            src={TrashIcon}
            className={`${styles.filePreviewDeleteIcon} ${this.props.prefixClassName}-file-preview-delete-icon`}
          />
        </div>
      </div>
    );
  };

  _renderLoader = isUploading => {
    const isUploadingClassName = isUploading ? styles.isUploading : "";
    return (
      <div
        className={`${styles.loader} ${isUploadingClassName} ${this.props.prefixClassName}-loader`}
      >
        <Loader />
      </div>
    );
  };

  _transform = values => {
    return values.map(value => {
      const extenstionRegex = /(?:\.([^.]+))?$/;
      const fileExtension = extenstionRegex.exec(value.split("?")[0])[1];
      const isImage = IMAGE_EXTENSIONS.includes(fileExtension);
      return {
        isUploading: false,
        uploadedPercent: 0,
        fileType: isImage ? "IMAGE" : "FILE",
        previewURL: value,
        value,
      };
    });
  };

  _deleteFile = index => {
    let value = "";
    if (this.props.multiple) {
      value = this.props.value.filter((_, i) => i !== index);
    }

    this.props.onChange(value);
  };

  _handleFile = e => {
    const files = e.target.files;
    if (!this._areFilesValid(files)) return;
    const filenames = [];
    const uploads = [...files].map((file, i) => {
      this._uploadFile(file, i, files.length);
      filenames[i] = file.name;
      const extenstionRegex = /(?:\.([^.]+))?$/;
      const fileExtension = extenstionRegex.exec(file.name)[1];
      const isImage = IMAGE_EXTENSIONS.includes(fileExtension);
      return {
        ...this._newUploadItem,
        previewURL: URL.createObjectURL(file),
        fileType: isImage ? "IMAGE" : "FILE",
      };
    });
    this.setState({ uploads, filenames });
  };

  _uploadFile = (file, index, numFiles) => {
    API.uploadFile(
      file,
      uploadedPercent => this._onUploadProgress(uploadedPercent, index),
      fileURL => this._onUploadComplete(fileURL, index, numFiles),
    );
  };

  _onUploadProgress = (uploadedPercent, index) => {
    this.setState(prevState => {
      const uploads = prevState.uploads;
      uploads[index].uploadedPercent = uploadedPercent;
      return { uploads };
    });
  };

  _onUploadComplete = (uploads, fileURL, index, numFiles) => {
    const value = this.props.value || [];
    const uploadsCompleted = this.state.uploads;
    this.setState(
      prevState => {
        const uploadsCompleted = prevState.uploadsCompleted + 1;
        const uploads = prevState.uploads;
        uploads[index].isUploading = false;
        uploads[index].uploadedPercent = 0;
        uploads[index].value = fileURL;

        return { uploads, uploadsCompleted };
      },
      () => {
        if (this.props.onChange && uploadsCompleted >= numFiles) {
          if (this.props.multiple) {
            this.props.onChange(
              value.concat(uploads.map(upload => upload.value)),
            );
          } else {
            this.props.onChange(uploads[0].value);
          }
          setTimeout(
            () => this.setState({ uploads: [], uploadsCompleted: 0 }),
            0,
          );
        }
      },
    );
  };

  _areFilesValid = files => {
    let isValid = true;
    const errorMessages = [];
    [...files].map(file => {
      if (
        this.props.type !== "file" &&
        file.size > 1024 * 1024 * (this.props.size ? this.props.size : 1)
      ) {
        errorMessages.push(
          `File: ${file.name} must be less than ${
            this.props.size ? this.props.size : 1
          }MB`,
        );
        isValid = false;
      } else if (
        this.props.type === "file" &&
        file.size > 1024 * 1024 * (this.props.size ? this.props.size : 2)
      ) {
        errorMessages.push(
          `File: ${file.name} must be less than ${
            this.props.size ? this.props.size : 2
          }MB`,
        );
        isValid = false;
      }
    });

    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
    }

    return isValid;
  };
}

File.propTypes = {
  /** Names of already choosen file/files */
  value: PropTypes.string,
  /** on change function for input */
  onChange: PropTypes.func,
  /** Boolean value to allow multiple files */
  multiple: PropTypes.bool,
  /** ratio of the preview image to be generated */
  ratio: PropTypes.string,
  /** Base width for the preview image */
  baseWidth: PropTypes.number,
  /** The classname to be appended to the outermost element */
  className: PropTypes.string,
  /** Prefix to be appended before classname to the outermost element and
   *  variation of prefix gets appended to child elements */
  prefixClassName: PropTypes.string,
  /** Type of file to accept (file or image) or you can pass your own custom formats as a string */
  type: PropTypes.string,
  /** Size of the file allowed in MBs */
  size: PropTypes.number,
  /** Dimensions of the file to upload (Doesn't work with type 'file') */
  dimensions: PropTypes.string,
};

File.defaultProps = {
  value: "",
  onChange: () => {},
  multiple: false,
  ratio: "",
  baseWidth: 290,
  className: "",
  prefixClassName: "",
  type: "",
  dimensions: "",
};

File.classNames = {
  $prefix: "Outermost element",
  "$prefix-placeholder-wrapper": "Outermost element of placeholder",
  "$prefix-placeholder-icon": "Icon element of placeholder",
  "$prefix-placeholder-text-wrapper":
    "Wraps all the elements containing text inside placeholder",
  "$prefix-placeholder-title": "Title of placeholder",
  "$prefix-placeholder-filesize": "Filesize warning inside placeholder",
  "$prefix-placeholder-format": "Filesize warning inside placeholder",
  "$prefix-placeholder-image-dimensions": "Dimensions text inside placeholder",
  "$prefix-wrapper": "Wrapper of the files",
  "$prefix-file-wrapper": "Wrapper of individual file divs",
  "$prefix-file-preview": "Preview individual file wrapper",
  "$prefix-file-preview-title": "Title of the file in the preview",
  "$prefix-file-preview-delete-wrapper": "Delete icon wrapper over the preview",
  "$prefix-file-preview-delete-icon": "File delete icon",
  "$prefix-loader": "Loader for the file component",
  "$prefix-progressbar-wrapper": "Wrapper for the progress bar",
  "$prefix-progressbar-bar": "Progress bar inside the wrapper",
  "$prefix-image-wrapper": "Wrapper of individual image divs",
  "$prefix-image-preview": "Wrapper of individual image divs",
  "$prefix-image-preview-icon": "Preview icon for image wrapper",
  "$prefix-image-preview-image": "Image inside wrapper",
  "$prefix-image-preview-delete": "Delete wrapper inside image preview",
  "$prefix-image-preview-delete-icon":
    "Delete icon inside a wrapper image preview",
  "$prefix-input": "Input field",
  "$prefix-addmore-wrapper": "Wrapper for add more button",
  "$prefix-addmore-icon": "Add more button icon",
  "$prefix-addmore-text": "Add more button text",
};

export default File;
