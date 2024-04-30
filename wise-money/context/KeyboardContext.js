// KeyboardContext.js
import React, { createContext, useState, useContext } from "react";

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openKeyboard = () => {
    setKeyboardVisible(true);
  };

  const closeKeyboard = () => {
    setKeyboardVisible(false);
  };

  return (
    <KeyboardContext.Provider
      value={{
        isKeyboardVisible,
        inputValue,
        setInputValue,
        openKeyboard,
        closeKeyboard,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = () => useContext(KeyboardContext);
