import React from "react";
import Table from "@src/components/UI/Table";
import styles from "./PropsBlock.scss";

const TABLE = {
  columns: [
    {
      title: "Name",
      width: "15%",
    },
    {
      title: "Type",
      width: "10%",
    },
    {
      title: "Default Value",
      width: "15%",
    },
    {
      title: "Description",
    },
  ],
};

const PropsBlock = ({ of }) => {
  const props = of.__docgenInfo.props;
  const generateColumn = content => ({ content });
  const rows = Object.keys(props).map(key => {
    return [
      generateColumn(key),
      generateColumn(props[key].type.name),
      generateColumn(
        props[key].defaultValue ? props[key].defaultValue.value : null,
      ),
      generateColumn(props[key].description),
    ];
  });

  return (
    <Table
      prefixClassName={styles.propsBlock}
      sortable
      sortKey="title"
      sortOrder={-1}
      columns={TABLE.columns}
      rows={rows}
    />
  );
};

export default PropsBlock;
