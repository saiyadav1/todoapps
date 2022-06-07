import React, { useState, useContext } from "react";
import clsx from "clsx";
import resoluteaiLogo from "../assets/images/resoluteai-logo.png";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../firebase/Firebase";
import {
  PersonAddTwoTone,
  Settings,
  Menu,
  ExitToApp,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  SettingsApplications,
} from "@material-ui/icons";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import TimelineIcon from "@material-ui/icons/Timeline";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import SettingsIcon from "@material-ui/icons/Settings";
import BookIcon from "@material-ui/icons/Book";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  withStyles,
  AppBar,
  Toolbar,
  Drawer,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  makeStyles,
  useTheme,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Dialog,
  DialogContent,
  Grid,
  Button,
} from "@material-ui/core";
import ClientProfile from "./subheader/ClientProfile";
import Notifications from "./subheader/Notifications";
import PublishIcon from "@material-ui/icons/Publish";
import { DataContext } from "../Context/DataContext";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  modalContainer: {
    textAlign: "center",
    paddingTop: "15px",
    paddingBottom: "30px",
  },
}));

const StyledListItem = withStyles({
  root: {
    height: 48,
    marginTop: "10px",
    "&.Mui-selected": {
      backgroundColor: "#FFE8E9",
      color: "black",
      borderLeft: "3px solid #f44336",
      fontWeight: "bolder",
    },
  },
})(ListItem);

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Sample data
const sampleFunc = async () => {
  try {
    await db
      .collection(`data/2021-11-20/timestamp`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  } catch (error) {
    console.log(error);
  }
};
export default function Header() {
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();
  const { title, setTitle } = useContext(DataContext);

  const management = localStorage.getItem("management");
  //Initial component state
  const [open, setOpen] = React.useState(true);

  //Modal state
  const [modelOpen, setModelOpen] = useState(false);
  const modalClose = () => {
    setModelOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listItem = [
    {
      text: "Dashboard",
      icon: (
        <DashboardIcon color={title === "Dashboard" ? "primary" : "default"} />
      ),
      onClick: () => {
        setTitle("Dashboard");
        history.push("/dashboard/home");
      },
    },
    {
      text: "Add Selected Interns",
      icon: (
        <AddCircleIcon
          color={title === "Add Selected Interns" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Add Selected Interns");
        history.push("/dashboard/addselectedinterns");
      },
    },
    // {
    //   text: "Tickets",
    //   icon: (
    //     <ConfirmationNumberIcon
    //       color={title === "Tickets" ? "primary" : "default"}
    //     />
    //   ),
    //   onClick: () => {
    //     setTitle("Tickets");
    //     history.push("/dashboard/tickets");
    //   },
    // },
    {
      text: "Signed-up Interns",
      icon: (
        <BookIcon
          color={title === "Signed-up Interns" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Signed-up Interns");
        history.push("/dashboard/signedupinterns");
      },
    },
    {
      text: "Legal Documents",
      icon: (
        <PublishIcon
          color={title === "Legal Documents" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Legal Documents");
        history.push("/dashboard/uploadlegaldocuments");
      },
    },

    {
      text: "Analytics",
      icon: (
        <InsertChartIcon
          color={title === "Analytics" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Analytics");
        history.push("/dashboard/analytics");
      },
    },
    {
      text: "Settings",
      icon: (
        <SettingsIcon color={title === "Settings" ? "primary" : "default"} />
      ),
      onClick: () => {
        setTitle("Settings");
        history.push("/dashboard/settings");
      },
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h3" style={{ flexGrow: "1" }}></Typography>
          <Notifications />
          <ClientProfile />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div
            className={classes.logoHolder}
            onClick={() => history.push("/dashboard/home")}
          >
            <img src={resoluteaiLogo} alt="Resolute AI" width="100%" />
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {listItem.map(({ text, icon, onClick, index }) => {
            if (management && text === "Register") {
              console.log("register not seen");
            } else {
              return (
                <StyledListItem
                  button
                  key={index}
                  onClick={onClick}
                  selected={title === text}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </StyledListItem>
              );
            }
          })}
        </List>
      </Drawer>
    </div>
  );
}
