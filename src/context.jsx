import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userSavedMovies, setUserSavedMovies] = useState([]);

  const moviesReference = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    onSnapshot(moviesReference, (doc) => {
      setUserSavedMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const isMobileDevice = () => {
    //The buttons look ugly in mobile devices.

    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(navigator.userAgent);
  };

  const signUp = (email, password, userName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // user created successfully, write user data to database
        setDoc(doc(db, "users", userCredential.user.email), {
          savedShows: [],
          userName: userName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (curentUser) => {
      setUser(curentUser);
    });
    return () => unsuscribe;
  }, []);

  return (
    <AppContext.Provider
      value={{ signUp, logIn, logOut, user, isMobileDevice, userSavedMovies }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
