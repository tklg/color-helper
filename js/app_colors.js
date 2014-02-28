var Data = Backbone.Model.extend({
    defaults: {
        title: '',
        desc: '',
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

var app_colors = Backbone.Router.extend({
    routes: {
        '': 'start',
    },
    start: function () {
        new AppView({collection: new DataList()});
    }
});

$(document).ready(function(){
    new app_colors();
    Backbone.history.start();

    contact = {
        "name": "Theodore Kluge",
        };
    console.warn(contact);
});

//-----------------------
//Other stuff
//moved to colormath.js

setModalContents = function(button_id, color_name) {

    colorAngle = 0;
    hexToRgb(button_id.toString());
    calculateHSL(r, g, b);
    calculateCMYK(r, g, b);

    document.getElementById("colorInfoTitle").innerHTML=(button_id.toString() + " (" + color_name + ")");
    document.getElementById("color-preview").style.backgroundColor=(button_id.toString());
    document.getElementById("color-info-rgb").innerHTML=(r + ", " + g + ", " + b);
    document.getElementById("color-info-hsl").innerHTML=(Math.round(h * 100) + "&deg;, " + Math.round(s * 100) + "%, " + Math.round(l * 100) + "%");
    calculateHSV(r, g, b);
    document.getElementById("color-info-hsv").innerHTML=(Math.round(h * 100) + "&deg;, " + Math.round(s * 100) + "%, " + Math.round(v * 100) + "%");
    document.getElementById("color-info-cmyk").innerHTML=(Math.round(c * 100) + ", " + Math.round(m * 100) + ", " + Math.round(y * 100) + ", " + Math.round(k * 100));
    document.getElementById("color-info-hex").innerHTML=(button_id.toString());
    document.getElementById("color-info-name").innerHTML=(color_name);

    calculateComplimentaries(h, s, l, 'complementary');
    document.getElementById("color-preview-complementary").style.backgroundColor=("#" + complimentaryHex);
    document.getElementById("color-preview-complementary").innerHTML=("Complementary: #" + complimentaryHex);
    calculateComplimentaries(h, s, l, 'triad');
    document.getElementById("color-preview-triad").style.backgroundColor=("#" + triad1Hex);
    document.getElementById("color-preview-triad").innerHTML=("Triad: #" + triad1Hex);
    document.getElementById("color-preview-triad2").style.backgroundColor=("#" + triad2Hex);
    document.getElementById("color-preview-triad2").innerHTML=("Triad: #" + triad2Hex);
    calculateComplimentaries(h, s, l, 'analogous');
    document.getElementById("color-preview-analogous").style.backgroundColor=("#" + analogous1Hex);
    document.getElementById("color-preview-analogous").innerHTML=("Analogous: #" + analogous1Hex);
    document.getElementById("color-preview-analogous2").style.backgroundColor=("#" + analogous2Hex);
    document.getElementById("color-preview-analogous2").innerHTML=("Analogous: #" + analogous2Hex);
    calculateComplimentaries(h, s, l, 'splitcomp');
    document.getElementById("color-preview-splitcomp").style.backgroundColor=("#" + splitcomp1Hex);
    document.getElementById("color-preview-splitcomp").innerHTML=("Split complementary: #" + splitcomp1Hex);
    document.getElementById("color-preview-splitcomp2").style.backgroundColor=("#" + splitcomp2Hex);
    document.getElementById("color-preview-splitcomp2").innerHTML=("Split complementary: #" + splitcomp2Hex);
    
    $('#colorInfoModal').modal();
}

updateModalContents = function() {

    calculateComplimentaries(h, s, l, 'complementary');
    document.getElementById("color-preview-complementary").style.backgroundColor=("#" + complimentaryHex);
    document.getElementById("color-preview-complementary").innerHTML=("Complementary: #" + complimentaryHex);
    calculateComplimentaries(h, s, l, 'triad');
    document.getElementById("color-preview-triad").style.backgroundColor=("#" + triad1Hex);
    document.getElementById("color-preview-triad").innerHTML=("Triad: #" + triad1Hex);
    document.getElementById("color-preview-triad2").style.backgroundColor=("#" + triad2Hex);
    document.getElementById("color-preview-triad2").innerHTML=("Triad: #" + triad2Hex);
    calculateComplimentaries(h, s, l, 'analogous');
    document.getElementById("color-preview-analogous").style.backgroundColor=("#" + analogous1Hex);
    document.getElementById("color-preview-analogous").innerHTML=("Analogous: #" + analogous1Hex);
    document.getElementById("color-preview-analogous2").style.backgroundColor=("#" + analogous2Hex);
    document.getElementById("color-preview-analogous2").innerHTML=("Analogous: #" + analogous2Hex);
    calculateComplimentaries(h, s, l, 'splitcomp');
    document.getElementById("color-preview-splitcomp").style.backgroundColor=("#" + splitcomp1Hex);
    document.getElementById("color-preview-splitcomp").innerHTML=("Split complementary: #" + splitcomp1Hex);
    document.getElementById("color-preview-splitcomp2").style.backgroundColor=("#" + splitcomp2Hex);
    document.getElementById("color-preview-splitcomp2").innerHTML=("Split complementary: #" + splitcomp2Hex);

}