import Map from "../componenets/Map.jsx"

const Proyect = () => {
    return (
        <>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <img src={"https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg"} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"><strong>Estado del proyecto <>Pendiente</></strong></h5>
                            <p className="card-text"><strong>Código del proyecto: </strong>123456789</p>
                            <p className="card-text"><strong>Fecha de inicio </strong>123456789</p>
                            <p className="card-text"><strong>Entidad </strong>123456789</p>
                            <p className="card-text"><strong>Dirección: </strong>123456789</p>
                            <p className="card-text"><strong>Lider </strong>123456789</p>
                            <p className="card-text"><strong>Objetivo: </strong>123456789</p>
                            <p className="card-text"><strong>Descripción: </strong>123456789</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <Map googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAPjVCfnHLq4dxbBH_u8jOjgoJsAdKfxLM"}
                        containerElement={<div style={{ height: "400px" }}></div>}
                        mapElement={<div style={{ height: "100%" }}></div>}
                        loadingElement={<p>Cargando</p>}
                    />
                </div>
            </div>
        </>
    )
}

export default Proyect