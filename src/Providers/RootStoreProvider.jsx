import React, { createContext, useContext } from "react";
import { RootStore } from "../Stores/RootStore";

let store;
const StoreContext = createContext(null);
StoreContext.displayName = "StoreContext";

export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }

  return context;
}

export const useStore = () => {
  const { store } = useRootStore();
  return store;
}

export const RootStoreProvider = ({ children }) => {
  const root = store ?? new RootStore();

  return (
    <StoreContext.Provider value={root}>
      {children}
    </StoreContext.Provider>
  );
}