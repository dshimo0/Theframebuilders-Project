
/* Create global var for geolocation */
var currentLocation;

/* Custom Markers */
var customIcon = {
    Framebuilder: {
      customI: 'images/shopMarker.png'
    },
    School: {
      customI: 'images/schoolMarker.png'
    }
};

//styles to make the custom map
function initMap() {
  var styles = [
    {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]},
    {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]},
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]},
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.government",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.medical",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "poi.place_of_worship",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ];

  //cluster markers create var
  var cluster = [];
  //Styles for map
  var map = new google.maps.Map(document.getElementById('map'), {
      gestureHandling: 'cooperative',
      center: new google.maps.LatLng(37.089, -96.253),
      mapTypeControl: false,
      zoom: 6,
      styles: styles
  });

  //Create infowindow and select size
  var infoWindow = new google.maps.InfoWindow({
    maxWidth: 350
  });

  // check if geolocation is enabled if not map is set to go to US center.
  if (navigator.geolocation)
  {
    // Add handler to listen when user's position changes
    navigator.geolocation.watchPosition(function(position) {
      // If this is the first time, set the map's center to the user's location
      if (currentLocation === undefined)
      {
        map.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});            
      }  
      currentLocation = position;
      geozoom = 3;
    });
  }

  // Conect to the database trought php file and assign columns to different vars
  downloadUrl('data/data.xml', function(data) {
    //saving xml file in array xml?
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');

    //loop trought all the markers saving each attribute in vars name,address,etc..
    for (var i = 0; i < markers.length; i++) {
      var name = markers[i].getAttribute('name');
      var address = markers[i].getAttribute('address');
      var type = markers[i].getAttribute('type');
      var point = new google.maps.LatLng(
        parseFloat(markers[i].getAttribute('lat')),
        parseFloat(markers[i].getAttribute('lng')));
      var url =  markers[i].getAttribute('url');
      //Maybe delete this var.. since I dont need to show emails
      var email = markers[i].getAttribute('email'); 
      var html = '<div id="iw-container">' +
        '<div class="iw-title">' + name +'</div>' +
        '<div class="iw-content">' +
        '<div class="iw-subTitle  urlink">' + '<a href=http://'+url+ ' ' +'target="_blank">' + url + '</a>' +'</div>' + 
        //I could insert a image here too.
        '<div class="iw-subTitle type"><b>Type: </b> '+ type + '</div>' +
        '<div class="iw-subTitle address"><b>Address: </b>' + address + '</div>' +
        //I added a inline block to fit the infowindow correctly
        '<span style="display:inline-block; width: 350px;"></span>'
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
        '</div>';
      var icon = customIcon[type] || {};
      //Add current marker[i] to the map
      var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon: icon.customI,
      });

      bindInfoWindow(marker, map, infoWindow, html);

      //code for markers clusterer CHECK ERROR: INITMAP: Cannot read property 'apply' of undefined
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //return function() {
            //infowindow.setContent("Info on member here");
            //infowindow.open(map, marker);
        //}
      })(marker, i));

      cluster.push(marker);       
    //end of loop
    }

    //marker clusterer
    var mc = new MarkerClusterer(map,cluster);

  });
}

function bindInfoWindow(marker, map, infoWindow, html) {
  
  //when we click the marker the html for the infowindows is created and the the infow opens
  google.maps.event.addListener(marker, 'click', function() {
    //open info windows
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  // Event that closes the Info Window with a click on the map
  google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
  });

  /*
  * The google.maps.event.addListener() event waits for
  * the creation of the infowindow HTML structure 'domready'
  * and before the opening of the infowindow defined styles
  * are applied.
  */
  google.maps.event.addListener(infoWindow, 'domready', function() {
      
    // Reference to the DIV which receives the contents of the infowindow using jQuery
    var iwOuter = $('.gm-style-iw');
    
    /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
    var iwBackground = iwOuter.prev();
      
    // Remove the background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
      
    // Remove the white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(0, 0, 0) 0px 1px 6px', 'z-index' : '1'});
      
  });
}

/* we’re taking a supplied URL and creating a request object. 
* The object type differs depending on what kind of browser the user is in, 
* but the end result is the same. Once that request object is ready, 
* i.e. its been loaded, then we call the callback function and pass through the data. 
* This is then picked up back within our downloadUrl function.
*/
function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
  new ActiveXObject('Microsoft.XMLHTTP') :
  new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {}