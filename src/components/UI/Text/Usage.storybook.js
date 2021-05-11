import React from "react";
import { storiesOf } from "@storybook/react";

import Provider from "../../Context/Provider";
import Box from "../Box";
import Text from "./Text";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getVariants } from "../../../Theme/Utils";
import { textVariant } from "../../../Theme/text";
import { InlineCode } from "../../../Theme/components";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const importCodeString = `import Text from 'relements/build/esm/ui/text';`;
const variantCodeString = `<Text variant="body.lg">Text component with variant</Text>`;
const colorVariantCodeString = `<Text color="haptik.blue">Text component with color variant</Text>`;
const containerWidth = ["100%", "80%", "60%"];
const sectionStyleProps = {
  flexDirection: "column",
  width: { containerWidth },
  padding: "zero",
  paddingY: "xs",
};

storiesOf("Design System|Helpers", module).add("Text", () => {
  const variant = getVariants({ tokenObject: textVariant });

  const story = (
    <Provider>
      <Text variant="display-2.semi-bold">Design Component - Text</Text>
      <Box {...sectionStyleProps}>
        <Text variant="body.md">
          Text component can be used instead of plain{" "}
          <InlineCode>{`<p>, <span>, <h1...h6>`}</InlineCode> HTML elements. It
          provides variants as per Design system specification.
          <br />
          First, import <InlineCode>Text</InlineCode> component to your file
          like so -
        </Text>
        <SyntaxHighlighter language="jsx" style={xonokai}>
          {importCodeString}
        </SyntaxHighlighter>
      </Box>
      <Box {...sectionStyleProps}>
        <Text variant="h3.semi-bold">
          Examples for <InlineCode>variant</InlineCode> style props
        </Text>
        <SyntaxHighlighter language="jsx" style={xonokai}>
          {variantCodeString}
        </SyntaxHighlighter>
      </Box>
      <Box width={containerWidth} backgroundColor="blue.pastel">
        <Box width="40%">
          <Text variant="h3.semi-bold">Value for "variant" prop</Text>
        </Box>
        <Box width="60%">
          <Text variant="h3.semi-bold">Output</Text>
        </Box>
      </Box>
      {variant.map((textVariant, index) => (
        <Box
          width={containerWidth}
          backgroundColor={index % 2 ? "grey.neon" : "white"}
        >
          <Box width="40%">
            <Text variant="body.large">{textVariant}</Text>
          </Box>
          <Box width="60%">
            <Text variant={textVariant}>Lorem ipsum dolor sit amet.</Text>
          </Box>
        </Box>
      ))}
      {/* Color variant */}
      <Box {...sectionStyleProps} marginTop="lg">
        <Text variant="h3.semi-bold">
          Examples for <InlineCode>color</InlineCode> style props
        </Text>
        <SyntaxHighlighter language="jsx" style={xonokai}>
          {colorVariantCodeString}
        </SyntaxHighlighter>
      </Box>
    </Provider>
  );
  return story;
});
