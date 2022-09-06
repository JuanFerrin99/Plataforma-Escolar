import './App.css';
import Router from './components/Router'
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#000000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#ff0000',
      main: '#ff0000',
      dark: '#ff0000',
      contrastText: '#ff0000',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
  </ThemeProvider>
  );
}

export default App;
