import React from "react";
import { storiesOf } from "@storybook/react";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

import Box from "./Box";
import Text from "../Text/Text";
import Provider from "../../Context/Provider";
import { InlineCode, Link } from "../../../Theme/components";

const sectionStyleProp = {
  padding: "zero",
  marginY: "lg",
  flexDirection: "column",
};

SyntaxHighlighter.registerLanguage("jsx", jsx);

const importCode = `import Box from "relements/build/esm/ui/box";`;
const spaceVariantCode = `<Box padding="md" margin="lg">Content</Box>`;
const colorVariantCode = `<Box color="haptik.blue">Content</Box>
<Box backgroundColor="grey.pastel">Content</Box>`;
const borderVariantCode = `<Box borderWidth="xs" borderStyle="dashed" borderColor="grey.dark">Content</Box>`;

storiesOf("Design System|Helpers", module).add("Box", () => {
  const story = (
    <Provider>
      <Box {...sectionStyleProp}>
        <Text variant="display-2.semi-bold">Design Component - Box</Text>
      </Box>
      <Box {...sectionStyleProp}>
        <Text variant="body.md">
          Box can be used to build layouts, instead of raw
          <InlineCode>{`<div>`}</InlineCode>. It is configured to support{" "}
          <InlineCode>
            color, space, border, shadow, layout, position and flexbox
          </InlineCode>{" "}
          style props defined by{" "}
          <Link href="https://styled-system.com/table">style-system.</Link>
        </Text>
      </Box>
      <Box {...sectionStyleProp}>
        <Text variant="body.md">
          First, import <InlineCode>Box</InlineCode> component to your file like
          so -
        </Text>
        <SyntaxHighlighter language="jsx" style={xonokai}>
          {importCode}
        </SyntaxHighlighter>
      </Box>
      <Text variant="h2.semi-bold">
        Examples for most commonly used style props are given below -
      </Text>
      <Box {...sectionStyleProp}>
        <Text variant="body.md">
          Examples for <InlineCode>space</InlineCode> style props. Prop{" "}
          <Link href="https://styled-system.com/table#space">reference</Link>
        </Text>
        <SyntaxHighlighter language="jsx" style={xonokai}>
          {spaceVariantCode}
        </SyntaxHighlighter>
      </Box>
      <Box {...sectionStyleProp}>
        <Text variant="body.md">
          Examples for <InlineCode>color</InlineCode> style props. Prop{" "}
          <Link href="https://styled-system.com/table/#color">reference</Link>
        </Text>
        <SyntaxHighlighter language="jsx" style={xonokai}>
          {colorVariantCode}
        </SyntaxHighlighter>
      </Box>
      <Box {...sectionStyleProp}>
        <Text variant="body.md">
          Examples for <InlineCode>border</InlineCode> style props. Prop{" "}
          <Link href="https://styled-system.com/table/#border">reference</Link>
        </Text>
        <SyntaxHighlighter language="jsx" style={xonokai}>
          {borderVariantCode}
        </SyntaxHighlighter>
      </Box>
    </Provider>
  );
  return story;
});
