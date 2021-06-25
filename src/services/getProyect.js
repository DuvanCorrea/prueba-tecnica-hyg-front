import Axios from "axios"

const GetProyect = async ({ codigo_proyecto }) => {
    const { data } = await Axios.get(`http://localHost:3000/api/proyectos/${codigo_proyecto}`)
    return data
}

export default GetProyect