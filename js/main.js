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
        position: {lat: ,lng: }, 
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

var Model = function() {
    //locations
}

var ViewModel = function() {
    //markers are to go here but don't use observables
    // list - maybe use ko.utils.arrayFilter 
    //filter the list items - you want to use a query observable instead of a ko.observableArray as a filter
    
    
    /* 
    Then, we add the following filter function to the viewModel and pass the myNumbers observableArray as the first argument to the ko.utils.arrayFilter method:

        viewModel.primeNumberList = ko.computed(function() {
            return ko.utils.arrayFilter(this.myNumbers(), function(number) {
                return test_prime(number); // Returns 'true' or 'false'
            });
        }, viewModel);
        
        
        If you want to use a dropdown select menu to filter the list view items and map markers, consider using the ko options binding1. If you want to use a text box to filter the locations, take a look at the ko textInput binding. 
    
    */ 
} 

var View = function() {
    
}

/*
Display a simple list with location names using Knockoutjs:
Define a hard-coded locations Array of location objects. => todo

Define a ViewModel constructor. => todo

Instantiate the ViewModel and activate Knockout (aka apply the bindings). => todo

Define an observableArray in the ViewModel. => todo

Initialize the observableArray with the locations Array. => todo

Apply the ko foreach binding to an element in the view and iterate over the observableArray. => todo

*/
