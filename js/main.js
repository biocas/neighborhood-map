// Hard-coded locations array
var locations = [ //ko.observableArray ??????
    {
        visible: ko.observable(true),
        position: {lat: -33.906764,lng: 151.171823}, 
        name: 'Marrickville Metro',
        address: '34 Victoria Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJD9aOSESwEmsRa2mOlvfD5ls', 
        type: ['establishment', 'shopping_mall']
    },
    {   
        visible: ko.observable(true),
        position: {lat: -33.911956,lng: 151.160234}, 
        name: 'Pagoto Gelato & Waffle House',
        address: '301 Victoria Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJLRZtzWawEmsRT7Qig49CYGo',
        type: ['establishment', 'food']
    },
    {   
        visible: ko.observable(true),
        position: {lat: -33.911291,lng: 151.158527}, 
        name: 'Nutrition Station Cafe',
        address: '181 Marrickville Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJQ7Qsu2awEmsRPjuMoqq6vno',
        type: ['establishment', 'food']
    },
    {
        visible: ko.observable(true),
        position: {lat:  -33.911442,lng: 151.155324}, 
        name: 'Banana Joe\'s Foodworks',
        address: '258 Illawarra Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJ5ZjmhmOwEmsRbLQh6yyI8P8',
        type: ['establishment', 'food', 'grocery_or_supermarket']
    },
    {
        visible: ko.observable(true),
        position: {lat: -33.911237,lng: 151.155437}, 
        name: 'The Fitness Playground',
        address: '1, 258-272 Illawarra Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJB3qeH2OwEmsRkmqsd7pu0yY',
        type: ['establishment', 'gym']
    },
    {
        visible: ko.observable(true),
        position: {lat: -33.9138,lng: 151.153245}, 
        name: 'Marrickville Train Station',
        address: 'Marrickville NSW 2204, Austrália',
        placeId: 'ChIJSVJV3GKwEmsRIrYZXmODFpg',
        type: ['train_station', 'transit_station']
    },
    {
        visible: ko.observable(true),
        position: {lat: -33.904672,lng: 151.158162}, 
        name: 'Henson Park',
        address: '22 Centennial St, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJSxdjKGmwEmsRwBby-Wh9AQ8',
        type: ['point_of_interest', 'stadium']
    },
    {
        visible: ko.observable(true),
        position: {lat: -33.905679,lng: 151.165213}, 
        name: 'Factory Theatre',
        address: '105 Victoria Rd, Marrickville NSW 2204, Austrália',
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
        locations[i].marker = marker; 
         
    //push the marker created above into the markers array
    markers.push(marker);
    
    }
var infoWindow = new google.maps.InfoWindow();
};
 
//animates markers by bouncing and changing its color when clicked. The animation stops by using setTimeOut
function animateMarker(marker) {
    for (var i = 0; i < locations.length; i++) { 
        marker.clicked = false; 
         marker.setIcon(defaultIcon);
        marker.setAnimation(google.maps.Animation.NULL);
        }
    marker.clicked = true; 
    marker.setIcon(selectedIcon);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
             marker.setAnimation(google.maps.Animation.NULL);
         }, 1250);
    setTimeout(function() {
             marker.setIcon(defaultIcon);
         }, 1250);
};

function populateInfoWindow(marker, infowindow) {
    //check to see if an info window is already open on the marker
    //console.log(marker);
    if (infowindow.marker != marker) {
        //infowindow.setContent(' ');
        infowindow.marker = marker;
        infowindow.open(map, marker); 
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
                
          }
        }
        infowindow.setContent('<div>' + name + '</div>' +
                '<div>' + type + '</div>');
        
       
    } 
};

//Location represents the Model in the MVVM paradigm
var Location = function(data) {
    var self = this;
    self.name = data.name;
    self.type= data.type; 
    self.address = data.address;
    self.showMe = ko.observable(true);
};


//View Model 
var ViewModel = function() {
    var self = this;
    self.locationList = ko.observableArray(locations); 
    self.query = ko.observable('');
    self.filterLocations = ko.observableArray();
    
    //pushes data into filterLocations array
    for (var i = 0; i < locations.length; i++) {
        var place = new Location(locations[i]);
        self.filterLocations.push(place);
       // console.log(place);
    };
    
    //show markers when list items are clicked
    self.showMarker = function() {
        google.maps.event.trigger(markers[i], 'click');
    }
    
    self.locationTypes = ko.observableArray(['establishment', 'food', 'interest', 'gym', 'supermarket']);
    
    self.filterTypes = ko.observableArray([]);

    
    self.filterPlaces = ko.computed ( function() {
       var filter = self.filterTypes();
       if ( self.filterTypes().length === 0 ) {
           return self.locationTypes();
       } else {

           return ko.utils.arrayFilter(self.places(), function(place) {
               var type = place.type.toLowerCase();
               var match = self.filterTypes().includes(type);
               return match;
           });
       }
    });

    
    
    /* 
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
        
        
        $('.menu-btn').click(function() {
    $('.container').toggleClass('open');
 
        });
        */
    
    
} 

//appyind bindings through the View Model
var vm = new ViewModel();
ko.applyBindings(vm);


//Handling Errors
function googleError() {
    alert('Oops! There has been an error and Google Maps is not loading');
    console.log('Error: Google Maps is not loading');
}


