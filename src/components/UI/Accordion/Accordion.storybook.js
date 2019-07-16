import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./Accordion.mdx";
import Accordion from "./Accordion";

storiesOf("Components|UI/Accordion", module).add("Documentation", () => (
  <Docs />
));

export class AccordionTest extends React.Component {
  state = {
    active: -1,
  };

  render() {
    return (
      <Accordion useDragHandle>
        <Accordion.Item
          active={this.state.active === 1}
          renderHeader={() => this.renderHeader(1)}
          index={1}
          onChange={i => this.setState({ active: i })}
          noPadding
        >
          <div
            data-testid="accordion-body"
            style={{ padding: 8, boxSizing: "border-box" }}
            className="body"
          >
            <h3 style={{ marginTop: 0 }}>This is the body 1</h3>
            <p>This is some long form body</p>
          </div>
        </Accordion.Item>
        <Accordion.Item
          active={this.state.active === 2}
          renderHeader={() => this.renderHeader(2)}
          index={2}
          onChange={i => this.setState({ active: i })}
          noPadding
        >
          <div
            data-testid="accordion-body"
            style={{ padding: 8, boxSizing: "border-box" }}
            className="body"
          >
            <h3 style={{ marginTop: 0 }}>This is the body 2</h3>
            <p>This is some long form body</p>
          </div>
        </Accordion.Item>
      </Accordion>
    );
  }

  renderHeader(i) {
    return (
      <div
        style={{ padding: 8 }}
        className="header"
        data-testid="accordion-header"
      >
        Accordion Header {i}
      </div>
    );
  }
}

AccordionTest.__codeString = `
  <Accordion useDragHandle>
    <Accordion.Item
      active={this.state.active === 1}
      renderHeader={() => this.renderHeader(1)}
      index={1}
      onChange={i => this.setState({ active: i })}
      noPadding
    >
      <div style={{ padding: 8, boxSizing: 'border-box' }} className="body">
        <h3 style={{ marginTop: 0 }}>This is the body</h3>
        <p>This is some long form body</p>
      </div>
    </Accordion.Item>
    <Accordion.Item
      active={this.state.active === 2}
      renderHeader={() => this.renderHeader(2)}
      index={2}
      onChange={i => this.setState({ active: i })}
      noPadding
    >
      <div style={{ padding: 8, boxSizing: 'border-box' }} className="body">
        <h3 style={{ marginTop: 0 }}>This is the body</h3>
        <p>This is some long form body</p>
      </div>
    </Accordion.Item>
  </Accordion>

  renderHeader(i) {
    return (
      <div style={{ padding: 8 }} className="header">
        Accordion Header
        {i}
      </div>
    );
  }
`;
