import { createTheme} from '@mui/material/styles';
import { purple } from '@mui/material/colors';
export const  theme=createTheme({
    // palette:{
    //     primary:{
    //         main:purple
    //     },
    //     secondary:{
    //         main:'#FF0000'
    //     },
    // }
        palette: {
          primary: {
            // Purple and green play nicely together.
            main: purple[500],
          },
          secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
        },
     

})