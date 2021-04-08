import styled from "styled-components";
import { colors } from "@src/Theme/colors";

const ThemedDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${colors.grey.haptik};
`;

export default ThemedDrawerHeader;
