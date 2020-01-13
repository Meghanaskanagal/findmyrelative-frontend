import mapboxgl from "mapbox-gl";
import marker from "../../icons/marker-red.png";

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

export function mapAction(latitude: any, longitude: any) {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
    const map = new mapboxgl.Map({
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
}