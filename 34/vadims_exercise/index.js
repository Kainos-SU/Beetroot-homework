import 'ol/ol.css';
import {Map, View} from 'ol';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import {Tile, Vector} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';


const map = new Map({
  target: 'map',
  layers: [
    new Tile({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 0
  })
});

const positionFeature = new Feature();

positionFeature.setStyle(new Style ({
    image: new Circle({
        radius: 6,
        fill: new Fill({
            color: "#AA0000"
        }),
        stroke: new Stroke({
            color: "#00FF00",
            width: 2
        }),
    })
}));

document.getElementById("geo").addEventListener('click', (e)=>{
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(function (position) {
        const coords = fromLonLat([
            position.coords.longitude,
            position.coords.latitude
        ]);
        const view = map.getView();
        view.animate({center: coords, zoom: 15});
        
        positionFeature.setGeometry(new Point(coords))
        new Vector ({
            map: map,
            source: new VectorSource({
                features: [positionFeature]
            })
        });
        // view.setCenter(coords);
        // view.setZoom(12);
    });
});