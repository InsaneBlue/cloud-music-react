import React from "react";
import { Container } from "./style";

function Album() {
  return (
    <Container play={0}>
      <p className="album">this is album component</p>
    </Container>
  );
}

export default React.memo(Album);
