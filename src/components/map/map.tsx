import React, { useEffect } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Card, CardHeader, CardBody } from '@patternfly/react-core';
import {  useSelector } from "react-redux";

import mapboxgl from "mapbox-gl";
import marker from "../../icons/marker-red.png";

// import marker from "./icons/marker-red.png";
// import shelter from "./icons/shelter.png";


const Map: React.FC = () => {
    const storedState: any = useSelector((state) => state);
    let props = storedState.SearchReducer.name;
    let longitude = props.lon;
    let latitude = props.lat;
    // const dispatch = useDispatch();
    // dispatch(victimDetail(latitude, longitude));

    const mapPointLayer = (
        name: string,
        lon: string,
        lat: string,
        size: number
    ): any => {
        return {
            id: name,
            type: "symbol",
            source: {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: [lon, lat]
                            }
                        }
                    ]
                }
            },
            layout: {
                "icon-image": name,
                "icon-size": size
            }
        };
    };

    useEffect(() => {
        let token = "pk.eyJ1IjoibWVnaGFuYXNrYW5hZ2FsIiwiYSI6ImNrMXExdmU5ZjEyYWczY3FvZmw2dm9oamwifQ.qDuxo-hNK1XTwOGDRsvSTA";

        mapboxgl.accessToken = token || "";
        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [longitude, latitude],
            zoom: 10
        });

        map.on("load", () => {
            map.loadImage(marker, (err: Error, image: HTMLImageElement) => {
                if (err) throw err;
                map.addImage("marker", image);
                map.addLayer(
                    mapPointLayer("marker", longitude, latitude, 0.15)
                );
            });
        });
    });
    return (
        <Card isHoverable>
            <CardHeader>Victim's Location</CardHeader>
            <CardBody>
                <div id={"map"} style={{ width: "400px", height: "400px" }}></div>
            </CardBody>
        </Card>
    );
}

export default Map;