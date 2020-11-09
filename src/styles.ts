import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  * {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  svg {
    pointer-events: none;
  }
`;

export const Calculator = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px 100px 100px;
  align-items: center;
  justify-items: center;

  border: 2px solid #ddd;
  border-radius: 16px;
  background: black;

  button {
    font-size: 40px;
    border: none;
    height: 76px;
    width: 76px;
    border-radius: 50%;

    outline: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.2s;
  }

  #plus-minus {
    position: relative;
    font-size: 40px;

    svg {
      position: absolute;
    }

    svg:first-child {
      top: 20px;
      left: 16px;
    }

    svg:last-child {
      bottom: 20px;
      right: 14px;
    }
  }

  #AC,
  #C {
    font-size: 32px;
  }

  #zero {
    grid-column: 1 / 4;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 270px;
    border-radius: 38px;
  }
`;

interface IOperatorButtonProps {
  isOperatorLocked: boolean;
  storedOperator: string;
  id: string;
}

export const OperatorButton = styled.button<IOperatorButtonProps>`
  background: #d1862e;
  border-radius: 38px;

  &:hover {
    background: #a9671a;
  }

  ${({ isOperatorLocked, storedOperator, id }) =>
    isOperatorLocked &&
    storedOperator === id &&
    css`
      background: #eee;
      color: #d1862e;
    `}
`;

export const DigitButton = styled.button`
  background: #333;
  color: #ddd;

  &:hover {
    background: #222;
  }
`;

export const TopButton = styled.button`
  background: #999;
  color: black;

  &:hover {
    background: #666 !important;
  }
`;

export const Display = styled.div`
  grid-column: 1 / 5;
  position: relative;
  cursor: default;
  width: 100%;

  span {
    padding-right: 16px;
    width: 100%;
    display: block;
    bottom: 0px;
    right: 0px;
    font-size: 64px;
    color: #ddd;
    width: 100%;
    text-align: end;
  }
`;
