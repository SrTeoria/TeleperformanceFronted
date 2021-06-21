import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import './styles.css'
import {  changeActive, changeDateOfAdmision, changeEmail,
  changeError, changeIsAdmin, changeLastName, changeName,
  changePassword, changeRole, changeSalary} from '../../store/createUserReducer'
import Header from '../header/index'
import { useParams } from "react-router"
import { getUser } from '../../store/createUserReducer'
import { useHistory } from 'react-router-dom'


export default function EditUser(){

  const history = useHistory()
  const dispatch = useDispatch()
  const { userId } = useParams()

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

  const {
    email,
    password,
    name,
    lastName,
    role,
    salary,
    dateOfAdmision,
    userType,
    active,
  } = useSelector(({createUserReducer}) => ({
    email: createUserReducer.email,
    password: createUserReducer.password,
    name: createUserReducer.name,
    lastName: createUserReducer.lastName,
    role: createUserReducer.role,
    salary: createUserReducer.salary,
    dateOfAdmision: createUserReducer.dateOfAdmision,
    userType: createUserReducer.userType,
    active: createUserReducer.active,
  }))

  async function handleSubmit(e){
    e.preventDefault()
    const token = localStorage.getItem("token")
    try{
      await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/users/editUser",
        data: {
          _id: userId,
          email,
          password,
          name,
          lastName,
          role,
          salary,
          dateOfAdmision,
          userType,
          active,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert('Los cambios se han realizado exitosamente')
      history.push("/userlist")
    } catch(error){
      dispatch(changeError(error.message))
    }
  }

  return(
    <>
      <Header/>
      <Container>
        <div>
          <h1 className='tittle'>ADMINISTRADOR DE USUARIOS</h1>
          <Row className='createUser'>
            <Col md={4} sm={6}>
              <h2 className='tittle'>Editar Usuario</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                  type="email"
                  placeholder="Ingrese correo"
                  onChange={(e) => dispatch(changeEmail(e.target.value))}
                  value={email}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                  type="password"
                  placeholder="Ingrese contraseña"
                  onChange={(e) => dispatch(changePassword(e.target.value))}
                  value={password}/>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre"
                  onChange={(e) => dispatch(changeName(e.target.value))}
                  value={name}/>
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Ingresa el apellido"
                  onChange={(e) => dispatch(changeLastName(e.target.value))}
                  value={lastName}/>
                </Form.Group>
                <Form.Group controlId="formBasicRole">
                  <Form.Label>Cargo</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Ingresa el cargo"
                  onChange={(e) => dispatch(changeRole(e.target.value))}
                  value={role}/>
                </Form.Group>
                <Form.Group controlId="formBasicSalary">
                  <Form.Label>Salario</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Ingresa el salario"
                  onChange={(e) => dispatch(changeSalary(e.target.value))}
                  value={salary}/>
                </Form.Group>
                <Form.Group controlId="formBasicDateOfAdmision">
                  <Form.Label>Fecha de ingreso</Form.Label>
                  <Form.Control
                  type="date"
                  placeholder="Ingresa la fecha"
                  onChange={(e) => dispatch(changeDateOfAdmision(e.target.value))}
                  value={dateOfAdmision}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Rol</Form.Label>
                  <Form.Control
                    as="select"
                    name= "userType"
                    onChange={(e) => dispatch(changeIsAdmin(e.target.value))}
                  >
                    {userType === 'admin'? (
                      <>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                      </>
                    ): (
                      <>
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </>
                    ) }
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                  <Form.Label>Estatus</Form.Label>
                  <Form.Control as="select" name= "active"
                    onChange={(e) => dispatch(changeActive(e.target.value))}
                  >
                    {active === 'activo'? (
                      <>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                      </>
                    ): (
                      <>
                        <option value="inactivo">Inactivo</option>
                        <option value="activo">Activo</option>
                      </>
                    ) }
                  </Form.Control>
                </Form.Group>
                <Button className='mt-3' variant="primary" type="submit">
                  Guardar cambios
                </Button>
                <a href='/userlist'>
                  <Button className='mt-3 btn-cancel' variant="primary" type="button">
                    Cancelar
                  </Button>
                </a>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}
