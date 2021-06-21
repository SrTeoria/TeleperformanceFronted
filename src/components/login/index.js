import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from "react-redux"
import { changeEmail, changeError, changePassword } from '../../store/loginReducer'
import { useHistory } from 'react-router-dom'


export default function Login(){

  const history = useHistory()
  const { email, password } = useSelector(({ loginReducer }) => ({
    email: loginReducer.email,
    password: loginReducer.password,
    error: loginReducer.error,
  }))


  const dispatch = useDispatch()

  async function handleSubmit(e){
    e.preventDefault()

    try{
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/login',
        data: {
          email,
          password,
        }
      })
      localStorage.setItem("token", data.token)
      localStorage.setItem("userKind", data.userKind)
      localStorage.setItem("userState", data.userState)


      if (data.userKind === "admin") {
        history.push("/createuser")
      } else if (data.userKind === "user" && data.userState === "activo") {
        history.push("/contents")
      } else {
        alert('Tu estado es inactivo, no puedes iniciar sesion')
        dispatch(changeEmail(''))
        dispatch(changePassword(''))
      }
    } catch(error){
      dispatch(changeError(error.message))
    }
  }

  return(
    <Container>
      <Row className='createUser'>
        <Col md={4} sm={6}>
          <h1 className='tittle'>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                onChange={(e) => dispatch(changeEmail(e.target.value))}
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                onChange={(e) => dispatch(changePassword(e.target.value))}
                value={password}
              />
            </Form.Group>
            <Button className='mt-3' variant="primary" type='submit'>
              Iniciar sesion
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

