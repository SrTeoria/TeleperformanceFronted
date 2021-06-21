import { Navbar, Nav, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

export default function Header(){

  const dispatch = useDispatch()
  const history = useHistory()

  const userKind = localStorage.getItem("userKind")
  const token = localStorage.getItem("token")

  function handleClick() {
    dispatch({ type: "USER_LOGOUT" })
    localStorage.clear()
    history.push("/")
  }

  return(
    <Navbar bg="dark" variant='dark' className='navBar'>
      <Row>
        <Col>
          <Navbar.Brand href="#home">Teleperformance</Navbar.Brand>
        </Col>
        <Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              { token && userKind === 'admin' &&
                <>
                  <Nav.Link href="/createuser">Crear usuario</Nav.Link>
                  <Nav.Link href="/userlist">Lista de usuarios</Nav.Link>
                </>
              }
              <Nav.Link className='button' onClick={handleClick}>Cerrar sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Row>
    </Navbar>
  )
}