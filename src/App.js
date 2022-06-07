import "./App.css";
import { customTheme } from "./theme/Theme";
import { ThemeProvider } from "@material-ui/core";
import SnackbarProvider from "./Context/SnackbarContext";
import Routes from "./routes/Routes";
import AuthProvider from "./Context/AuthContext";
import CustomSnackBar from "./common/CustomSnackbar";
import Offerletter from "./tools/offerletter";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <SnackbarProvider>
          <AuthProvider>
            <CustomSnackBar />
            <Routes />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    
    {/* <Offerletter /> */}
    </div>
  );
}

export default App;
