import React from "react";
import { storiesOf } from "@storybook/react";

import File from "./File.js";
import Docs from "./File.mdx";

const CustomUpload = () => {
  const [selectedFile, setSelectedFile] = React.useState("");

  const updateSelectedFile = React.useCallback(
    file => {
      setSelectedFile(URL.createObjectURL(file));
    },
    [selectedFile],
  );

  return (
    <div>
      Custom Upload
      <File
        customUpload={(file, index, numFiles) => {
          updateSelectedFile(file);
        }}
      />
      {selectedFile && (
        <div className="selectedData">
          Selected File: <br />
          <img src={selectedFile} />
        </div>
      )}
    </div>
  );
};

storiesOf("Components|Inputs/File", module)
  .add("Documentation", () => <Docs />)
  .add("Playground", () => <CustomUpload />);
