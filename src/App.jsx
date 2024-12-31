import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";

// it (styled.) returns us a React element, which we will use in our render logic
const StyledApp = styled.div`
  background-color: yellow;
  &:hover {
    background-color: green;
  }
`;

function App() {
  return (
    <>
      {/* GlobalStyles needs to be sibling, it does not accept any children */}
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Description</Heading>
        <Heading as="h3">Forms</Heading>
      </StyledApp>
    </>
  );
}

export default App;
