// Hard-coded locations array
var locations = [{
        visible: ko.observable(true),
        position: {
            lat: -33.906764,
            lng: 151.171823
        },
        name: 'Marrickville Metro',
        address: '34 Victoria Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJD9aOSESwEmsRa2mOlvfD5ls',
        type: 'establishment'
    },
    {
        visible: ko.observable(true),
        position: {
            lat: -33.911956,
            lng: 151.160234
        },
        name: 'Pagoto Gelato & Waffle House',
        address: '301 Victoria Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJLRZtzWawEmsRT7Qig49CYGo',
        type: 'food'
    },
    {
        visible: ko.observable(true),
        position: {
            lat: -33.911291,
            lng: 151.158527
        },
        name: 'Nutrition Station Cafe',
        address: '181 Marrickville Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJQ7Qsu2awEmsRPjuMoqq6vno',
        type: 'food'
    },
    {
        visible: ko.observable(true),
        position: {
            lat: -33.911442,
            lng: 151.155324
        },
        name: 'Banana Joe\'s Foodworks',
        address: '258 Illawarra Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJ5ZjmhmOwEmsRbLQh6yyI8P8',
        type: 'supermarket'
    },
    {
        visible: ko.observable(true),
        position: {
            lat: -33.911237,
            lng: 151.155437
        },
        name: 'The Fitness Playground',
        address: '1, 258-272 Illawarra Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJB3qeH2OwEmsRkmqsd7pu0yY',
        type: 'gym'
    },
    {
        visible: ko.observable(true),
        position: {
            lat: -33.9138,
            lng: 151.153245
        },
        name: 'Marrickville Train Station',
        address: 'Marrickville NSW 2204, Austrália',
        placeId: 'ChIJSVJV3GKwEmsRIrYZXmODFpg',
        type: 'establishment'
    },
    {
        visible: ko.observable(true),
        position: {
            lat: -33.904672,
            lng: 151.158162
        },
        name: 'Henson Park',
        address: '22 Centennial St, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJSxdjKGmwEmsRwBby-Wh9AQ8',
        type: 'interest'
    },
    {
        visible: ko.observable(true),
        position: {
            lat: -33.905679,
            lng: 151.165213
        },
        name: 'Factory Theatre',
        address: '105 Victoria Rd, Marrickville NSW 2204, Austrália',
        placeId: 'ChIJGXxx7mewEmsRGZWc2Vov7u0',
        type: 'interest'
    }
];

var map;
var markers = [];
var defaultIcon = 'https://www.google.com/mapfiles/marker.png';
var selectedIcon = 'https://www.google.com/mapfiles/marker_white.png';
// color styles inspired by https://snazzymaps.com/style/93/lost-in-the-desert 
var styles = [{
        elementType: 'labels',
        stylers: [{
                visibility: 'off'
            },
            {
                color: '#f49f53'
            }
        ]
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
                visibility: 'on'
            },
            {
                color: '#d59563'
            }
        ]
    },
    {
        featureType: 'water',
        stylers: [{
            color: '#1994bf'
        }]
    },
    {
        featureType: 'landscape',
        stylers: [{
                color: '#f9ddc5'
            },
            {
                lightness: -7
            }
        ]
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.9051,
            lng: 151.1551
        },
        zoom: 15,
        styles: styles
    });

    // Uses the location array in main.js to create an array of markers
    for (var i = 0; i < locations.length; i++) {
        //Get data from locations array 
        var position = locations[i].position;
        var type = locations[i].type;
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
            visible: true,
            name: name
        });

        var infoWindow = new google.maps.InfoWindow();
        locations[i].infoWindow = infoWindow;
//take this outside the loop
        marker.addListener('click', function() {
            animateMarker(this, marker);
            marker.clicked = true;
            populateInfoWindow(this, infoWindow);
        });
        locations[i].marker = marker;

        //push the marker created above into the markers array
        markers.push(marker);
    }
    // apply bindings
    ko.applyBindings(new ViewModel());
}

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
}

function populateInfoWindow(marker, infowindow) {
    //the if statement checks to see if an info window is already open on the marker
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        var articleUrl;
        var wiki;
        var wikiDescription;
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.name + '&format=json&callback=wikiCallback';

        infowindow.open(map, marker);
        // Wikipedia Error Handling 
        var wikiRequestTimeout = setTimeout(function() {
            alert('Failed to get Wikipedia Resources');
        }, 4000);

        //ajax request
        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            success: function(response) {
                //get data from response through an if statement that checks if there is, indeed, information available about the marker's location in the wikipedia api
                if (response[2].length !== 0) {
                    articleUrl = response[3];
                    wikiDescription = response[2];
                    wiki = '<p>' + wikiDescription + '</p><p><a href="' + articleUrl + '">' + marker.name + '</a></p>';

                } else {
                    wiki = 'Looks like wikipedia doesn\'t know about this yet!';
                }
                //set content based on response obtained from wikipedia api
                generateContent(marker, wiki);

                //clears timeOut request if wikipedia loads successfully
                clearTimeout(wikiRequestTimeout);
            }

        });

        var generateContent = function(marker, wiki) {
            infowindow.setContent('<div>' + marker.name + '</div>' + '<div class="wikipedia-container"><h5 class="wikipedia-header">Relevant Wikipedia Links and Info</h5>' + wiki);
            //infowindow.open(map, marker); 
            // Clear the marker property when the infowindow is closed
            infowindow.addListener('closeclick', function() {
                infowindow.setContent(' ');
                infowindow.marker = null;
            });
        };
    }
}

//Location represents the Model in the MVVM paradigm
var Location = function(data) {
    var self = this;
    self.name = ko.observable(data.name);
    self.type = ko.observable(data.type);
    self.address = ko.observable(data.address);
    self.visible = ko.observable(data.visible);

    self.marker;
};


//View Model 
var ViewModel = function() {
    var self = this;
    self.locationList = ko.observableArray(locations);
    //stores dropdown menu selected value, which starts with 'all'
    self.selectedType = ko.observable('All');
    self.locationTypes = ko.observableArray(['All', 'establishment', 'food', 'interest', 'gym', 'supermarket']);

    //filters list based on type selected from the dropdown menu
    self.filterLocations = ko.computed(function() {
        for (var i = 0; i < self.locationList().length; i++) {

            if (self.selectedType() === "All") {
                self.locationList()[i].visible(true);
                console.log('all');
                self.locationList()[i].marker.setVisible(true);

            } else if (self.selectedType() === self.locationList()[i].type) {
                self.locationList()[i].visible(true);
                console.log(self.locationList()[i].name);
                self.locationList()[i].marker.setVisible(true);

            } else {
                self.locationList()[i].visible(false);
                console.log('no');
                self.locationList()[i].marker.setVisible(false);
            }
        }
    });

    // when a list item is clicked, it's correspondent marker and infowindow open
    self.clickHandler = function(location) {
        google.maps.event.trigger(location.marker, 'click');
    };
};


//Handling Errors
function googleError() {
    alert('Oops! There has been an error and Google Maps is not loading');
    console.log('Error: Google Maps is not loading');
}