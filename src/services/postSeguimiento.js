import Axios from "axios"

const PostSeguimiento = async ({ seguimiento }) => {
    try {
        Axios.post(`http://localHost:3000/api/seguimiento`, seguimiento)
    } catch (error) {

    }
}

export default PostSeguimiento