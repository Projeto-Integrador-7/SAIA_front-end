import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';

import { ButtonOne } from "../../components/Button";
import { FieldInput } from "../../components/Input";

import { AuthContext } from "../../contexts/AuthContext";

import './index.css';

export default function Login() {
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    document.title = `SAIA`
  })
  
  return (
    <div className="login-container">
      <div className="side-image">
        <div className="image" />
      </div>

      <div className="side-login">
        <div className="welcome-text">
          <h2>Olá! Bem-vindo ao SAIA.</h2>
          <p>Insira seus dados abaixo para efetuar o login no sistema.</p>
        </div>

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values) => {
            handleLogin(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="login">
              <div className="input-block">
                <FieldInput
                  name="email"
                  label="E-mail"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-block">
                <FieldInput
                  name="password"
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={values.password}
                  onChange={handleChange}
                >
                  <Link className="forgotten-password" to="/forgotten_password">Esqueceu a senha?</Link>
                </FieldInput>
              </div>

              <div className="input-block">
                <ButtonOne
                  description="Entrar"
                  color="var(--green)"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}