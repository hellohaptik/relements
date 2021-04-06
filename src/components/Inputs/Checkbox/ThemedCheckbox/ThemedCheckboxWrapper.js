import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

const CheckboxWrapperMode = variant({
    prop: "mode",
    variants: {
      inline: {},
      stacked: {},
    },
});

const style = props => ({
    display: props.mode == 'stacked' ? 'block' : 'flex',
});

const ThemedCheckboxWrapper= styled('div')(style,CheckboxWrapperMode);

ThemedCheckboxWrapper.defaultProps = {
    mode: "inline",
};

export default ThemedCheckboxWrapper;