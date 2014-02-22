var Data = Backbone.Model.extend({
    defaults: {
        image: '',
        title: '',
        desc: '',
        link: '',
        type: '',
        hex: ''
    }
});

//Source spreadsheet
var DataList = Backbone.Collection.extend({
    model: Data,
    url: 'https://spreadsheets.google.com/feeds/list/0ApDOZ6miZX5idGVGaU54bU9NX0YxWVZQUnlYNXJ0aGc/od6/public/values?alt=json'
});

//JSON reader thingy
var AppView = Backbone.View.extend({
    //set templates
    //sample: _.template($('#sample').html()),
    color: _.template($('#color').html()),
    initialize: function () {
        this.collection.on('reset', this.render, this);
        c = this.collection;
        this.collection.fetch({
            success: function (model, response) {
                var feed = response['feed'];
                var entry = feed['entry'];
                var arr = [];
                for (var i=0; i<entry.length; i++) {
                    obj = {
                        "title": entry[i].gsx$title.$t,
                        "link": entry[i].gsx$link.$t,
                        "image": entry[i].gsx$image.$t,
                        "type": entry[i].gsx$type.$t,
                        "desc": entry[i].gsx$description.$t,
                        "hex": entry[i].gsx$hex.$t
                    };
                    arr.push(obj);
                }
                c.reset(arr);
            },
            error: function () {
            }
        });
    },

    render: function () {
        this.collection.each(this.list, this);
    },

    list: function (model) {
        
            $('#color-thumbs').append(this.color({model: model}));
        
    }
});

var app = Backbone.Router.extend({
    routes: {
        '': 'start',
    },
    start: function () {
        new AppView({collection: new DataList()});
    }
});

$(document).ready(function(){
    new app();
    Backbone.history.start();

    contact = {
        "name": "Theodore Kluge",
        };
    console.warn(contact);
});

//-----------------------
//Other stuff
var r, g, b;
var computedH, computedS, computedV = 0;
    
function hexToRgb(hex) {
    // var bigint = parseInt(hex, 16);
    // var r = (bigint >> 16) & 255;
    // var g = (bigint >> 8) & 255;
    // var b = bigint & 255;
 
    if ( hex.charAt(0) === '#' ) {
        hex = hex.substr(1);
    }
    if ( hex.length == 3 ) {
        hex = hex.substr(0,1) + hex.substr(0,1) + hex.substr(1,2) + hex.substr(1,2) + hex.substr(2,3) + hex.substr(2,3);
    }
    r = hex.charAt(0) + '' + hex.charAt(1);
    g = hex.charAt(2) + '' + hex.charAt(3);
    b = hex.charAt(4) + '' + hex.charAt(5);
    r = parseInt( r,16 );
    g = parseInt( g,16 );
    b = parseInt( b,16);
    return r, g, b;
}

calculateHSV = function(r, g, b) {


    //remove spaces from input RGB values, convert to int
    var r = parseInt(r, 10 ); 
    var g = parseInt(g, 10 ); 
    var b = parseInt(b, 10 ); 

    if ( r==null || g==null || b==null || isNaN(r) || isNaN(g)|| isNaN(b) ) {
      alert ('Please enter numeric RGB values!');
      return;
    }
    if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
      alert ('RGB values must be in the range 0 to 255.');
      return;
    }
    r=r/255; g=g/255; b=b/255;
    var minRGB = Math.min(r,Math.min(g,b));
    var maxRGB = Math.max(r,Math.max(g,b));

    // Black-gray-white
    if (minRGB==maxRGB) {
     computedV = minRGB;
     return [0,0,computedV];
    }

    // Colors other than black-gray-white:
    var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
    var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
    computedH = 60*(h - d/(maxRGB - minRGB));
    computedS = (maxRGB - minRGB)/maxRGB;
    computedV = maxRGB;
    return [computedH,computedS,computedV];
}

updateModalContents = function(button_id, color_name) {

    // var s = button_id.toString();
    // while(s.charAt(0) === '#') {
    //     s = s.substr(1);
    // }
    
    hexToRgb(button_id.toString());
    calculateHSV(r, g, b);

    document.getElementById("colorInfoTitle").innerHTML=(button_id.toString() + " (" + color_name + ")");
    document.getElementById("color-preview").style.backgroundColor=(button_id.toString());
    document.getElementById("color-info-rgb").innerHTML=(r + ", " + g + ", " + b);
    document.getElementById("color-info-hsv").innerHTML=(Math.round(computedH) + ", " + Math.round(computedS * 100) + "%, " + Math.round(computedV * 100) + "%");
    document.getElementById("color-info-hex").innerHTML=(button_id.toString());
    document.getElementById("color-info-name").innerHTML=(color_name);
    $('#colorInfoModal').modal();
}
