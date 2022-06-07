import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./Header";

import { makeStyles } from "@material-ui/core";
import DashboardHome from "./DashboardHome";
import Settings from "./Settings";
import { AuthContext } from "../Context/AuthContext";
import AddSelectedInterns from "./AddSelectedInterns";
import SignedupInterns from "./SignedupInterns";
import UploadLegalDocuments from "./UploadLegalDocuments";
import Offerletter from '../tools/offerletter';
import InternsDetails from "./common/internsDetails";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    height: "100vh",
  },
  toolBar: theme.mixins.toolbar,
  contentBody: {
    flexGrow: 1,
    padding: theme.spacing(4, 3),
    backgroundColor: "#FAFAFA",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const path = "/dashboard";
  const { client } = useContext(AuthContext);

  return (
    <div className={classes.mainContainer}>
      <Header />
      <div className={classes.contentBody}>
        <div className={classes.toolBar}></div>
        {/* {client && <Redirect to="/dashboard/home" />} */}
        <Switch>
          <Route path={`${path}/home`} component={DashboardHome} />
          <Route
            path={`${path}/addselectedinterns`}
            component={AddSelectedInterns}
          />
          <Route path={`${path}/signedupinterns`} component={SignedupInterns} />
          <Route
            path={`${path}/uploadlegaldocuments`}
            component={UploadLegalDocuments}
          />

          <Route path={`${path}/settings`} component={Settings} />
          <Route path={`${path}/offerletter`} component={Offerletter}/>
          <Route path={`${path}/internsDetails`} component={InternsDetails}/>
        </Switch>
        
      </div>
    </div>
  );
}
