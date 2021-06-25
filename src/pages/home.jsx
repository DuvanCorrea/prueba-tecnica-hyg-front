import { useState } from "react"
import PostBuscarProyecto from "../services/postBuscarProyecto"

const Home = () => {

    const [proyects, setProyects] = useState([])
    const [metodo, setMetodo] = useState("codigo_proyecto")
    const [data, setData] = useState({
        codigo_proyecto: null,
        codigo_lider: null,
        fecha_inicio: null
    })

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    // Enviar al servidor
    const handleSubmit = () => {
        const aux = async () => {
            const dataNueva = await PostBuscarProyecto({ dataBuscar: data })
            console.log("data nueva", dataNueva)
            setProyects(dataNueva)
        }
        aux()
        setData({
            ...data,
            codigo_proyecto: null,
            codigo_lider: null,
            fecha_inicio: null
        })
    }


    return (
        <>
            <label className="form-label">Método de busqueda</label>

            <div className="input-group mb-3">

                <select onChange={(e) => {
                    setMetodo(e.target.value)
                }} className="form-select" id="estadoProyecto" name="estadoProyecto">
                    <option value={"codigo_proyecto"}>Código proyecto</option>
                    <option value={"codigo_lider"}>Código lider</option>
                    <option value={"fecha_inicio"}>Fecha</option>
                </select>
            </div>

            {/* INPUTS */}
            <div className="mb-3 col-6">
                {metodo == "codigo_proyecto" ? <><label className="form-label">Código del proyecto</label>
                    <input onChange={(e) => {
                        handleChange(e)
                    }} value={null} type="number" className="form-control" id="codigo_proyecto" name="codigo_proyecto" />
                    {/* <div className="form-text">Codigo a buscar</div> */}</> : ""}

                {metodo == "codigo_lider" ? <><label className="form-label">Código del lider</label>
                    <input onChange={(e) => {
                        handleChange(e)
                    }} type="number" className="form-control" id="codigo_lider" name="codigo_lider" />
                    {/* <div className="form-text">Codigo a buscar</div> */}</> : ""}

                {metodo == "fecha_inicio" ? <><label className="form-label">Fecha de inicio</label>
                    <input onChange={(e) => {
                        handleChange(e)
                    }} type="date" className="form-control" id="fecha_inicio" name="fecha_inicio" />
                    {/* <div className="form-text">Codigo a buscar</div> */}</> : ""}

            </div>
            <div className="col-2">
                <button onClick={handleSubmit} type="button" className="btn btn-primary">Buscar</button>

            </div>

            {/* LISTAR PROYECTOS ENCONTRADOS */}

            <div className="row">

                {proyects.map(e => {
                    return (
                        <div className="col-sm-4 mt-3 mb-3" key={e.codigo_proyecto} >
                            <div >
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Código del proyecto: {e.codigo_proyecto}</h5>
                                        <p className="card-text"><strong>Fecha inicio: </strong>{e.fecha_inicio.split("T")[0]}</p>
                                        <p className="card-text"><strong>Entidad: </strong>{e.nombre_entidad}</p>
                                        <p className="card-text"><strong>Dirección: </strong>{e.direccion}</p>
                                        <p className="card-text"><strong>Estado: </strong>{e.nombre_estado}</p>
                                        <p className="card-text"><strong>Cantidad de seguimientos: </strong>{e.count}</p>
                                        <a href={`/proyectos?codigo_proyecto=${e.codigo_proyecto}`} className="btn btn-secondary" target="blank">Ver proyecto</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
        </>
    )
}

export default Home