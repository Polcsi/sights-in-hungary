import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { HUNGARY_BOUNDS } from "./MapLayout";

const MapDemo = () => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_PUBLIC_MAP_API_KEY}>
            <Map
                defaultCenter={{ lat: 47.49802780151367, lng: 19.0402774810791 }}
                defaultZoom={18}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                defaultTilt={100}
                restriction={{
                    strictBounds: true,
                    latLngBounds: HUNGARY_BOUNDS,
                }}
                clickableIcons={false}
                streetViewControl={false}
                fullscreenControl={false}
            ></Map>
        </APIProvider>
    );
};

export default MapDemo;
