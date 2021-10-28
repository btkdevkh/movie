import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import Home from './pages/Home';
import Create from './pages/Create';
import Favorites from './pages/Favorites';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4682b4"
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/favorites" component={Favorites} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
