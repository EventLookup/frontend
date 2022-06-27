import { useContext } from 'react';
import './Login.css';

const Login = () => {
  // const{ setToken } = useContext(AuthContext)
  return ( 
   <main className='main-login'>
      <form action="" method="POST" className='login'>
        <h2>Login</h2>
        <input type="text" name="username" id="username" placeholder="Username" required />
        <input type="password" name="password" id="password" placeholder="Passwort" required />
        <button>Login</button>
      </form>
   </main>
  );
}
 
export default Login;