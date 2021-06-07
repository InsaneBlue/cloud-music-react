import styled from "styled-components";

export const Content = styled.div`
  position: fixed;
  top: 94px;
  left: 0;
  bottom: ${(props) => (props.isPlaying > 0 ? "60px" : 0)};
  width: 100%;
`;
