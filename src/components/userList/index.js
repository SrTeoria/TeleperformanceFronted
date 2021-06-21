import { Table, Row, Col, Button } from 'react-bootstrap'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import { getUsers } from '../../store/createUserReducer'
import Header from '../header'
import './styles.css'
import axios from 'axios'

export default function UserList(){

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const { users } = useSelector(({createUserReducer}) => ({
    users: createUserReducer.users,
  }))

  async function handleDelete(_id){
    let option = window.confirm('Desea eliminar este usuario?')
    const token = localStorage.getItem("token")
    if(option){
      try{
        await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/users/delete',
          data: {
            _id
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch(getUsers())
      } catch(error){
        console.log(error)
      }
    }
  }

  return(
    <div>
      <Header/>
      <h2 className='tittle'>Listado de Usuarios</h2>
      <Row className='userList'>
        <Col md={4} sm={6}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Cargo</th>
                <th>Salario</th>
                <th>Fecha de ingreso</th>
                <th>Tipo de usuario</th>
                <th>Estado</th>
                <th>Edicion</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            { users && users.length > 0 && users.map(({ _id, name, lastName, role, salary, dateOfAdmision, userType, active}, index)=>{
              return(
                <tbody key={_id}>
                    <tr>
                      <td>{index+1}</td>
                      <td>{name}</td>
                      <td>{lastName}</td>
                      <td>{role}</td>
                      <td>{salary}</td>
                      <td>{dateOfAdmision}</td>
                      <td>{userType}</td>
                      <td>{active}</td>
                      <td>
                        <a href={`/edituser/${_id}`}>
                          <Button className='mt-3' variant="primary" type="button">
                            Editar
                          </Button>
                        </a>
                      </td>
                      <td>
                        <Button className='mt-3' variant="primary" type="button" onClick={(e) => handleDelete(_id)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                </tbody>
              )
            })}
          </Table>
        </Col>
      </Row>
    </div>
  )
}