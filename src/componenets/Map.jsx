import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"

const Map = (props) => {

    return (
        <>
            <div className="card">
                <GoogleMap defaultZoom={15}
                    defaultCenter={{ lat: props.latitud, lng: props.longitud }}>
                    <Marker position={{ lat: props.latitud, lng: props.longitud }} />
                </GoogleMap>
            </div>
        </>
    )
}

export default withScriptjs(
    withGoogleMap(
        Map
    )
)