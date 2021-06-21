import { useEffect } from "react"
import { getContent } from '../../store/contentReducer'
import { useDispatch, useSelector } from "react-redux"
import Header from '../header'
import { CONTENT_SUCCESS } from '../../store/contentReducer'
import './styles.css'


export default function Contents(){

  const { content } = useSelector(({contentReducer}) => ({
    content: contentReducer.content,
  }))

  const token = localStorage.getItem("token")

  const dispatch = useDispatch()
  useEffect(() => {
    getContent(token).then(data => dispatch({ type: CONTENT_SUCCESS, payload: data }))

  }, [dispatch, token])



  return(
    <div>
      <Header/>
      <h1 className='tittle'>Visualización de contenido api externa</h1>
      <div className='listApi'>
        {content && content.length > 0 &&
          content.map(({userId, id, title, body }) => {
            return (
              <div key={id} className="card">
                <span>
                    <strong>UserId:</strong> {userId}
                  </span>
                  <br />
                  <span>
                    <strong>Id:</strong> {id}
                  </span>
                  <br />
                  <span>
                    <strong>Title:</strong> {title}
                  </span>
                  <span>
                    <strong>Body:</strong> {body}
                  </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
