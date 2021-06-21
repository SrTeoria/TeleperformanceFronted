import './App.css'
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { history } from './utils/history'
import  Login  from './components/login/index'
import CreateUser from './components/createUser'
import Contents from './components/contents'
import UserList from './components/userList'
import EditUser from './components/editUser'


function PrivateRoute({ children, ...rest }) {

  const token = localStorage.getItem("token")
  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/" />;
      }}
    />
  );
}


function App() {
  return (
    <Router history={history}>
      <Switch>
            <PrivateRoute exact path='/createuser'>
              <CreateUser/>
            </PrivateRoute>
            <PrivateRoute exact path='/contents'>
              <Contents/>
            </PrivateRoute>
            <PrivateRoute exact path='/userlist'>
              <UserList/>
            </PrivateRoute>
            <PrivateRoute exact path='/edituser/:userId'>
              <EditUser/>
            </PrivateRoute>
          <Route exact path='/'>
            <Login/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
