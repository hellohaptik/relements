import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./Radio.mdx";

import Radio from "./Radio";
import Provider from "@src/components/Context/Provider";
import Box from "@src/components/UI/Box";
import Text from "@src/components/UI/Text";
import { Code, InlineCode } from "../../../Theme/components";

storiesOf("Components|Inputs/Radio", module)
  .add("Old Documentation", () => <Docs />)
  .add("Design Components", () => {
    const importCode = `import Radio from "relements/build/esm/input/radio";`;
    const inlineCode = [
      `<Radio.Themed.Inline onChange={handleOnChange}>`,
      `\t<Radio.Themed.Item value="1">Option 1</Radio.Themed.Item>`,
      `\t<Radio.Themed.Item value="2">Option 2</Radio.Themed.Item>`,
      `</Radio.Themed.Inline>`,
    ].join("\n");
    const stackedCode = [
      `<Radio.Themed.Stacked onChange={handleOnChange}>`,
      `\t<Radio.Themed.Item value="1">Option 1</Radio.Themed.Item>`,
      `\t<Radio.Themed.Item value="2">Option 2</Radio.Themed.Item>`,
      `</Radio.Themed.Stacked>`,
    ].join("\n");
    const disabledCode = [
      `<Radio.Themed.Stacked onChange={handleOnChange}>`,
      `\t<Radio.Themed.Item disabled value="1">Option 1</Radio.Themed.Item>`,
      `\t<Radio.Themed.Item disabled value="2">Option 2</Radio.Themed.Item>`,
      `</Radio.Themed.Stacked>`,
    ].join("\n");
    return (
      <Provider>
        <Box flexDirection="column">
          <Text variant="display-1.semi-bold">Radio Component</Text>
          <Text variant="body.md">
            Radio component is one of the building block components. Usage is
            given below.
          </Text>
        </Box>
        <Box flexDirection="column">
          <Text variant="h2.semi-bold">Import Radio Component</Text>
          <Code>{importCode}</Code>
        </Box>
        <Box flexDirection="column">
          <Text variant="body.md">
            Radio component has two variations. <InlineCode>Stacked</InlineCode>{" "}
            and <InlineCode>Inline</InlineCode>. Usage follows -
          </Text>
          <Text variant="h2.semi-bold">Inline</Text>
          <Radio.Themed.Inline onChange={console.log}>
            <Radio.Themed.Item value="1">Option 1</Radio.Themed.Item>
            <Radio.Themed.Item value="2">Option 2</Radio.Themed.Item>
          </Radio.Themed.Inline>
          <Code>{inlineCode}</Code>

          <Text variant="h2.semi-bold">Stacked</Text>
          <Radio.Themed.Stacked onChange={console.log}>
            <Radio.Themed.Item value="1">Option 1</Radio.Themed.Item>
            <Radio.Themed.Item value="2">Option 2</Radio.Themed.Item>
          </Radio.Themed.Stacked>
          <Code>{stackedCode}</Code>

          <Text variant="h2.semi-bold">Disabled</Text>
          <Radio.Themed.Stacked onChange={console.log}>
            <Radio.Themed.Item disabled value="1">
              Option 1
            </Radio.Themed.Item>
            <Radio.Themed.Item disabled value="2">
              Option 2
            </Radio.Themed.Item>
          </Radio.Themed.Stacked>
          <Code>{disabledCode}</Code>
        </Box>
        <Box flexDirection="column">
          <Text variant="display-2.semi-bold">More examples</Text>
          <Text variant="h4.semi-bold">Inline Radio with emoji values</Text>
          <Radio.Themed.Inline onChange={console.log}>
            {["🍎 Apple", "🍊 Orange", "🍍 Pineapple"].map((option, i) => (
              <Radio.Themed.Item value={option}>{option}</Radio.Themed.Item>
            ))}
          </Radio.Themed.Inline>
          <Code>
            {[
              `<Radio.Themed.Inline onChange={handleOnChange}>`,
              `\t{["🍎 Apple", "🍊 Orange", "🍍 Pineapple"].map((option, i) => (`,
              `\t\t<Radio.Themed.Item value={option}>{option}</Radio.Themed.Item>`,
              `\t))}`,
              `</Radio.Themed.Inline>`,
            ].join("\n")}
          </Code>
          <Text variant="h4.semi-bold">Stacked Radios with custom label</Text>
          <Radio.Themed.Stacked onChange={console.log}>
            {[
              { value: "Yellow", color: "yellow.haptik" },
              { value: "Red", color: "red.haptik" },
              { value: "Blue", color: "blue.haptik" },
            ].map((option, i) => (
              <Radio.Themed.Item key={`3-${i}`} value={option.value}>
                <Box
                  backgroundColor={option.color}
                  borderRadius="lg"
                  padding="zero"
                  paddingX="lg"
                  paddingY="xs"
                  color="background"
                >
                  {option.value}
                </Box>
              </Radio.Themed.Item>
            ))}
          </Radio.Themed.Stacked>
          <Code>
            {[
              `/* Radio wrapper */`,
              `<Radio.Themed.Item value={option.value}>`,
              `\t<Box`,
              `\t\tbackgroundColor={option.color}`,
              `\t\tborderRadius="lg"`,
              `\t\tpadding="zero"`,
              `\t\tpaddingX="lg"`,
              `\t\tpaddingY="xs"`,
              `\t\tcolor="background"`,
              `\t>`,
              `\t\t{option.value}`,
              `\t</Box>`,
              `</Radio.Themed.Item>`,
              `/* Radio wrapper end */`,
            ].join("\n")}
          </Code>
        </Box>
      </Provider>
    );
  });
