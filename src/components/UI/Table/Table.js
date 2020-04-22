import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Body from './components/Body';
import styles from './Table.scss';

function Table({
  columns, rows, onSort, onRowClick, sortKey, sortOrder, className, prefixClassName,
}) {
  return (
    <div data-testid="table" className={`${styles.table} ${className} ${prefixClassName}`}>
      <Header
        prefixClassName={`${prefixClassName}-header`}
        onSort={onSort}
        columns={columns}
        sortOrder={sortOrder}
        sortKey={sortKey}
      />
      <Body prefixClassName={`${prefixClassName}-body`} onRowClick={onRowClick} rows={rows} columns={columns} />
    </div>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  ...Header.propTypes,
  ...Body.propTypes,
};

Table.defaultProps = {
  className: '',
  prefixClassName: '',
};

export default Table;
