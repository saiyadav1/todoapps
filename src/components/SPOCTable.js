import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  TextField,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableContainer,
  Table,
  TableBody,
  Tooltip,
  Button,
  Box,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { db } from "../firebase/Firebase";
import { SnackbarContext } from "../Context/SnackbarContext";
import { DataContext } from "../Context/DataContext";

const headings = ["Email Id"];
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSelect-root": {
      padding: theme.spacing(1, 4),
    },
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableHead: {
    backgroundColor: "#EEEEEE",
  },
  tableHeadRow: {
    backgroundColor: "#FFE8E9",
  },
  card: {
    padding: theme.spacing(3, 4),
  },
  actionIcons: {
    // marginRight: "20px",
  },
}));
export default function SPOCTable({ spocDetails, setSpocDetails }) {
  const classes = useStyles();
  const { callSnackbar } = useContext(SnackbarContext);
  const [rowInput, setRowInput] = useState({
    email: "",
  });
  const { candidateData } = useContext(DataContext);
  const [exist, setExist] = useState(false);

  useEffect(() => {
    candidateData &&
      candidateData.forEach((val) => {
        if (val.candidateDetails.basicDetails.email === rowInput.email) {
          setExist(true);
          callSnackbar(true, "Email already exists", "error");
        } else {
          setExist(false);
        }
      });
  }, [rowInput, candidateData]);

  //Pagination task
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 5));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, spocDetails.length - page * rowsPerPage);
  // Removing an object when delete button is pressed
  function handleDeleteRow(toDeleteIndex) {
    const deletedDetails = spocDetails.filter(
      (_, index) => toDeleteIndex !== index
    );
    setSpocDetails(deletedDetails);
  }
  // Setting row input on Change
  function handleInputChange(e) {
    setRowInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  // Add new Row on Clicking save
  function addRow() {
    if (!rowInput.email) {
      callSnackbar(true, "Please enter email", "error");
    } else {
      setSpocDetails((prev) => [...prev, rowInput]);
      setRowInput({ email: "" });
    }
  }
  console.log(spocDetails);

  //resetting table values
  function handleReset() {
    setRowInput({ email: "" });
    setSpocDetails([]);
  }

  // function to push all data to the database
  function addSelectedCandidates() {
    if (exist) {
      callSnackbar(true, "Email already exists", "error");
    } else {
      spocDetails.map((val) => {
        const data = {
          candidateDetails: {
            basicDetails: val,
          },
        };
        db.collection("SelectedCandidates")
          .add(data)
          .then((res) => {
            handleReset();
            callSnackbar(true, "Candidates added successfully!", "success");
          })
          .catch((err) => console.log(err));
      });
    }
  }

  return (
    <div>
      <ValidatorForm>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow className={classes.tableHeadRow}>
                <TableCell align="left" colSpan={headings.length + 1}>
                  <Typography variant="h2">Add Selected Candidates</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                {headings.map((heading) => (
                  <TableCell align="center">
                    <b> {heading}</b>
                  </TableCell>
                ))}
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spocDetails &&
                spocDetails.map((row, index) => (
                  <TableRow key={index}>
                    {/* <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.designation}</TableCell>
                    <TableCell align="center">{row.phoneNo}</TableCell> */}
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete row">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            handleDeleteRow(index);
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                {/* <TableCell align="center">
                  <TextValidator
                    placeholder="Full Name"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    name="name"
                    value={rowInput.name}
                    onChange={handleInputChange}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextValidator
                    placeholder="Designation"
                    label="Designation"
                    fullWidth
                    variant="outlined"
                    name="designation"
                    value={rowInput.designation}
                    onChange={handleInputChange}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextValidator
                    placeholder="Phone Number "
                    label="Phone Number "
                    fullWidth
                    type="tel"
                    variant="outlined"
                    name="phoneNo"
                    value={rowInput.phoneNo}
                    onChange={handleInputChange}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </TableCell> */}
                <TableCell align="center">
                  <TextValidator
                    placeholder="Email ID"
                    label="Email ID"
                    fullWidth
                    variant="outlined"
                    name="email"
                    value={rowInput.email}
                    onChange={handleInputChange}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "This field is required",
                      "Not a valid Email ID",
                    ]}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Save">
                    <IconButton onClick={addRow}>
                      <AddCircle />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={spocDetails.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableFooter>
          </Table>
        </TableContainer>
        <Box style={{ padding: "20px", textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => addSelectedCandidates()}
          >
            Add Selected Candidates
          </Button>
        </Box>
      </ValidatorForm>
    </div>
  );
}
