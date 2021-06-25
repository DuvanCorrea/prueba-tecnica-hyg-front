import { useEffect, useState } from "react"
import Map from "../componenets/Map.jsx"
import getProyect from "../services/getProyect.js"

const Proyect = () => {

    const [cargandoInformacion, setCargandoInformacion] = useState(true)
    const [proyecto, setProyecto] = useState({})

    const params = window.location.search
    const urlParams = new URLSearchParams(params)
    const codigoProyecto = urlParams.get("codigo_proyecto")

    useEffect((e) => {
        async function aux() {
            const data = await getProyect({ codigo_proyecto: codigoProyecto })
            console.log(data)
            setProyecto(data[0])
            setCargandoInformacion(false)
        }
        aux()
    }, [])

    // se pocede a sacar el codigo del proyecto de los parametros de la URL
    // --------------------------------------------------------------------



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
                            <a href="#" className="btn btn-primary">Go somewhere</a>
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

                {/* Seguimiento */}
            </div>
        </>
    )
}

export default Proyect