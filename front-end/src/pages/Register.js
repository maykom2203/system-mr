import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { registerSchema } from '../Schemas/registerSchema';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [badRegister, setBadRegister] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const enabledButton = () => {
      const { error } = registerSchema.validate({ name, email, password });
      if (!error) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [name, email, password]);

  const handleChangeName = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
  };


  const invalidRegisterMessage = (
    <span
      data-testid="common_register__element-invalid_register"
    >
      Dados inválidos
    </span>);

  return (
    <div>
      <form>
        <label htmlFor="name-input-register">
          Nome
          <input
            onChange={ handleChangeName }
            data-testid="common_register__input-name"
            id="name-input-register"
            type="name"
            placeholder="Nome"
          />
        </label>
        <label htmlFor="email-input-register">
          Email
          <input
            onChange={ handleChangeEmail }
            data-testid="common_register__input-email"
            id="email-input-register"
            type="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password-input-register">
          Senha
          <input
            onChange={ handleChangePassword }
            data-testid="common_register__input-password"
            id="password-input-register"
            type="password"
            placeholder="Senha"
          />
       </label>
        <button
          onClick={ register }
          type="button"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
        >
          Cadastrar
        </button>
        { badRegister && invalidRegisterMessage }
      </form>
    </div>
  );
}

export default Register;
