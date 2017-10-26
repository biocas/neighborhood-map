var map; 
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
}