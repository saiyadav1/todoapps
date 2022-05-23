
import './App.css';
import Todoform from './component/todoform';
import SignUp from './pages/SignUp'
import SignIn from './pages/signin'
import {BrowserRouter as Router,Routes,Switch,Route} from 'react-router-dom'
import Newsign from './pages/newsign';
import {  ThemeProvider, styled } from '@mui/material/styles';
import {theme} from './theme/contexttheme'
function App() {
  return (
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
      <Routes>
      <Route path="/newsignup" element={<Newsign/>}/>
      <Route path="/"  element={ <Todoform />}/>
      <Route path="/signup" element={ <SignUp/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      
      </Routes>
     </ThemeProvider>
    </div>
    </Router>
  // );
}

export default App;


// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <main>This app is using the dark mode</main>
//     </ThemeProvider>
//   );
// }

// export default App;