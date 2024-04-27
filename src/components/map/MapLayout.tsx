import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const HUNGARY_BOUNDS = {
    north: 48.62096405029297,
    south: 45.70890426635742,
    west: 16.00965118408203,
    east: 22.97498321533203,
};
const CENTER_OF_HUNGARY = { lat: 47.2669677734375, lng: 19.50330352783203 } as const;

const MapLayout = () => {
    return (
        <section className="h-screen flex justify-center items-center">
            <APIProvider apiKey={import.meta.env.VITE_PUBLIC_MAP_API_KEY}>
                <Map
                    defaultCenter={CENTER_OF_HUNGARY}
                    defaultZoom={7}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    restriction={{
                        strictBounds: true,
                        latLngBounds: HUNGARY_BOUNDS,
                    }}
                    fullscreenControl={false}
                    mapTypeControl={false}
                    streetViewControl={false}
                    keyboardShortcuts={true}
                    rotateControl={true}
                >
                    {/* <Marker position={position} /> */}
                </Map>
            </APIProvider>
        </section>
    );
};

export default MapLayout;
