import React from 'react';
import { CalculatorActionProps, ACTIONTYPES, OPERATIONS } from './App';

interface OperationButtonProps {
  operation: OPERATIONS;
  dispatch: (props: CalculatorActionProps) => void;
}

const OperationButton: React.FC<OperationButtonProps> = ({
  operation,
  dispatch,
}) => {
  return (
    <button
      onClick={() => {
        dispatch({
          payload: { operation },
          actionType: ACTIONTYPES.CHOOSE_OPERATION,
        });
      }}
    >
      {operation}
    </button>
  );
};

export default OperationButton;
