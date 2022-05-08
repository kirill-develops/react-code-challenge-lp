import '../styles/global.scss';
import Nav from "../components/Nav/Nav";
import Home from "../pages/Home/Home";
import Universities from "../pages/Universities/Universities";
import PostalLookup from "../pages/PostalLookup/PostalLookup";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route
          path='/'
          element={(<Home />)}
        />
        <Route
          path='/universities'
          element={(<Universities />)}
        />
         <Route
          path='/postal-lookup'
          element={(<PostalLookup />)}
        />
      </Routes>
    </div>
  );
};

export default App;
