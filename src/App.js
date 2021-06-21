import './App.css'
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { history } from './utils/history'
import  Login  from './components/login/index'
import CreateUser from './components/createUser'
import Contents from './components/contents'
import UserList from './components/userList'
import EditUser from './components/editUser'


function PrivateRouteAdmin({ children, ...rest }) {

  const userKind = localStorage.getItem("userKind")
  return (
    <Route
      {...rest}
      render={() => {
        return userKind ==='admin' ? children :
        <>
          {alert('No tienes permisos para entrar a este sitio')}
          <Redirect to="/contents" />
        </>
      }}
    />
  )
}

function PrivateRouteUser({ children, ...rest }) {

  const userKind = localStorage.getItem("userKind")
  return (
    <Route
      {...rest}
      render={() => {
        return userKind ==='user' ? children :
        <>
          {alert('No tienes permisos para entrar a este sitio')}
          <Redirect to="/createuser" />
        </>
      }}
    />
  );
}

function App() {
  return (
    <Router history={history}>
      <Switch>
          <PrivateRouteAdmin exact path='/createuser'>
            <CreateUser/>
          </PrivateRouteAdmin>
          <PrivateRouteUser exact path='/contents'>
            <Contents/>
          </PrivateRouteUser>
          <PrivateRouteAdmin exact path='/userlist'>
            <UserList/>
          </PrivateRouteAdmin>
          <PrivateRouteAdmin exact path='/edituser/:userId'>
            <EditUser/>
          </PrivateRouteAdmin>
          <Route exact path='/'>
            <Login/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
