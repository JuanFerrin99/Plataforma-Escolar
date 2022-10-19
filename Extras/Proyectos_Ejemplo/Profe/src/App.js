import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import MisRoutes from './components/MisRoutes';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0F0FFF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MisRoutes />
    </ThemeProvider>
  );
}

export default App;
