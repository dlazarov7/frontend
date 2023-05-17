import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./Pages/HomePage";
import Employees from './Pages/Employees';
import Companies from './Pages/Companies';
import Teams from './Pages/Teams'
import Login from './Pages/Login';
import Register from './Pages/Register';

export default function App() {


  return (
    
    <div>
      
      <h1>Basic react</h1>
   


      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Employees" element={<Employees />} />
          <Route path="Teams" element={<Teams />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Register/>}/>

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<Companies />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div >
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className='HorizontalBar'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/companies"> Companies</Link>
          </li>
          <li className='login' style={{float: 'right'}} >
            <Link to="/login" >Log in</Link>
          </li>
          <li className='login' style={{float: 'right'}}>
            <Link to="register">Register</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}










