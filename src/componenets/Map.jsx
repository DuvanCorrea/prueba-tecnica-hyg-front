import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"

const Map = (props, { lat, log }) => {
    return (
        <>
            <div className="card">
                <GoogleMap defaultZoom={15}
                    defaultCenter={{ lat: 6.15124, lng: -75.636667 }}>
                    <Marker position={{ lat: 6.15124, lng: -75.636667 }} />
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