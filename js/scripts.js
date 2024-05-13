mapboxgl.accessToken = 'pk.eyJ1IjoibW9uaWNhLW1pbGxheSIsImEiOiJjbHV1ZWszeWEwOHlhMnBtcjYyZjd6dmZwIn0.RYKZY8Ym236tnkj4hxTbpg';

// add bounding box, so user cannot leave Bushwick
//Per Prof's feedback, made this a little bigger
const bounds = [
    [-74.00358, 40.66094], // Southwest coordinates
    [-73.83485, 40.72553] // Northeast coordinates
];

// add in options for map (style, center point, zoom level, bounds, etc.)
var mapOptions = {
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // plain/light basemap
    center: [-73.92579, 40.69803], // starting position [lng, lat]
    zoom: 13.5, // starting zoom
    maxBounds: bounds, // set the map's geographical boundaries to just Bushwick
    minZoom: 12 //set min Zoom level, so user cannot Zoom out/leave Bushwick
}

// instantiate the map
const map = new mapboxgl.Map(mapOptions);

// add a navitation control
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
    closeButton: false
});

map.on('load', () => {
    // set default year to 2017
    let filterYear = ['==', ['number', ['get', 'Year']], 2017];

    // add in evictions data as circles
    map.addLayer({
        id: 'evictions',
        type: 'circle',
        source: {
            type: 'geojson',
            data: './data/evictions.geojson',
            generateId: true // necessary to use featureState for hover
        },
        paint:{
            // make circles smaller as the user zooms from min z13 to z22.
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [13, 3.5],
                    [22, 180]
                ]
            },
            'circle-color':[
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                '#aa5e79',  // circle turns red when user hovers
                '#000000'// default circle color is black
            ]
        },
        // filter by year
        'filter': ['all', filterYear]
    });
    
    // per Prof's feedback, add "mask" to subdue the areas outside Bushwick (using geoJSON with Bushwick filtered out)
    map.addLayer({
        id: 'mask',
        type: 'fill',
        source: {
            type: 'geojson',
            data: './data/mask.geojson'
        },
        layout: {},
        paint:{
            'fill-color': '#f7f7f7', // same gray as basemap
            'fill-opacity': 0.6
            } 
    }, 
    'state-label' //put fill over labels for nearby neighborhoods like Ridgewood
    );
});



// Code to add popup when user hovers over a circle came from mapbox: https://docs.mapbox.com/mapbox-gl-js/example/query-similar-features/

// this is a variable to store the id of the feature that is currently being hovered.
let hoveredCircleId = null

map.on('mousemove', 'evictions', (e) => {

     // don't do anything if there are no features from this layer under the mouse pointer
     if (e.features.length > 0) {
        // if hoveredCircleId already has an id in it, set the featureState for that id to hover: false
        if (hoveredCircleId !== null) {
            map.setFeatureState(
                { source: 'evictions', id: hoveredCircleId },
                { hover: false }
            );
        }

        // set hoveredCircleId to the id of the feature currently being hovered
        hoveredCircleId = e.features[0].id;

        // set the featureState of this feature to hover:true
        map.setFeatureState(
            { source: 'evictions', id: hoveredCircleId },
            { hover: true }
        );
    
    // change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // use the first found feature.
    const feature = e.features[0];

                // display a popup with the street address.
                popup
                .setLngLat(e.lngLat)
                .setText(feature.properties.Address)
                .addTo(map);       
    

    map.on('mouseleave', 'evictions', () => {

        if (hoveredCircleId !== null) {
            map.setFeatureState(
                { source: 'evictions', id: hoveredCircleId },
                { hover: false }
            );
        }

        // clear hoveredCircleId
        hoveredCircleId = null;

            map.getCanvas().style.cursor = '';
            popup.remove();
            
        });   
    }
});

// This sliderbar code came from a mapbox tutorial: https://docs.mapbox.com/help/tutorials/show-changes-over-time/#add-a-time-slider

// update year filter when the slider is dragged
document.getElementById('slider').addEventListener('input', (event) => {
    const year = parseInt(event.target.value);

    // update the map
    // "filter": ['==', ['type',['get', 'key']],'value']
    filterYear = ['==', ['number', ['get', 'Year']], year];
    map.setFilter('evictions', ['all', filterYear]);

    // update text when user moves slider
    document.getElementById('slider-year-label').innerText = year;
});


