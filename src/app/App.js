import { Route, Routes } from 'react-router-dom';

import Nav from "../components/Nav/Nav";
import Home from "../pages/Home";
import Universities from "../pages/Universities";
import PostalLookup from "../pages/PostalLookup";

const App = () => (
    <>
      <Nav />
      <Routes>
        <Route
          path='/react-code-challenge-lp/'
          element={(<Home />)}
        />
        <Route
          path='/react-code-challenge-lp/universities'
          element={(<Universities />)}
        />
         <Route
          path='/react-code-challenge-lp/postal-lookup'
          element={(<PostalLookup />)}
        />
      </Routes>
    </>
  );

export default App;
