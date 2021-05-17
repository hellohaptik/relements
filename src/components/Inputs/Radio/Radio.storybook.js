import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./Radio";
import Provider from "@src/components/Context/Provider";
import Box from "@src/components/UI/Box";
import Text from "@src/components/UI/Text";
import { Code, InlineCode } from "../../../Theme/components";

storiesOf("Components|Inputs/Radio", module).add("Design Components", () => {
  const [value, setValue] = React.useState({ title: "Option 1" });
  const [stackValue, setStackValue] = React.useState({ title: "Option 1" });
  const importCode = `import Radio from "relements/build/esm/input/radio";`;
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
          Radio component has two <InlineCode>mode</InlineCode>
          <Text variant="h4.semi-bold">(default)</Text> of variants.{" "}
          <InlineCode>inline</InlineCode> and <InlineCode>stacked</InlineCode>.
          Whereas, Radio Items has also two variants.{" "}
          <InlineCode>primary</InlineCode>{" "}
          <Text variant="h4.semi-bold">(default)</Text> and{" "}
          <InlineCode>disabled</InlineCode>. Usage is as follows -
        </Text>
        <Text variant="h2.semi-bold">Inline</Text>
        <Radio
          themed
          value={value}
          onChange={setValue}
          options={[{ title: "Option 1" }, { title: "Option 2" }]}
          optionKey="title"
        />
        <Code>
          {[
            `<Radio`,
            `\tthemed`,
            `\tvalue={value}`,
            `\tonChange={setValue}`,
            `\toptions={[{ title: "Option 1" }, { title: "Option 2" }]}`,
            `\toptionKey="title"/>`,
          ].join("\n")}
        </Code>
        <Text variant="h2.semi-bold">Stacked</Text>
        <Radio
          themed
          mode="stacked"
          value={stackValue}
          onChange={setStackValue}
          options={[{ title: "Option 1" }, { title: "Option 2" }]}
          optionKey="title"
        />
        <Code>
          {[
            `<Radio`,
            `\tthemed`,
            `\tmode="stacked"`,
            `\tvalue={value}`,
            `\tonChange={setValue}`,
            `\toptions={[{ title: "Option 1" }, { title: "Option 2" }]}`,
            `\toptionKey="title"/>`,
          ].join("\n")}
        </Code>
        <Text variant="h2.semi-bold">Disabled</Text>
        <Radio
          themed
          mode="stacked"
          value={{ title: "Option 1" }}
          options={[{ title: "Option 1" }, { title: "Option 2" }]}
          optionKey="title"
          variant="disabled"
        />
        <Code>
          {[
            `<Radio`,
            `\tthemed`,
            `\tmode="stacked"`,
            `\tvariant="disabled"`,
            `\tvalue={value}`,
            `\tonChange={setValue}`,
            `\toptions={[{ title: "Option 1" }, { title: "Option 2" }]}`,
            `\toptionKey="title"/>`,
          ].join("\n")}
        </Code>
      </Box>
      <Box flexDirection="column">
        <Text variant="display-2.semi-bold">More examples - with new API</Text>
        <Text variant="h4.semi-bold">Inline Radio with emoji values</Text>
        <Radio.Themed onChange={console.log}>
          {["🍎 Apple", "🍊 Orange", "🍍 Pineapple"].map((option, i) => (
            <Radio.Themed.Item value={option}>{option}</Radio.Themed.Item>
          ))}
        </Radio.Themed>
        <Code>
          {[
            `<Radio.Themed onChange={handleOnChange}>`,
            `\t{["🍎 Apple", "🍊 Orange", "🍍 Pineapple"].map((option, i) => (`,
            `\t\t<Radio.Themed.Item value={option}>{option}</Radio.Themed.Item>`,
            `\t))}`,
            `</Radio.Themed>`,
          ].join("\n")}
        </Code>
        <Text variant="h4.semi-bold">Stacked Radios with custom label</Text>
        <Radio.Themed mode="stacked" onChange={console.log}>
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
        </Radio.Themed>
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
