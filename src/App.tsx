import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import styles from './App.module.css';
import OperationButton from './OperationButton';

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
  overwrite: boolean;
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
  payload?: PayloadProps;
}

function reducer(
  state: CalculatorProps,
  { actionType, payload }: CalculatorActionProps
): CalculatorProps {
  switch (actionType) {
    case ACTIONTYPES.ADD_DIGIT:
      if (state.overwrite)
        return { ...state, overwrite: false, currentOperand: payload.digit };

      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit === '.' && state.currentOperand.includes('.'))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONTYPES.CLEAR:
      return {
        currentOperand: null,
        previousOperand: null,
        operation: null,
        overwrite: false,
      };
    case ACTIONTYPES.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null)
        return state;
      if (state.currentOperand === null) {
        return { ...state, operation: payload.operation };
      }
      if (state.previousOperand === null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };
    case ACTIONTYPES.EVALUATE:
      if (
        state.currentOperand === null ||
        state.previousOperand === null ||
        state.operation === null
      )
        return state;
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
        overwrite: true,
      };
    default:
      break;
    case ACTIONTYPES.DELETE_DIGIT:
      if (state.overwrite)
        return { ...state, overwrite: false, currentOperand: null };
      if (state.currentOperand === null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
  }
}

function evaluate({
  currentOperand,
  previousOperand,
  operation,
}: CalculatorProps) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = 0;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});
function formatOperand(operand: string) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseInt(integer, 10));
  return `${INTEGER_FORMATTER.format(parseInt(integer, 10))}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {
      currentOperand: null,
      previousOperand: null,
      operation: null,
      overwrite: false,
    }
  );
  return (
    <div className={styles.gridContainer}>
      <div className={styles.output}>
        <div className={styles.previousOperand}>
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className={styles.currentOperand}>
          {formatOperand(currentOperand)}
        </div>
      </div>
      <button
        onClick={() => dispatch({ actionType: ACTIONTYPES.CLEAR })}
        className={styles.spanTwo}
      >
        AC
      </button>
      <button
        onClick={() => {
          dispatch({ actionType: ACTIONTYPES.DELETE_DIGIT });
        }}
      >
        DEL
      </button>
      <OperationButton operation={OPERATIONS.DEVIDE} dispatch={dispatch} />
      <DigitButton digit={'1'} dispatch={dispatch} />
      <DigitButton digit={'2'} dispatch={dispatch} />
      <DigitButton digit={'3'} dispatch={dispatch} />
      <OperationButton operation={OPERATIONS.MULTIPLY} dispatch={dispatch} />
      <DigitButton digit={'4'} dispatch={dispatch} />
      <DigitButton digit={'5'} dispatch={dispatch} />
      <DigitButton digit={'6'} dispatch={dispatch} />
      <OperationButton operation={OPERATIONS.PLUS} dispatch={dispatch} />
      <DigitButton digit={'7'} dispatch={dispatch} />
      <DigitButton digit={'8'} dispatch={dispatch} />
      <DigitButton digit={'9'} dispatch={dispatch} />
      <OperationButton operation={OPERATIONS.MINUS} dispatch={dispatch} />
      <DigitButton digit={'.'} dispatch={dispatch} />
      <DigitButton digit={'0'} dispatch={dispatch} />
      <button
        onClick={() => {
          dispatch({ actionType: ACTIONTYPES.EVALUATE });
        }}
        className={styles.spanTwo}
      >
        =
      </button>
    </div>
  );
}

export default App;
