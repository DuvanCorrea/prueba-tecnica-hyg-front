import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"

const Map = (props) => {
    return (
        <>
            <div className="card">
                <GoogleMap defaultZoom={15}
                    defaultCenter={{ lat: 6.15124, lng: -75.636667}} />
            </div>
        </>
    )
}

export default withScriptjs(
    withGoogleMap(
        Map
    )
)