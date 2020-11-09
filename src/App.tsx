import React, { useCallback, useState } from 'react';

import { FiPlus, FiMinus, FiX } from 'react-icons/fi';

import {
  GlobalStyle,
  Calculator,
  Display,
  OperatorButton,
  DigitButton,
  TopButton,
} from './styles';

const operation: { [key: string]: (a: string, b: string) => string } = {
  plus(a: string, b: string) {
    return String(Number(a) + Number(b));
  },

  minus(a: string, b: string) {
    return String(Number(a) - Number(b));
  },

  times(a: string, b: string) {
    return String(Number(a) * Number(b));
  },

  divided(a: string, b: string) {
    return String(Number(a) / Number(b));
  },
};

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [storedOperand, setStoredOperand] = useState('');
  const [storedOperator, setStoredOperator] = useState('');
  const [newDisplay, setNewDisplay] = useState(true);
  const [isOperatorLocked, setIsOperatorLocked] = useState(false);

  // EVALUATE
  const evaluate = useCallback((a: string, b: string, op: string) => {
    return operation[op](a, b);
  }, []);

  // CLEAR CLICK (C)
  const handleClear = useCallback(() => {
    setDisplay('0');
    setNewDisplay(true);
  }, []);

  // CLEAR ALL CLICK (C)
  const handleClearAll = useCallback(() => {
    setDisplay('0');
    setNewDisplay(true);
    setStoredOperator('');
    setStoredOperand('');
  }, []);

  // PLUS MINUS CLICK (+/-)
  const handlePlusMinus = useCallback(() => {
    setDisplay(old => String(Number(old) * -1));
  }, []);

  // DIGIT CLICK (0-9)
  const handleDigit = useCallback(
    e => {
      e.persist();

      if (newDisplay || display === '0') {
        setDisplay(e.target.innerText);
      } else {
        if (display.length > 7) return;
        setDisplay(old => old + e.target.innerText);
      }
      setNewDisplay(false);
      setIsOperatorLocked(false);
    },
    [display, newDisplay],
  );

  // OPERATOR CLICK (+, -, x, /)
  const handleOperator = useCallback(
    e => {
      e.persist();
      setNewDisplay(true);

      if (display === 'Err') {
        return;
      }

      if (isOperatorLocked) {
        setStoredOperator(e.target.id);
        return;
      }

      if (!storedOperator) {
        setStoredOperator(e.target.id);
        setStoredOperand(display);
        setIsOperatorLocked(true);
        return;
      }

      if (storedOperator) {
        const result = evaluate(storedOperand, display, storedOperator);

        if (result.length > 8 || !Number.isInteger(Number(result))) {
          setDisplay('Err');
          setNewDisplay(true);
          setStoredOperator('');
          setStoredOperand('');
          return;
        }

        setDisplay(result);
        setStoredOperand(result);
        setStoredOperator(e.target.id);
        setIsOperatorLocked(true);
      }
    },
    [display, evaluate, storedOperator, storedOperand, isOperatorLocked],
  );

  // EQUALS CLICK (=)
  const handleEquals = useCallback(
    e => {
      e.persist();
      setNewDisplay(true);

      if (storedOperator && storedOperand) {
        const result = evaluate(storedOperand, display, storedOperator);

        if (result.length > 8 || !Number.isInteger(Number(result))) {
          setDisplay('Err');
          setNewDisplay(true);
          setStoredOperator('');
          setStoredOperand('');
          return;
        }

        setDisplay(result);
        setStoredOperand(result);
        setIsOperatorLocked(true);
      }
    },
    [display, evaluate, storedOperator, storedOperand],
  );

  return (
    <>
      <GlobalStyle />
      <Calculator>
        <Display>
          <span>{display}</span>
        </Display>
        <TopButton id="AC" onClick={handleClearAll}>
          AC
        </TopButton>
        <TopButton id="C" onClick={handleClear}>
          C
        </TopButton>
        <TopButton id="plus-minus" onClick={handlePlusMinus}>
          <FiPlus size={24} />
          /
          <FiMinus size={24} />
        </TopButton>
        <OperatorButton
          id="divided"
          onClick={handleOperator}
          isOperatorLocked={isOperatorLocked}
          storedOperator={storedOperator}
        >
          /
        </OperatorButton>
        <DigitButton id="seven" onClick={handleDigit}>
          7
        </DigitButton>
        <DigitButton id="eight" onClick={handleDigit}>
          8
        </DigitButton>
        <DigitButton id="nine" onClick={handleDigit}>
          9
        </DigitButton>
        <OperatorButton
          id="times"
          onClick={handleOperator}
          isOperatorLocked={isOperatorLocked}
          storedOperator={storedOperator}
        >
          <FiX size={36} />
        </OperatorButton>
        <DigitButton id="four" onClick={handleDigit}>
          4
        </DigitButton>
        <DigitButton id="five" onClick={handleDigit}>
          5
        </DigitButton>
        <DigitButton id="six" onClick={handleDigit}>
          6
        </DigitButton>
        <OperatorButton
          id="minus"
          onClick={handleOperator}
          isOperatorLocked={isOperatorLocked}
          storedOperator={storedOperator}
        >
          <FiMinus size={36} />
        </OperatorButton>
        <DigitButton id="one" onClick={handleDigit}>
          1
        </DigitButton>
        <DigitButton id="two" onClick={handleDigit}>
          2
        </DigitButton>
        <DigitButton id="three" onClick={handleDigit}>
          3
        </DigitButton>
        <OperatorButton
          id="plus"
          onClick={handleOperator}
          isOperatorLocked={isOperatorLocked}
          storedOperator={storedOperator}
        >
          <FiPlus size={36} />
        </OperatorButton>
        <DigitButton id="zero" onClick={handleDigit}>
          0
        </DigitButton>
        <OperatorButton
          id="equal"
          onClick={handleEquals}
          isOperatorLocked={isOperatorLocked}
          storedOperator={storedOperator}
        >
          =
        </OperatorButton>
      </Calculator>
    </>
  );
};

export default App;
