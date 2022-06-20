import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Header = () => {
  return ( 
    <>
      <h2>Header</h2>
      <NavBar/>
      <Outlet/>
    </>
  );
}
 
export default Header;