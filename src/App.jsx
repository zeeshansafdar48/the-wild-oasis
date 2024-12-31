import styled from "styled-components";

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 900;
`;

const Input = styled.input`
  padding: 12px 20px;
  border: 1px solid #ddd;
`;

function App() {
  return (
    <div>
      <H1>Testing</H1>
      <Input type="number" placeholder="Please add number" />
    </div>
  );
}

export default App;
