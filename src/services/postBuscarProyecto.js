import Axios from "axios"

const PostBuscarProyecto = async ({ dataBuscar }) => {
    try {
        const { data } = await Axios.post(`http://localHost:3000/api/proyectos`, dataBuscar)
        console.log("data", data)
        return data
    } catch (error) {
        console.log(error)
        const data = []
        return data;
    }

}

export default PostBuscarProyecto