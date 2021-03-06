import React, { useContext, useEffect, useState } from 'react';

import { MenuItem, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Formik, Form } from 'formik';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne } from '../../components/Button';

import { AuthContext } from '../../contexts/AuthContext';
import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api'

import './index.css'

export default function CreateEnforcement() {

  const { user } = useContext(AuthContext);
  const { setSnack } = useContext(SnackContext);

  const [educationalTests, setEducationalTests] = useState([])
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    document.title = `SAIA - Criando Aplicação`

    setTimeout(async () => {

      const educationalTestResponse = await api.get(`/avaliacao/user/${user.idUsuario}`)
      setEducationalTests(educationalTestResponse.data.result)

      const subjectsResponse = await api.get(`/disciplina`)
      setSubjects(subjectsResponse.data)

    }, 500)
  }, [user.idUsuario])

  async function create(values) {

    try {

      let idUsuario = user.idUsuario;

      await api.post(`/aplicacao`, { idUsuario, ...values })

      setSnack({ message: "Aplicação criada com sucesso.", type: 'success', open: true });
      history.push("/manager/enforcement")

    } catch (err) {

      setSnack({ message: err.response.data.error, type: 'error', open: true });

    }
  }

  return (
    <Sidebar>
      <PageTitle title="Criando Aplicação" backLink="/manager/enforcement" />
      <Formik
        initialValues={{
          dataInicio: new Date(),
          dataFim: new Date(),
          nome: '',
          idAvaliacao: '',
          idDisciplina: ''
        }}
        onSubmit={async (values) => {
          create(values);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="create-enforcement-form">
            <FullCard title="Dados da Aplicação">

              <div className="input-block">
                <TextField
                  label="Avaliação"
                  name="idAvaliacao"
                  onChange={handleChange}
                  select
                  fullWidth
                >
                  {educationalTests.map((option) => (
                    <MenuItem key={option.idAvaliacao} value={option.idAvaliacao}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="create-enforcement-form-items-1">

                <TextField
                  label="Disciplina"
                  name="idDisciplina"
                  onChange={handleChange}
                  select
                  fullWidth
                >
                  {subjects.map((option) => (
                    <MenuItem key={option.idDisciplina} value={option.idDisciplina}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="number"
                  label="Pontuação"
                  variant="outlined"
                  name="valor"
                  onChange={handleChange}
                  fullWidth
                />

              </div>

              <div className="create-enforcement-form-items-2">

                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
                  <DateTimePicker
                    label="Data Inicio"
                    name="dataInicio"
                    value={values.dataInicio}
                    onChange={value => setFieldValue("dataInicio", value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
                  <DateTimePicker
                    label="Data Fim"
                    name="dataFim"
                    value={values.dataFim}
                    onChange={value => setFieldValue("dataFim", value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

              </div>

            </FullCard>

            <ButtonOne
              description="Criar"
              color="var(--green)"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </Sidebar >
  )
}