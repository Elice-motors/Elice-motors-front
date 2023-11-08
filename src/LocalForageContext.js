import React, { createContext, useContext, useEffect } from "react";
import localforage from "localforage";

const LocalForageContext = createContext();

export const LocalForageProvider = ({ children }) => {
  useEffect(() => {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: "myCartDatabase",
      storeName: "myCartStore",
    });
  }, []);

  const setItem = async (key, value) => {
    try {
      await localforage.setItem(key, value);
      console.log("데이터가 저장되었습니다.");
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
    }
  };

  const getItem = async (key) => {
    try {
      const value = await localforage.getItem(key);
      console.log("조회된 데이터:", value);
      return value;
    } catch (error) {
      console.error("데이터 조회 중 오류 발생:", error);
    }
  };

  const clear = async () => {
    try {
      await localforage.clear();
    } catch (error) {
      console.error("데이터 삭제중 문제 발생");
    }
  };

  return (
    <LocalForageContext.Provider value={{ setItem, getItem, clear }}>
      {children}
    </LocalForageContext.Provider>
  );
};

export const useLocalForage = () => {
  const context = useContext(LocalForageContext);
  if (context === undefined) {
    throw new Error("useLocalForage must be used within a LocalForageProvider");
  }
  return context;
};
