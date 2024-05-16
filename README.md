<h1>Final Assignment for Interactive Web Mapping and Spatial Data Visualization</h1>

This is the repo for <a href="https://monica-millay.github.io/final-assignment/" target="_blank">Evictions in Bushwick (2017-2023)</a> <br>
URL: https://monica-millay.github.io/final-assignment/

This map shows the effect of the COVID-19 pandemic and New York's consequent eviction moratorium on the Brooklyn neighborhood of Bushwick. (Tenants who experienced financial hardship due to COVID-19 were protected from eviction from March 7, 2020 through January 15, 2022.) <strong>The map reveals that the pandemic and moratorium caused a dramatic, but temporary, decrease in legal evictions in the neighborhood.</strong> Each residential eviction carried out by a City Marshal is represented by a dot. 

Interact with the map by:<br>
-hovering over the dots to see the street addresses.<br>
-moving the slider bar to see year-to-year trends.<br>

<img width="2233" alt="Screenshot 2024-05-15 at 11 17 39 PM" src="https://github.com/monica-millay/final-assignment/assets/165329154/3b6c87b5-d9f8-4adb-955a-1b5048cbc3c3"><br>

<strong>Sources:</strong><br>
I obtained the eviction data from <a href="https://data.cityofnewyork.us/City-Government/Evictions/6z8x-wfk4/about_data" target="_blank">NYC Open Data</a> and cleaned it using Python in <a href="https://colab.research.google.com/drive/1mQNZ1t923709twkvkEiIIiKUiPnMfhHh?usp=sharing" target="_blank">Google colabs</a>. The data comes from the Department of Investigation (DOI).

I created the outline for Bushwick and the mask for the areas outside Bushwick using <a href="https://data.cityofnewyork.us/City-Government/NTA-map/d3qk-pfyz" target="_blank">NTA Map</a> from NYC Open Data.

I was inspired by <a href="https://docs.mapbox.com/help/tutorials/show-changes-over-time/" target="_blank">this Mapbox tutorial</a> to create a time series data visualization with a slider bar. 



