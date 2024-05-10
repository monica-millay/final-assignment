mapboxgl.accessToken = 'pk.eyJ1IjoibW9uaWNhLW1pbGxheSIsImEiOiJjbHV1ZWszeWEwOHlhMnBtcjYyZjd6dmZwIn0.RYKZY8Ym236tnkj4hxTbpg';

// add bounding box, so user cannot leave Bushwick
const bounds = [
    [-73.95224, 40.67692], // Southwest coordinates
    [-73.89984, 40.71456] // Northeast coordinates
];

// add in options for map (style, center point, zoom level, bounds, etc.)
var mapOptions = {
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // plain/light basemap
    center: [-73.92579, 40.69803], // starting position [lng, lat]
    zoom: 13.25, // starting zoom
    maxBounds: bounds, // set the map's geographical boundaries to just Bushwick
    minZoom: 13 //set min Zoom level, so user cannot Zoom out/leave Bushwick
}

// instantiate the map
const map = new mapboxgl.Map(mapOptions);

// add a navitation control
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

map.on('load', () => {
    // set default year to 2017
    let filterYear = ['==', ['number', ['get', 'Year']], 2017];

    // add in evictions data as circles
    map.addLayer({
        id: 'evictions',
        type: 'circle',
        source: {
            type: 'geojson',
            data: './evictions.geojson'
        },
        // filter by year
        'filter': ['all', filterYear]
    });
});

// The sliderbar code came from a mapbox tutorial: https://docs.mapbox.com/help/tutorials/show-changes-over-time/#add-a-time-slider
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


