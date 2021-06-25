import Axios from "axios"

const PostBuscarProyecto = async ({ dataBuscar }) => {
    try {
        const { data } = await Axios.post(`http://localHost:3000/api/proyectos`, dataBuscar)
        return data
    } catch (error) {

    }

}

export default PostBuscarProyecto