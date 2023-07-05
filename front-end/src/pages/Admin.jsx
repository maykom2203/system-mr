import React, { useState, useEffect } from 'react';
import validator from 'validator';
import AdminNavBar from '../components/AdminNavBar';

function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(undefined);
  const [valid, setValid] = useState(true);

  const validateFields = async () => {
    const six = 6;
    const onze = 11;
    if (validator.isEmail(email) && password.length >= six
    && name.length > onze && role !== '') {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  function registrar() {
    console.log('OK');
  }

  useEffect(() => {
    validateFields();
  }, [name, email, password, role]);

  return (
    <div>
      <AdminNavBar />
      <form>
        <h4>Cadastrar novo usuário</h4>
        <label htmlFor="name">
          Nome
          <input
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            placeholder="seu email@site.com.br"
            data-testid="admin_manage__input-email"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            placeholder="senha"
            data-testid="admin_manage__input-password"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <label htmlFor="tipo">
          Tipo
          <select
            name="tipo"
            data-testid="admin_manage__select-role"
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option>   </option>
            <option>seller</option>
            <option>customer</option>
            <option>administrator</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          disabled={ valid }
          type="button"
          onClick={ registrar }
        >
          Cadastrar

        </button>
      </form>
    </div>
  );
}

export default Admin;
