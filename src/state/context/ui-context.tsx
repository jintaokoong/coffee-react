import React, { useMemo, useReducer } from 'react';

export const OPEN_DRAWER = 'open_drawer';
export const CLOSE_DRAWER = 'close_drawer';

interface UIState {
  drawerIsOpen: boolean;
}

const INITIAL_STATE: UIState = {
  drawerIsOpen: false,
};

interface OpenDrawerAction {
  type: typeof OPEN_DRAWER;
}

interface CloseDrawerAction {
  type: typeof CLOSE_DRAWER;
}

export type UIAction = OpenDrawerAction | CloseDrawerAction;

const reducer = (state = INITIAL_STATE, action: UIAction): UIState => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawerIsOpen: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerIsOpen: false,
      };
    default:
      return state;
  }
};

export const UIContext = React.createContext<[UIState, React.Dispatch<any>]>([
  INITIAL_STATE,
  () => null,
]);

export const UIContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const values = useMemo<[UIState, React.Dispatch<any>]>(
    () => [state, dispatch],
    [state, dispatch]
  );

  return (
    <UIContext.Provider value={values}>{props.children}</UIContext.Provider>
  );
};
