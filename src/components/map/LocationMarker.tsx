import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import React from "react";
import type { ISight } from "../../pages/sights/SightCard";
import Button from "../Button";

interface ILocationMarker extends ISight {
    onClick: (sight: ISight) => void;
}
const LocationMarker = (props: ILocationMarker) => {
    const [isOpen, setisOpen] = React.useState<boolean>(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const { id, coordinates, onClick } = props;

    return (
        <React.Fragment>
            <AdvancedMarker
                ref={markerRef}
                key={id}
                position={{ lat: coordinates.lat, lng: coordinates.lng }}
                onClick={() => {
                    setisOpen((prev) => !prev);
                    onClick(props);
                }}
            />
            {isOpen ? (
                <InfoWindow
                    anchor={marker}
                    onCloseClick={() => {
                        setisOpen(false);
                    }}
                >
                    <div className="flex flex-col gap-2 p-2 max-w-[400px]">
                        <img
                            className="rounded-lg h-[130px] w-full object-cover"
                            src={props.photoUrl}
                            alt={props.name}
                        />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-primary">
                                <h1 className="text-2xl font-semibold">{props.name}</h1>
                                <span>-</span>
                                <p className="text-xl">{props.location}</p>
                            </div>
                            <hr />
                        </div>
                        <p>{props.description}</p>
                        <Button className="bg-green-primary text-white rounded-lg self-start py-1 px-4">
                            Megtekintés
                        </Button>
                    </div>
                </InfoWindow>
            ) : null}
        </React.Fragment>
    );
};

export default LocationMarker;
