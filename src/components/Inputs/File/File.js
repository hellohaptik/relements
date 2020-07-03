import React from "react";
import PropTypes from "prop-types";
import * as API from "api";
import cc from "classcat";

import { IMAGE_EXTENSIONS } from "constants";
import * as genericUtils from "utils/generic";
import Loader from "components/UI/Loader";
import Icon from "components/UI/Icon";
import ToastMessage from "decorators/ToastMessage";
import PlusIcon from "icons/plus.svg";
import TrashIcon from "icons/trash.svg";
import PlaceholderIcon from "icons/placeholder.svg";
import styles from "./File.scss";

import FilePlaceholder from "./components/FilePlaceholder";
import ImagePlaceholder from "./components/ImagePlaceholder";
import ImageProgressBar from "./components/ImageProgressBar";

const FILE_ACCEPT_TYPES =
  // eslint-disable-next-line max-len
  "image/png, image/jpeg, application/pdf, application/ vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword";
const IMAGE_ACCEPT_TYPES = "image/png, image/jpeg";

@ToastMessage()
class File extends React.Component {
  _newUploadItem = {
    isUploading: true,
    uploadedPercent: 25,
    previewURL: undefined,
  };

  constructor() {
    super();
    this.state = {
      uploads: [],
      filenames: [],
      uploadsCompleted: 0,
    };
  }

  render() {
    const { value, multiple, className, prefixClassName } = this.props;
    let values = [];
    if (value) {
      values = multiple ? this._transform(value) : this._transform([value]);
    }

    const uploads = values.concat(this.state.uploads);
    if (this.props.children)
      return this.props.children(uploads, this._renderInput);

    return (
      <div
        data-testid="file"
        className={`${styles.files} ${className} ${prefixClassName}`}
      >
        {uploads.length === 0
          ? this._renderPlaceholder()
          : this._renderFiles(uploads)}
        {uploads.length === 0 ? this._renderInput() : null}
      </div>
    );
  }

  _renderPlaceholder = () => {
    if (this.props.type === "file") {
      return (
        <FilePlaceholder
          prefixClassName={`${this.props.prefixClassName}-placeholder`}
          maxFileSize={this.props.maxFileSize}
        />
      );
    }
    return (
      <ImagePlaceholder
        prefixClassName={`${this.props.prefixClassName}-placeholder`}
        maxFileSize={this.props.maxFileSize}
        type={this.props.type}
        dimensions={this.props.dimensions}
      />
    );
  };

  _renderFiles = uploads => (
    <div
      className={`${styles.filesList} ${this.props.prefixClassName}-wrapper`}
    >
      {uploads.map(this._renderPreview)}
      {this.props.multiple ? this._renderAddMoreButton() : null}
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

  _renderInput = () => {
    let { type } = this.props;

    if (type === "file") {
      type = FILE_ACCEPT_TYPES;
    } else if (type === "image") {
      type = IMAGE_ACCEPT_TYPES;
    }

    return (
      <input
        className={`${styles.fileInput} ${this.props.prefixClassName}-input`}
        onChange={this._handleFile}
        type="file"
        accept={type}
        multiple={this.props.multiple}
      />
    );
  };

  _renderPreview = (upload, i) => {
    if (this.props.onUpload) return this._renderOnUploadPreview(i);
    if (upload.fileType === "file") return this._renderFilePreview(upload, i);
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
          maxFileSize={this.props.maxFileSize}
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
          maxFileSize={this.props.maxFileSize}
        />
      </div>
    );
  };

  /**
   * Renders the preview of the file which has been selected via onUpload prop
   * @param {Number} index index of the file selected
   * */
  _renderOnUploadPreview = index => (
    <div
      key={index}
      className={`${styles.onUploadPreviewWrapper} ${this.props.prefixClassName}-on-upload-wrapper`}
    >
      <div
        className={`${styles.filePreview} ${this.props.prefixClassName}-on-upload-preview`}
      >
        <span className={styles.onUploadFileName}>
          {this.state.filenames[index] || "Attachment"}
        </span>
        <div
          onClick={() => this._deleteFile(index)}
          className={`${styles.filePreview} ${styles.onUploadDeleteWrapper} 
          ${this.props.prefixClassName}-on-upload-preview-delete-wrapper`}
        >
          <Icon
            src={TrashIcon}
            className={`${styles.filePreviewDeleteIcon} 
            ${this.props.prefixClassName}-on-upload-preview-delete-icon`}
          />
        </div>
      </div>
    </div>
  );

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
        fileType: isImage ? "image" : "file",
        previewURL: value,
        value,
      };
    });
  };

  _deleteFile = index => {
    let value = "";
    const { onUpload } = this.props;
    if (onUpload) {
      this.setState(prevState => {
        const uploads = prevState.uploads.filter((_, i) => i !== index);
        const filenames = prevState.filenames.filter((_, i) => i !== index);
        return { uploads, filenames };
      });
    } else if (this.props.multiple) {
      value = this.props.value.filter((_, i) => i !== index);
    }
    this.props.onChange(value);
  };

  _handleFile = e => {
    const { onUpload } = this.props;
    const selectedFiles = e.target.files;
    // Only upload valid files
    const files = this._getValidFiles(selectedFiles);
    const filenames = [];
    const uploads = [...files].map((file, i) => {
      if (onUpload) {
        onUpload(file, i, files.length);
      } else {
        this._uploadFile(file, i, files.length);
      }
      filenames[i] = file.name;
      const extenstionRegex = /(?:\.([^.]+))?$/;
      const fileExtension = extenstionRegex.exec(file.name)[1];
      const isImage = IMAGE_EXTENSIONS.includes(fileExtension);
      return {
        ...this._newUploadItem,
        previewURL: URL.createObjectURL(file),
        fileType: isImage ? "image" : "file",
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

  _onUploadComplete = (fileURL, index, numFiles) => {
    const value = this.props.value || [];
    let uploadsCompleted;
    let uploads;
    this.setState(
      prevState => {
        uploadsCompleted = prevState.uploadsCompleted + 1;
        uploads = prevState.uploads;
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

  _getValidFiles = files => {
    // Validate the file and add them to the below arrays accordingly
    const validFiles = [];
    const errorMessages = [];
    const { type, maxFileSize } = this.props;

    // Accepts the file extenstions and the selected file's type to validate
    const fileValidation = (allowedFileTypes, file, fileType) => {
      if (!allowedFileTypes.includes(fileType)) {
        const errorMsg =
          files.length > 1
            ? "Some of the files selected are invalid."
            : "Invalid File selected.";
        errorMessages.push(
          `${errorMsg} Supported formats: ${allowedFileTypes}`,
        );
      } else if (file.size > 1024 * 1024 * maxFileSize) {
        errorMessages.push(
          `File: ${file.name} must be less than ${maxFileSize}MB`,
        );
      } else {
        validFiles.push(file);
      }
    };

    [...files].map(file => {
      // Image Extension Check
      if (type === "image") {
        const allowedImageTypes = IMAGE_ACCEPT_TYPES.split(", ");
        fileValidation(allowedImageTypes, file, file.type);
      }

      // File Extenstions Check
      else if (type === "file") {
        const allowedFileTypes = FILE_ACCEPT_TYPES.split(", ");
        fileValidation(allowedFileTypes, file, file.type);
      }

      // Custom Extenstions Check
      else {
        // Removed all the dots from the extensions to match the types with filetypes
        const allowedTypes = type.replace(/\./g, "").split(", ");
        const formattedFileType = file.type.split("/");
        const fileType = formattedFileType[formattedFileType.length - 1];
        fileValidation(allowedTypes, file, fileType);
      }
    });

    if (errorMessages.length > 0) {
      this.props.onError();
      // Show the toast message
      this.props.activateToastMessage({
        title: errorMessages.join("\n"),
        type: "NEGATIVE",
      });
    }

    return validFiles;
  };
}

File.propTypes = {
  /** Names of already choosen file/files, could be a string (if single file), could be an array(if multiple files) */
  value: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
  /** on change function for input */
  onChange: PropTypes.func,
  /** Overrides default upload, a function can be passed to override. Returns 'file, index and numFiles' in
   * parameters  */
  onUpload: PropTypes.func,
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
  maxFileSize: PropTypes.number,
  /** Dimensions of the file to upload (Doesn't work with type 'file') */
  dimensions: PropTypes.string,
  /** When a custom ui is needed. This render func calls with uploads and the renderInput function */
  children: PropTypes.func,
  activateToastMessage: PropTypes.func,
  /** Gets called whenever file validation returns an error */
  onError: PropTypes.func,
};

File.defaultProps = {
  value: "",
  onChange: () => {},
  onUpload: null,
  multiple: false,
  ratio: "",
  baseWidth: 290,
  className: "",
  prefixClassName: "",
  type: ".png, .jpeg",
  dimensions: "450px X 450px",
  maxFileSize: 5,
  onError: () => {},
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
  "$prefix-on-upload-wrapper": "Wrapper of individual file divs",
  "$prefix-on-upload-preview": "Preview individual custom file wrapper",
  "$prefix-on-upload-preview-delete-wrapper":
    "Delete icon wrapper over the preview",
  "$prefix-on-upload-preview-delete-icon": "File delete icon",
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
