/* var map; 
var markers = [];
// color styles inspired by https://snazzymaps.com/style/93/lost-in-the-desert 
var styles = [
             {
               featureType: 'water',
                 stylers: [{color: '#1994bf'}]
             },
             {
                featureType: 'landscape',
                 stylers: [{color: '#f9ddc5'},
                           {lightness: -7}
                          ]
             }
         ];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.9051, lng: 151.1551},
        zoom: 15, 
        styles: styles
    }); 
    
// Uses the location array in main.js to create an array of markers
    for(var i = 0; i < locations.length; i++) {
        //Get data from locations array 
        var position = locations[i].position; 
        var name = locations[i].name; 
        //create the marker itself
        var marker = new google.maps.Marker({
            id: i,
            position: position,
            name: name
            // animation: google.maps.Animation.DROP, -- see documentation before doing animation
        }); 
        //push the marker created above into the markers array
        markers.push(marker);
    }
    
} */