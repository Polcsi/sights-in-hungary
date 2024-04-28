import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import SelectLocationMarker from "./SelectLocationMarker";
import { twMerge } from "tailwind-merge";
import app from "../../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import type { ISight } from "../../pages/sights/SightCard";
import LocationMarker from "./LocationMarker";

const HUNGARY_BOUNDS = {
    north: 48.62096405029297,
    south: 45.70890426635742,
    west: 16.00965118408203,
    east: 22.97498321533203,
};
const CENTER_OF_HUNGARY = { lat: 47.2669677734375, lng: 19.50330352783203 } as const;

interface IMapLayoutBase {
    className?: string;
}

export interface IMapLayoutSelect extends IMapLayoutBase {
    isSelect: true;
    markerChangedFunc: (lat: number, lng: number) => void;
}

interface IMapLayoutNoSelect extends IMapLayoutBase {
    isSelect?: false;
    markerChangedFunc?: never;
}

type IMapLayoutProps = IMapLayoutNoSelect | IMapLayoutSelect;

const MapLayout = ({ isSelect, className, markerChangedFunc }: IMapLayoutProps) => {
    const db = getDatabase(app);
    const sightsRef = ref(db, "sights");
    const [sightsData, setSightsData] = React.useState<ISight[]>([]);

    React.useEffect(() => {
        onValue(sightsRef, (snapshot) => {
            // ? Convert object to array. Object keys are sight ids.
            const data = snapshot.val();
            const sights = data ? Object?.keys(data)?.map((key) => ({ ...data[key], id: key })) : [];
            setSightsData(sights);
        });
    }, []);

    const [selectLocationMarkerPos, setSelectLocationMarkerPos] = React.useState<{ lat: number; lng: number }>({
        lat: 47.2669677734375,
        lng: 19.50330352783203,
    });

    const renderSelectLocationMarker = (): React.ReactNode => {
        if (isSelect) {
            return <SelectLocationMarker markerChangedFunc={markerChangedFunc} position={selectLocationMarkerPos} />;
        }

        if (sightsData) {
            return sightsData.map((sight) => <LocationMarker key={sight.id} {...sight} />);
        }
    };

    return (
        <section className={twMerge("h-screen flex justify-center items-center", className)}>
            <APIProvider apiKey={import.meta.env.VITE_PUBLIC_MAP_API_KEY}>
                <Map
                    mapId={import.meta.env.VITE_MAP_ID}
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
                    onClick={(e) => {
                        const latLng = e.detail.latLng;

                        if (latLng) {
                            setSelectLocationMarkerPos({
                                lat: latLng.lat,
                                lng: latLng.lng,
                            });
                            markerChangedFunc && markerChangedFunc(latLng.lat, latLng.lng);
                        }
                    }}
                >
                    // TODO: Create a control to hide and close current location window
                    {renderSelectLocationMarker()}
                </Map>
            </APIProvider>
        </section>
    );
};

export default MapLayout;
