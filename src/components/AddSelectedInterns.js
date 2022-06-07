import React, { useState } from "react";
import SPOCTable from "./SPOCTable";

function AddSelectedInterns() {
  const [spocDetails, setSpocDetails] = useState([]);
  return (
    <div>
      <SPOCTable spocDetails={spocDetails} setSpocDetails={setSpocDetails} />
    </div>
  );
}

export default AddSelectedInterns;
