import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { db, auth } from "../firebase/Firebase";
import { SnackbarContext } from "./SnackbarContext";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { callSnackbar } = useContext(SnackbarContext);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((client) => {
      if (client) {
        db.collection("SuperAdmin")
          .where("uid", "==", `${client.uid}`)
          .where("email", "==", `${client.email}`)
          .get()
          .then((res) => {
            let newId = "";
            if (res.docs.length == 0) {
              setClient(null);
              return;
            }
            res.forEach((doc) => {
              newId = doc.id;
              setClient({
                userDocId: newId,
                userData: doc.data(),
              });
            });
          });
      } else {
        setClient(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });
  }, [isAuthenticated]);

  const logout = () => {
    setIsLoading(true);
    auth
      .signOut()
      .then(() => {
        console.log("Logout Successful");
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const login = (email, password) => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setIsAuthenticated(true);
        // callSnackbar(true, "Login Successfull", "success");
      })
      .catch((err) => {
        console.log(err.message);
        callSnackbar(true, "Wrong Credentials", "error");
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, client, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
