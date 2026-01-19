"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ReactNativeWebViewContextType {
  isReactNativeWebView: boolean;
}

const ReactNativeWebViewContext = createContext<
  ReactNativeWebViewContextType | undefined
>(undefined);

export const useReactNativeWebView = () => {
  const context = useContext(ReactNativeWebViewContext);
  if (!context) {
    throw new Error("ReactNativeWebView context 없음.");
  }
  return context;
};

export const ReactNativeWebViewProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isReactNativeWebView, setIsReactNativeWebView] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      setIsReactNativeWebView(true);
    }
  }, []);

  return (
    <ReactNativeWebViewContext.Provider value={{ isReactNativeWebView }}>
      {children}
    </ReactNativeWebViewContext.Provider>
  );
};
