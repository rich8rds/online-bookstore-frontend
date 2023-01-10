import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import '../../styles/home.scss'

const Home = () => {
  const { auth } = useAuth()
  let navigate = useNavigate()

   const goBack = () => navigate(-1)

  return (
    <section className="home">
    <div className="container-home">
    <div className="div">
    <h1> Welcome, <b> { auth?.username } </b> to the home page!</h1>
      <hr />
      <button className="btn btn-large" onClick={ goBack }> Go Back </button>
    </div>
    </div>
    </section>
  )
}

export default Home
