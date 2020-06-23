import React from "react";

import Icon from "components/UI/Icon";
import SuccessIcon from "icons/tick.svg";
import WarningIcon from "icons/red-exclamation.svg";
import DefaultIcon from "./icons/defaultIcon.svg";

/**
 * renderAlertBarIcon takes type of icon and checks if custom icon
 * is provided and returns the whole Icon component accordingly
 * @param {string}    type        Type of icon (success/warning/error/default)
 * @param {boolean}   customIcon  when passed as true, it will set the icon as the custom icon passed and
 *                                return the same
 */
export function renderAlertBarIcon(type, customIcon = false) {
  let icon = "";
  let iconPath = "";
  if (customIcon) {
    iconPath = customIcon;
  } else if (type === "success") {
    iconPath = SuccessIcon;
  } else if (type === "default") {
    iconPath = DefaultIcon;
  } else {
    iconPath = WarningIcon;
  }
  icon = <Icon src={iconPath} />;
  return icon;
}
