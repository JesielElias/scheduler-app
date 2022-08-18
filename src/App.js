import RouterApp from "./routes";
import './app.css';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    background: {
      default: 'red'
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterApp></RouterApp>


      </div>
    </ThemeProvider>
  );
}

export default App;
