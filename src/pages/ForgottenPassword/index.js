import React, { useEffect } from "react";

import { ButtonOne } from "../../components/Button";
import { FieldInput } from "../../components/Input";

import './index.css';

export default function ForgottenPassword() {

  useEffect(() => {
    document.title = `SAIA - Recuperação de Senha`
  })

  return (
    <div className="login-container">
      <div className="side-image">
        <div className="image" />
      </div>

      <div className="side-login">
        <div className="welcome-text">
          <h2>Recuperação de senha.</h2>
          <p>Insira seus dados abaixo para recuperar a sua senha.</p>
        </div>
        <div>
          <form className="login">
            <div className="input-block">
              <FieldInput
                label="E-mail"
                type="email"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div className="button-spacing">
              <ButtonOne
                description="Solicitar"
                color="var(--green)"
              />
            </div>
            <div className="button-spacing">
              <ButtonOne
                description="Voltar"
                color="var(--red)"
                link="/"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}