import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef, useMap } from "@vis.gl/react-google-maps";
import React from "react";
import { IMapLayoutSelect } from "./MapLayout";

interface ISelectLocationMarkerProps {
    position: { lat: number; lng: number };
    markerChangedFunc: IMapLayoutSelect["markerChangedFunc"];
}

const SelectLocationMarker = ({ position, markerChangedFunc }: ISelectLocationMarkerProps) => {
    const map = useMap();
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infowindowShown, setInfowindowShown] = React.useState<boolean>(false);
    const [newPosition, setNewPosition] = React.useState<{ lat: number; lng: number }>(position);

    const toggleInfoWindow = () => setInfowindowShown((previousState) => !previousState);

    const closeInfoWindow = () => setInfowindowShown(false);

    return (
        <React.Fragment>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                draggable
                title={"Válasz helyszínt"}
                onClick={() => {
                    toggleInfoWindow();
                    // ? Zoom in to the marker
                    map?.panTo(newPosition);
                    map?.setZoom(13);
                }}
                onDrag={() => {
                    closeInfoWindow();
                }}
                onDragEnd={(e) => {
                    const latLng = e.latLng;

                    if (latLng) {
                        setNewPosition({
                            lat: latLng.lat(),
                            lng: latLng.lng(),
                        });
                        markerChangedFunc(latLng.lat(), latLng.lng());
                    }
                    setInfowindowShown(true);
                }}
            >
                <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"}></Pin>
            </AdvancedMarker>
            {infowindowShown ? (
                <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
                    Pin helye: {newPosition.lat}, {newPosition.lng}
                </InfoWindow>
            ) : null}
        </React.Fragment>
    );
};

export default SelectLocationMarker;
