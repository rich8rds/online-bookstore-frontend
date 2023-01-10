import axios from "axios"

const UsersPage = () => {

  const booksUrl = ``
  const getBooks = () => {
    axios.get(booksUrl, {

    }).then(res => {

    })
    .catch(err => {

    })
  }
  return (
    <div onClick={getBooks}>UsersPage</div>
  )
}

export default UsersPage