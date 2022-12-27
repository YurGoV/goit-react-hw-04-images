import styled from '@emotion/styled';

export const Button = styled.button`
  display: flex;
  width: 120px;
  height: 48px;
  border: 0;
  justify-content: center;
  align-items: center;
  background-position: center;
  opacity: 0.5;
  cursor: pointer;

  &hover {
    opacity: 1;
  }
`;

export const Span = styled.span`
  display: inline-block;
  padding: 0;
  color: black;
`;

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 16px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;

  &placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

