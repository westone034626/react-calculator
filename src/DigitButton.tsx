import React from 'react';
import { CalculatorActionProps, ACTIONTYPES } from './App';

interface DigitButtonProps {
  digit: string;
  dispatch: (props: CalculatorActionProps) => void;
}

const DigitButton: React.FC<DigitButtonProps> = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() => {
        dispatch({ payload: { digit }, actionType: ACTIONTYPES.ADD_DIGIT });
      }}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
