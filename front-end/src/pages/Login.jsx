// import '../styles/login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const data = await requestLogin('login', { email, password });
      console.log('vem do back', data);
    } catch (error) {
      console.log(error);
      setFailedTryLogin(true);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  return (
    <div>
      <section className="user-login-area">
        <form>
          <h1>Área do usuário</h1>
          <label htmlFor="email-input">
            <input
              className="login__login_input"
              type="email"
              value={ email }
              disabled={ ativar }
              onChange={ ({ target: { value } }) => setEmail(value) }
              data-testid="common_login__input-email"
              placeholder="Login"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="common_login__input-password"
              placeholder="Senha"
            />
          </label>
          <button
            data-testid="common_login__button-login"
            type="submit"
            onClick={ (event) => login(event) }
          >
            LOGIN
          </button>
          <button
            data-testid="common_login__button-register"
            type="submit"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </button>
          {
            (failedTryLogin)
              ? (
                <p data-testid="common_login__element-invalid-email">
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                        Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
        </form>
      </section>
    </div>
  );
}
export default Login;
