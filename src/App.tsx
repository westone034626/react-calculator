import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import styles, { currentOperand } from './App.module.css';

export enum ACTIONTYPES {
  ADD_DIGIT = 'add-digit',
  CHOOSE_OPERATION = 'choose-operation',
  CLEAR = 'clear',
  DELETE_DIGIT = 'delete-digit',
  EVALUATE = 'evaluate',
}

export enum OPERATIONS {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DEVIDE = '÷',
}

interface CalculatorProps {
  currentOperand: string;
  previousOperand: string;
  operation: OPERATIONS;
}

export type PayloadProps =
  | {
      digit?: string;
      operation: OPERATIONS;
    }
  | {
      digit: string;
      operation?: OPERATIONS;
    };

export interface CalculatorActionProps {
  actionType: ACTIONTYPES;
  payload: PayloadProps;
}

function reducer(
  state: CalculatorProps,
  { actionType, payload }: CalculatorActionProps
): CalculatorProps {
  switch (actionType) {
    case ACTIONTYPES.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    default:
      break;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: null, previousOperand: null, operation: null }
  );
  return (
    <div className={styles.gridContainer}>
      <div className={styles.output}>
        <div className={styles.previousOperand}>
          {previousOperand} {operation}
        </div>
        <div className={styles.currentOperand}>{currentOperand}</div>
      </div>
      <button className={styles.spanTwo}>AC</button>
      <button>DEL</button>
      <button>÷</button>
      <DigitButton digit={'1'} dispatch={dispatch} />
      <DigitButton digit={'2'} dispatch={dispatch} />
      <DigitButton digit={'3'} dispatch={dispatch} />
      <button>*</button>
      <DigitButton digit={'4'} dispatch={dispatch} />
      <DigitButton digit={'5'} dispatch={dispatch} />
      <DigitButton digit={'6'} dispatch={dispatch} />
      <button>+</button>
      <DigitButton digit={'7'} dispatch={dispatch} />
      <DigitButton digit={'8'} dispatch={dispatch} />
      <DigitButton digit={'9'} dispatch={dispatch} />
      <button>-</button>
      <button>.</button>
      <DigitButton digit={'0'} dispatch={dispatch} />
      <button className={styles.spanTwo}>=</button>
    </div>
  );
}

export default App;
