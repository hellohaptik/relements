import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";
import Text from "@src/components/UI/Text";
import Icon from "@src/components/UI/Icon";

import ThemedHeader from "../ThemedTable/ThemedHeader";
import ThemedHeaderItem from "../ThemedTable/ThemedHeaderItem";

import styles from "./Header.scss";

function Header({
  prefixClassName,
  onSort,
  columns,
  sortKey,
  sortOrder,
  themed,
  designProps,
}) {
  const { primaryColor } = useContext(Context);
  if (!columns || columns.length === 0) return null;

  if (themed) {
    return (
      <ThemedHeader>
        {columns.map((column, i) => {
          const isTheSortedColumn = sortKey === column.sortKey;
          const isActive = column.sortKey && isTheSortedColumn;
          const sortIcon =
            column.sortKey &&
            isTheSortedColumn &&
            (sortOrder === 1 ? "▲" : "▼");
          return (
            <ThemedHeaderItem
              key={i}
              style={{
                width: column.width,
                maxWidth: column.width,
                minWidth: column.width,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
              onClick={() => onSort(column)}
              {...designProps}
            >
              {column.prefixComponent || null}

              <Text
                {...designProps}
                variant="heading"
                color={isActive ? "blue.haptik" : "text"}
              >
                {column.title}
              </Text>
              {sortIcon && (
                <div
                  style={{ color: isActive ? primaryColor : undefined }}
                  className={`${styles.tableHeaderItemIcon} ${prefixClassName}-icon`}
                >
                  {sortIcon}
                </div>
              )}
              {column.info && (
                <Icon themed tooltip={column.info} src="infoV3" size="small" />
              )}
              {column.postfixComponent || null}
            </ThemedHeaderItem>
          );
        })}
      </ThemedHeader>
    );
  }
  return (
    <div className={`${styles.tableHeader} ${prefixClassName}`}>
      {columns.map((column, i) => {
        const isTheSortedColumn = sortKey === column.sortKey;
        const isActive = column.sortKey && isTheSortedColumn;
        const activeClassName = isActive ? styles.active : "";
        const sortIcon =
          column.sortKey && isTheSortedColumn && (sortOrder === 1 ? "▲" : "▼");
        return (
          <div
            key={i}
            className={`${styles.tableHeaderItem} ${activeClassName} ${prefixClassName}-column ${column.className}`}
            style={{
              width: column.width,
              maxWidth: column.width,
              minWidth: column.width,
            }}
            onClick={() => onSort(column)}
          >
            {column.prefixComponent || null}
            <div
              style={{ color: isActive ? primaryColor : undefined }}
              className={`${styles.tableHeaderItemText} ${prefixClassName}-title`}
            >
              {column.title}
            </div>
            <div
              style={{ color: isActive ? primaryColor : undefined }}
              className={`${styles.tableHeaderItemIcon} ${prefixClassName}-icon`}
            >
              {sortIcon}
            </div>
            {column.postfixComponent || null}
          </div>
        );
      })}
    </div>
  );
}

Header.propTypes = {
  prefixClassName: PropTypes.string,
  onSort: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object),
  sortOrder: PropTypes.number,
  sortKey: PropTypes.string,
  themed: PropTypes.bool,
  designProps: PropTypes.shape({}),
};

Header.defaultProps = {
  prefixClassName: "",
  onSort: () => {},
  columns: [],
  sortOrder: -1,
  sortKey: "",
};

export default Header;
