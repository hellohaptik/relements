import React from "react";
import { storiesOf } from "@storybook/react";

import Provider from "../components/Context/Provider";
import Box from "../components/UI/Box";
import Text from "../components/UI/Text";

import { colors } from "./colors";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

storiesOf("Design System|Tokens", module).add("Colors tokens", () => {
  const { text, background, ...colorTokens } = colors;
  const codeString = `
    <Text color="blue.pastel">Text component with color</Text>
    // or
    <Box backgroundColor="blue.pastel">Box component with background color</Box>
  `;
  const story = (
    <Provider>
      <Text variant="display-2.semi-bold">Color tokens</Text>
      <Box>Use color variant name below with design components like so -</Box>
      <SyntaxHighlighter language="html" style={tomorrow}>
        {codeString}
      </SyntaxHighlighter>
      {Object.keys(colorTokens).map(colorCategory => (
        <Box flexDirection="column">
          <Text variant="h1.semi-bold">{colorCategory}</Text>
          {Object.keys(colorTokens[colorCategory]).map((token, index) => (
            <Box
              backgroundColor={`${colorCategory}.${token}`}
              flexDirection="column"
            >
              <Text color={index < 3 ? "grey.dark" : "white"}>
                Variant: {colorCategory}.{token}
              </Text>
              <Text color={index < 3 ? "grey.dark" : "white"}>
                HEX code: {colorTokens[colorCategory][token]}
              </Text>
            </Box>
          ))}
        </Box>
      ))}
    </Provider>
  );
  return story;
});
