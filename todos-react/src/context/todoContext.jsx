import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

const MY_TODO_APP = 'MY_TODO_APP';

export const TodoContext = createContext();

export default function TodoContextProvider({children}) {
  const [todosUpdated, setTodosUpdated] = useState(() =>
    window.localStorage.getItem(MY_TODO_APP)
  );

  const login = useCallback(function () {
    window.localStorage.setItem(MY_TODO_APP, true);
    setTodosUpdated(true);
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(MY_TODO_APP);
    setTodosUpdated(false);
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      todosUpdated
    }),
    [todosUpdated, login, logout]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

TodoContextProvider.propTypes = {
  children: PropTypes.object
};

export function useTodoContext() {
  return useContext(TodoContext);
}