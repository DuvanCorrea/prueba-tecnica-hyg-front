import Axios from "axios"

const GetSeguimientos = async ({ codigo_proyecto }) => {
    const { data } = await Axios.get(`http://localHost:3000/api/seguimientos/${codigo_proyecto}`)
    return data
}

export default GetSeguimientos