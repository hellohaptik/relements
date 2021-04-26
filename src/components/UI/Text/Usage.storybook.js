import React from "react";
import { storiesOf } from "@storybook/react";

import Provider from "../../Context/Provider";
import Box from "../Box";
import Text from "./Text";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getVariants } from "../../../Theme/Utils";
import { textVariant } from "../../../Theme/text";
import { colors } from "../../../Theme/colors";

storiesOf("Design System|Helpers", module).add("Text", () => {
  const variant = getVariants({ tokenObject: textVariant });
  const colorVariant = getVariants({ tokenObject: colors, displayLeaf: true });
  const variantCodeString = `
    <Text variant="body.lg">Text component with variant</Text>
  `;
  const colorVariantCodeString = `
    <Text color="haptik.blue">Text component with color variant</Text>
  `;
  const containerWidth = ["100%", "80%", "60%"];

  const story = (
    <Provider>
      <Text variant="display-2.semi-bold">Design Component - Text</Text>
      <Box
        flexDirection="column"
        width={containerWidth}
        padding="zero"
        paddingY="md"
      >
        <Text>
          One of the helper or building block components that will be used
          frequently is Text
        </Text>
        <SyntaxHighlighter language="html" style={tomorrow}>
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
      <Box marginTop="lg" padding="zero" paddingY="md">
        <Text variant="h1.semi-bold">Text - Usage of color variant</Text>
      </Box>
      <Box
        flexDirection="column"
        width={containerWidth}
        padding="zero"
        paddingY="md"
      >
        <SyntaxHighlighter language="html" style={tomorrow}>
          {colorVariantCodeString}
        </SyntaxHighlighter>
      </Box>
      <Box width={containerWidth} backgroundColor="blue.pastel">
        <Box width="40%">
          <Text variant="h3.semi-bold">Value for "color" prop</Text>
        </Box>
        <Box width="60%">
          <Text variant="h3.semi-bold">Output</Text>
        </Box>
      </Box>
      {colorVariant.map((textColorVariant, index) => (
        <Box
          width={containerWidth}
          backgroundColor={index % 2 ? "grey.neon" : "white"}
        >
          <Box width="40%">
            <Text variant="body.large">{textColorVariant}</Text>
          </Box>
          <Box width="60%">
            <Text color={textColorVariant} variant="h3.semi-bold">
              Lorem ipsum dolor sit amet.
            </Text>
          </Box>
        </Box>
      ))}
    </Provider>
  );
  return story;
});
