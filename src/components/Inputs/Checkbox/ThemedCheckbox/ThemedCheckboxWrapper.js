import styled from "styled-components";
import variant from "@styled-system/variant";

const CheckboxWrapperMode = variant({
    prop: "mode",
    variants: {
      inline: {},
      stacked: {},
    },
});

const style = props => ({
    display: props.mode === 'stacked' ? 'block' : 'flex',
});

const ThemedCheckboxWrapper= styled('div')(style,CheckboxWrapperMode);

ThemedCheckboxWrapper.defaultProps = {
    mode: "stacked",
};

export default ThemedCheckboxWrapper;