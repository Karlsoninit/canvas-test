import styled from "@emotion/styled";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  grid-column: 2/12;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Button = styled.button<{ isActive: boolean }>`
  border: ${(p) => `2px solid ${p.isActive ? "#A52A2A" : "#0000FF"}`};
  border-radius: 20px;
  padding: 10px 20px;
  color: #ff0066;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
`;
