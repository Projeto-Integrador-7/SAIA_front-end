import React, { useContext } from "react"
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Loading from './components/Loading';

import Login from './pages/Login';
import Home from './pages/Home';

import CreateEducationalTest from "./pages/CreateEducationalTest";
import EducationalTest from "./pages/EducationalTest";
import EducationalTestManager from "./pages/EducationalTestManager";
import ViewEducationalTest from "./pages/ViewEducationalTest";

import EducationalTestInProgress from "./pages/EducationalTestInProgress";
import EditEducationalTest from "./pages/EditEducationalTest";

import CreateQuestions from "./pages/CreateQuestions";
import Questions from "./pages/Questions";
import EditQuestions from "./pages/EditQuestions";

import CreateEnforcement from "./pages/CreateEnforcement";
import EditEnforcement from "./pages/EditEnforcement"
import Enforcement from "./pages/Enforcement";

import Users from './pages/Users';
import CreateUsers from './pages/CreateUsers';
import EditUsers from './pages/EditUsers';

import Subjects from './pages/Subjects'
import CreateSubject from './pages/CreateSubject'
import EditSubject from './pages/EditSubject'
import LinkedTeachers from "./pages/LinkedTeachers";
import LinkedStudents from "./pages/LinkedStudents";

import IndividualResults from './pages/IndividualResults';
import UserResults from './pages/UserResults';
import Results from './pages/Results';
import UserProfile from "./pages/UserProfile";

import history from './history/index';

import { AuthContext } from "./contexts/AuthContext";

// Rotas permitidas enquanto estiver não estiver autenticado.
function NoAuthRoute({...rest}) {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <Loading/>;
  }

  if(user){
    return <Redirect to="/home" />
  }

  return <Route {...rest} />;
}

// Rotas permitidas enquanto estiver estiver autenticado.
function PrivateRoute({ isPrivate, ...rest }) {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <Loading/>;
  }

  if (isPrivate && !user) {
    return <Redirect to="/login" />
  }
  
  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        {/* Outros */}
        <PrivateRoute isPrivate path="/home" component={Home} />
        <PrivateRoute isPrivate path="/profile" component={UserProfile} />

        {/* Avaliação (Alunos) */}
        <PrivateRoute isPrivate path="/educational_test/open_test/:id" component={EducationalTestInProgress} />
        <PrivateRoute isPrivate path="/educational_test" component={EducationalTest} />

        {/* Painel Educador - Avaliações */}
        <PrivateRoute isPrivate path="/manager/educational_test/view/:id" component={ViewEducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test/update/:id" component={EditEducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test/create" component={CreateEducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test" component={EducationalTestManager} />

        {/* Painel Educador - Questões */}
        <PrivateRoute isPrivate path="/manager/questions/update/:id" component={EditQuestions} />
        <PrivateRoute isPrivate path="/manager/questions/create" component={CreateQuestions} />
        <PrivateRoute isPrivate path="/manager/questions" component={Questions} />

        {/* Painel Educador - Aplicação Avaliação */}
        <PrivateRoute isPrivate path="/manager/enforcement/individual_results/user_results/:nome/:idUsuario/:idAplicacao" component={UserResults} />
        <PrivateRoute isPrivate path="/manager/enforcement/individual_results/:id" component={IndividualResults} />
        <PrivateRoute isPrivate path="/manager/enforcement/results/:id" component={Results} />
        <PrivateRoute isPrivate path="/manager/enforcement/create" component={CreateEnforcement} />
        <PrivateRoute isPrivate path="/manager/enforcement/update/:id" component={EditEnforcement} />
        <PrivateRoute isPrivate path="/manager/enforcement" component={Enforcement} />

        {/* Painel Educador - Resultados */}
        {/* <PrivateRoute isPrivate path="/manager/general_results" component={GeneralResults} /> */}

        {/* Painel Coordenador - Usuários */}
        <PrivateRoute isPrivate path="/manager/users/update/:id" component={EditUsers} />
        <PrivateRoute isPrivate path="/manager/users/create" component={CreateUsers} />
        <PrivateRoute isPrivate path="/manager/users" component={Users} />

        {/* Painel Coordenador - Disciplinas */}
        <PrivateRoute isPrivate path="/manager/subjects/students/:nome/:id" component={LinkedStudents} />
        <PrivateRoute isPrivate path="/manager/subjects/teachers/:nome/:id" component={LinkedTeachers} />
        <PrivateRoute isPrivate path="/manager/subjects/update/:id" component={EditSubject} />
        <PrivateRoute isPrivate path="/manager/subjects/create" component={CreateSubject} />
        <PrivateRoute isPrivate path="/manager/subjects" component={Subjects} />

        {/* Login */}
        <NoAuthRoute path="/" component={Login} />
        
      </Switch>
    </Router>
  )
}