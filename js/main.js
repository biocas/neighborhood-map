var locations = [ //ko.observableArray ??????
    {
       position: {lat: -33.906764,lng: 151.171823}, 
        name: 'Marrickville Metro Shopping Centre',
        placeId: 'ChIJD9aOSESwEmsRa2mOlvfD5ls', 
        type: ['establishment', 'shopping_mall']
    },
    {
        position: {lat: -33.911956,lng: 151.160234}, 
        name: 'Pagoto Gelato & Waffle House',
        placeId: 'ChIJLRZtzWawEmsRT7Qig49CYGo',
        type: ['establishment', 'food']
    },
    {
        position: {lat: -33.911291,lng: 151.158527}, 
        name: 'Nutrition Station Cafe Marrickville',
        placeId: 'ChIJQ7Qsu2awEmsRPjuMoqq6vno',
        type: ['establishment', 'food']
    },
    {
        position: {lat:  -33.911442,lng: 151.155324}, 
        name: 'Banana Joe\'s Foodworks',
        placeId: 'ChIJ5ZjmhmOwEmsRbLQh6yyI8P8',
        type: ['establishment', 'food', 'grocery_or_supermarket']
    },
    {
        position: {lat: -33.911237,lng: 151.155437}, 
        name: 'The Fitness Playground',
        placeId: 'ChIJB3qeH2OwEmsRkmqsd7pu0yY',
        type: ['establishment', 'gym']
    },
    {
        position: {lat: -33.9138,lng: 151.153245}, 
        name: 'Marrickville Train Station',
        placeId: 'ChIJSVJV3GKwEmsRIrYZXmODFpg',
        type: ['train_station', 'transit_station']
    },
    {
        position: {lat: -33.904672,lng: 151.158162}, 
        name: 'Henson Park',
        placeId: 'ChIJSxdjKGmwEmsRwBby-Wh9AQ8',
        type: ['point_of_interest', 'stadium']
    },
    {
        position: {lat: -33.905679,lng: 151.165213}, 
        name: 'Factory Theatre',
        placeId: 'ChIJGXxx7mewEmsRGZWc2Vov7u0',
        type: ['establishment', 'point_of_interest']
    }
]; 

var map; 
var markers = [];
var selectedMarker; 
var defaultIcon = 'https://www.google.com/mapfiles/marker.png'; 
var selectedIcon = 'https://www.google.com/mapfiles/marker_white.png';
// color styles inspired by https://snazzymaps.com/style/93/lost-in-the-desert 
var styles = [ {
        elementType: 'labels',
        stylers: [{visibility: 'off'},
            {color: '#f49f53'}
            ]
        },
              {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{visibility: 'on'},
                  {color: '#d59563'}]
            },
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
            map: map,
            id: i,
            icon: defaultIcon,
            defaultIcon: defaultIcon,
            selectedIcon: selectedIcon,
            position: position,
            clicked: false, 
            name: name
        }); 
        
        
        marker.addListener('click', function() {
            animateMarker(this, marker);
            marker.clicked = true; 
            populateInfoWindow(this, infoWindow);
        });
        marker.addListener('mouseout', function() {
          if (!marker.clicked) {
            marker.setIcon(defaultIcon);
          }
        });
        
        locations[i].marker = marker; 
         
    //push the marker created above into the markers array
    markers.push(marker);
    
    }
var infoWindow = new google.maps.InfoWindow();
};
 
function animateMarker(marker) {
    for (var i = 0; i < locations.length; i++) { 
        marker.clicked = false; 
         marker.setIcon(defaultIcon);
        marker.setAnimation(google.maps.Animation.NULL);
        }
    marker.clicked = true; 
    marker.setIcon(selectedIcon);
    marker.setAnimation(google.maps.Animation.BOUNCE);
};

function populateInfoWindow(marker, infowindow) {
    //check to see if an info window is already open on the marker
    if (infowindow.marker != marker) {
        infowindow.setContent(' ');
        infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        
        for (var i = 0; i < locations.length; i++) {
            var name = locations[i].name; 
            console.log(name);
            for (var j = 0; j < locations[i].type.length; j++) {
            var type = locations[i].type[j];
                console.log(type);
                infowindow.setContent('<div>' + name + '</div>' +
                '<div>' + type + '</div>');
          }
        }
        infowindow.setContent('<div>' + name + '</div>' +
                '<div>' + type + '</div>');
       infowindow.open(map, marker); 
    } 
};

var ViewModel = function() {
    var self = this; 
    //ko.applyBindings(myViewModel); --- AT THE END
    /* this.currentMarker = function() {

      // loop through locations and reset marker icon
      self.locations().forEach(function(location) {
        location.marker.setIcon(defaultIcon);
      });

      this.marker.setIcon(highlightedIcon);
      this.marker.clicked = true;
        
      self.populateInfoWindow(this.marker, largeInfowindow);
    } */
    //markers are to go here but don't use observables
    // list - maybe use ko.utils.arrayFilter 
    //filter the list items - you want to use a query observable instead of a ko.observableArray as a filter
    
    
   
    /* Then, we add the following filter function to the viewModel and pass the myNumbers observableArray as the first argument to the ko.utils.arrayFilter method:

        viewModel.primeNumberList = ko.computed(function() {
            return ko.utils.arrayFilter(this.myNumbers(), function(number) {
                return test_prime(number); // Returns 'true' or 'false'
            });
        }, viewModel);
        
        
        If you want to use a dropdown select menu to filter the list view items and map markers, consider using the ko options binding1. If you want to use a text box to filter the locations, take a look at the ko textInput binding. 
        */
    
    
} 

//Handling Errors
function googleError() {

    alert('Oops! There has been an error and Google Maps is not loading');
    console.log('Oops! There has been an error and Google Maps is not loading');
}


$('.menu-btn').click(function() {
 $('.container').toggleClass('open');
 
});
/*
Display a simple list with location names using Knockoutjs:
Define a hard-coded locations Array of location objects. => todo

Define a ViewModel constructor. => todo

Instantiate the ViewModel and activate Knockout (aka apply the bindings). => todo

Define an observableArray in the ViewModel. => todo

Initialize the observableArray with the locations Array. => todo

Apply the ko foreach binding to an element in the view and iterate over the observableArray. => todo

*/
