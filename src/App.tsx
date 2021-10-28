import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import Home from './pages/Home';
import Create from './pages/Create';
import Favorites from './pages/Favorites';
import Layout from './components/Layout';
import Update from './pages/Update';
import Details from './pages/Details';
import Movies from './pages/Movies';

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
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/details/:id" component={Details} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/update/:id" component={Update} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
