import { useEffect, useState } from "react"
import Map from "../componenets/Map.jsx"
import getProyect from "../services/getProyect.js"
import GetSeguimientos from "../services/getSeguimientos.js"

const Proyect = () => {

    const [cargandoInformacion, setCargandoInformacion] = useState(true)
    const [proyecto, setProyecto] = useState({})
    const [seguimientos, setSeguimientos] = useState([])
    const [seguimiento, setSeguimiento] = useState({
        fecha: new Date().getFullYear(),
        descripccion: "",
        avance: "",
        PROYECTO_codigo_proyecto: null,
        estadoProyecto: null,
    })

    // se pocede a sacar el codigo del proyecto de los parametros de la URL
    // --------------------------------------------------------------------
    const params = window.location.search
    const urlParams = new URLSearchParams(params)
    const codigoProyecto = urlParams.get("codigo_proyecto")
    setSeguimiento({
        ...seguimiento,
        PROYECTO_codigo_proyecto: codigoProyecto
    })

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
            setSeguimientos(data)
        }
        aux()
    }, [])

    //Función que se ejecuta cada que el usuario escribe en un input
    const handleChange = e => {
        setSeguimiento({
            ...seguimiento,
            [e.target.name]: e.target.value
        })
    }


    if (cargandoInformacion) {
        return <>cargando...</>
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <img src={"https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg"} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"><strong>Estado del proyecto: <>{proyecto.nombre_estado}</></strong></h5>
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
                        containerElement={<div style={{ height: "400px" }}></div>}
                        mapElement={<div style={{ height: "100%" }}></div>}
                        loadingElement={<p>Cargando</p>}
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
                                        <div className="card-header">Avance: {e.avance}%</div>
                                        <div className="card-body">
                                            <h5 className="card-title">Seguimiento número {e.codigo_seguimiento}</h5>
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
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <input type="text" className="form-control" id="descripccion" name="descripccion" />
                                    <div className="form-text">El porque sel seguimiento</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Avance</label>
                                    <input type="number" className="form-control" id="avance" name="avance" min={1} max={100} />
                                    <div className="form-text">Actualmente en 10%, ingresar valor de 10 a 100</div>
                                </div>
                                <div className="input-group mb-3">
                                    <select className="form-select" id="estadoProyecto" name="estadoProyecto">
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <label className="input-group-text" for="inputGroupSelect02">Nuevo estado</label>
                                </div>
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">Guardar seguimiento</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Proyect