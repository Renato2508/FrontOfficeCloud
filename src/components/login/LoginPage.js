import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Login.css';

const LoginPage = () => {
  const [login, setLogin] = useState('nota');
  const [motDePasse, setMotDePasse] = useState('nota');
  const navigate = useNavigate();

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/LoginPage');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

     try {
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/login/auth', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ login, motDePasse }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('authToken',data.object.token);
        localStorage.setItem('iduser',data.object.iduser);
        console.log('local storage : '+localStorage.getItem('authToken'));
        navigate('/HomePage', { state: { type: 2 } });
      } else {
        console.log('Login failed:', data)
        console.error('Login failed:', response.status, response.statusText);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle other errors
    }

  };

  return (
    <div className="login-page">
          <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form-group">
              <label htmlFor="username">Username</label>
              <input 
                required 
                name="username" 
                id="username" 
                type="text"
                onChange={(e) => setLogin(e.target.value)} 
                value={login}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input 
                required 
                name="password" 
                id="password" 
                type="password" 
                onChange={(e) => setMotDePasse(e.target.value)}
                value={motDePasse}
              />
            </div>
            <button type="submit" className="login-form-submit-btn">Submit</button>
          </form>
        </div>
    </div>

  );
};

export default LoginPage;
