import React from "react";

import Icon from "components/UI/Icon";

import { ALERTBAR_TYPES } from "./constants";

/**
 * renderAlertBarIcon takes type of icon and checks if custom icon
 * is provided and returns the whole Icon component accordingly
 * @param {string}    type        Type of icon (success/warning/error/default)
 * @param {boolean}   customIcon  when passed as true, it will set the icon as the custom icon passed and
 * return the same
 */
export function renderAlertBarIcon(type, customIcon = false) {
  let icon = "";
  let iconPath = "";
  if (customIcon) {
    iconPath = customIcon;
  } else if (type === ALERTBAR_TYPES.SUCCESS) {
    iconPath = "tick";
  } else if (type === ALERTBAR_TYPES.DEFAULT) {
    iconPath = "infoV2";
  } else {
    iconPath = "error_response";
  }
  icon = <Icon src={iconPath} />;
  return icon;
}
