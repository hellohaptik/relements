/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import Text from "@src/components/UI/Text";

import ThemedRowItem from "../ThemedTable/ThemedRowItem";

import styles from "./Row.scss";

function Row({
  index,
  style,
  data,
  onClick,
  prefixClassName,
  widths,
  themed,
  designProps,
}) {
  const row = data[index];
  const rowColumns = Array.isArray(row) ? row : row.columns;
  const disabledClassName = row.disabled ? styles.disabled : "";
  const rowClassName = row.className || "";

  if (row.hidden) return null;

  return (
    <div
      style={style}
      key={`${index}-${row.id}`}
      className={`${styles.tableRow} ${disabledClassName} ${prefixClassName} ${rowClassName}`}
      onClick={() => onClick(index, row)}
    >
      {rowColumns.map((column, i) => {
        if (themed) {
          return (
            <ThemedRowItem
              {...designProps}
              key={i}
              style={{
                width: widths[i],
                maxWidth: widths[i],
                minWidth: widths[i],
              }}
            >
              <Text {...designProps}>{column.content}</Text>
            </ThemedRowItem>
          );
        }
        return (
          <div
            key={i}
            className={`${styles.tableRowItem} ${prefixClassName}-column`}
            style={{
              width: widths[i],
              maxWidth: widths[i],
              minWidth: widths[i],
            }}
          >
            <div
              className={`${styles.tableRowItemText} ${prefixClassName}-column-content`}
            >
              {column.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Row.propTypes = {
  prefixClassName: PropTypes.string,
  widths: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  index: PropTypes.number,
  style: PropTypes.shape({}),
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        columns: PropTypes.array,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        hidden: PropTypes.bool,
      }),
    ),
  ),
  themed: PropTypes.bool,
  designProps: PropTypes.shape({}),
};

export default Row;
