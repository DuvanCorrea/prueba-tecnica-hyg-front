import { useEffect, useState } from "react"
import Map from "../componenets/Map.jsx"
import getProyect from "../services/getProyect.js"
import GetSeguimientos from "../services/getSeguimientos.js"
import PostSeguimiento from "../services/postSeguimiento.js"

const Proyect = () => {

    const [cargandoInformacion, setCargandoInformacion] = useState(true)
    const [avanceUltimoSEguimiento, setAvanceUltimoSEguimiento] = useState(0)
    const [proyecto, setProyecto] = useState({})
    const [seguimientos, setSeguimientos] = useState([])
    const [seguimiento, setSeguimiento] = useState({
        fecha: new Date().toJSON().split("T")[0],
        descripccion: "",
        avance: 0,
        PROYECTO_codigo_proyecto: null,
        estadoProyecto: null,
    })

    // se pocede a sacar el codigo del proyecto de los parametros de la URL
    // --------------------------------------------------------------------
    const params = window.location.search
    const urlParams = new URLSearchParams(params)
    const codigoProyecto = urlParams.get("codigo_proyecto")

    useEffect((e) => {
        async function aux() {
            const data = await getProyect({ codigo_proyecto: codigoProyecto })
            setProyecto(data[0])
            setCargandoInformacion(false)
        }
        aux()
    }, [])

    useEffect((e) => {

        async function aux() {
            const data = await GetSeguimientos({ codigo_proyecto: codigoProyecto })

            // ultimo seguimiento
            // ------------------

            if (data.length > 0) {
                setAvanceUltimoSEguimiento(data[0].avance)
            }

            setSeguimientos(data)
        }
        aux()

        setSeguimiento({
            ...seguimiento,
            PROYECTO_codigo_proyecto: codigoProyecto,
            estadoProyecto: proyecto.codigo_estado
        })
    }, [])

    //Función que se ejecuta cada que el usuario escribe en un input
    const handleChange = e => {
        setSeguimiento({
            ...seguimiento,
            [e.target.name]: e.target.value
        })

        console.log(seguimiento)
    }

    // Enviar seguimiento nuevo al servidor
    const handleSubmit = () => {
        setAvanceUltimoSEguimiento(seguimiento.avance)
        PostSeguimiento({ seguimiento: seguimiento })
        console.log(seguimiento)
        alert("seguimiento guardado")
        window.location.reload()
    }


    if (cargandoInformacion) {
        return <>cargando...</>
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <img src={"https://www.iebschool.com/blog/wp-content/uploads/2015/07/presentacion-de-tu-proyecto.jpg"} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"><strong>Estado del proyecto: <><p className="badge bg-success">{proyecto.nombre_estado}</p></></strong></h5>
                            <p className="card-text"><strong>Código del proyecto: </strong>{proyecto.codigo_proyecto}</p>
                            <p className="card-text"><strong>Fecha de inicio </strong>{proyecto.fecha_inicio.split("T")[0]}</p>
                            <p className="card-text"><strong>Entidad </strong>{proyecto.nombre_entidad}</p>
                            <p className="card-text"><strong>Dirección: </strong>{proyecto.direccion}</p>
                            <p className="card-text"><strong>Lider </strong>{proyecto.nombre_lider}</p>
                            <p className="card-text"><strong>Objetivo: </strong>{proyecto.objetivo}</p>
                            <p className="card-text"><strong>Descripción: </strong>{proyecto.descripccion}</p>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Agregar seguimiento
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mapa */}
                <div className="col-6">
                    <Map googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDro6JzfZ9jhSz2wQSqB4lLbIzCb6voDP8"}
                        containerElement={<div style={{ height: "600px" }}></div>}
                        mapElement={<div style={{ height: "100%" }}></div>}
                        loadingElement={<p>Cargando</p>}
                        latitud={proyecto.latitud}
                        longitud={proyecto.longitud}
                    />
                </div>
            </div>

            {/* Seguimientos */}
            <div className="row">
                <div className="col-12">
                    {
                        seguimientos.map((e) => {
                            return (
                                <>
                                    <div key={e.codigo_seguimiento} className="card text-center mt-3">
                                        <div className="card-header">Seguimiento número {e.codigo_seguimiento} </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Avance: {e.avance}%</h5>
                                            <p className="card-text">{e.descripccion}</p>
                                            <a href="#" className="btn btn-primary">Mostrar fotos</a>
                                        </div>
                                        <div className="card-footer text-muted">{e.fecha.split("T")[0]}</div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>

            {/* Modal agregar seguimiento */}

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Nuevo seguimiento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario para agregar seguimiento */}

                            <form onSubmit={(e) => {
                                e.preventDefault()
                            }}>
                                <div className="mb-3">
                                    <label className="form-label">Descipcción</label>
                                    <input onChange={(e) => {
                                        handleChange(e)
                                    }} type="text" className="form-control" id="descripccion" name="descripccion" />
                                    <div className="form-text">El porque sel seguimiento</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Avance</label>
                                    <input onChange={(e) => {
                                        handleChange(e)
                                    }} type="number" className="form-control" id="avance" name="avance" min={avanceUltimoSEguimiento} max={100} />
                                    <div className="form-text">Actualmente en {avanceUltimoSEguimiento}%, ingresar valor de {avanceUltimoSEguimiento} a 100</div>
                                </div>
                                <div className="input-group mb-3">
                                    <select onChange={(e) => {
                                        handleChange(e)
                                    }} className="form-select" id="estadoProyecto" name="estadoProyecto">
                                        <option value={1}>inicial</option>
                                        <option value={2}>ejecución</option>
                                        <option value={3}>entrega</option>
                                        <option value={4}>estabilizacion</option>
                                    </select>
                                    <label className="input-group-text">Nuevo estado</label>
                                </div>
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button onClick={handleSubmit} type="button" className="btn btn-primary">Guardar seguimiento</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Proyect