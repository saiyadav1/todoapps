import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase/Firebase";

export const DataContext = createContext();

export default function DataProvide({ children }) {
  const [title, setTitle] = useState("Dashboard");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [expected, setExpected] = useState(10);
  const expectedFunc = (e) => {
    setExpected(e);
  };
  let colours = [
    "#FA2609",
    "#444444",
    "#868686",
    "#EDEDED",
    "#FFA000",
    "#57fc3a",
    "#d40416",
  ];

  const [candidatesData, setCandidatesData] = useState([]);

  useEffect(() => {
    db.collection("SuperAdmin")
      .where("uid", "==", `onnRbKgz9XXZPZEYHsPi38gHStz2`)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        // console.log(data);
      });
    db.collection("SelectedCandidates")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        console.log(data);
        setCandidatesData(data);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{
        expected,
        expectedFunc,
        open,
        handleOpen,
        handleClose,
        title,
        setTitle,
        colours,
        candidatesData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
