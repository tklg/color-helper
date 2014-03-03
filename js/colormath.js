var r, g, b, h, s, l, v, c, m, y, k, hsv2r, hsv2g, hsv2b;
var computedH, computedS, computedV = 0;
var complimentaryHex, triadHex1, triadHex2,analogousHex1, analogousHex2, splitcompHex1, splitcompHex2 = '#123456';
var triad1r, triad1g, triad1b, triad2r, triad2g, triad2b, splitcomp1r, splitcomp1g, splitcomp1b, splitcomp2r, splitcomp2g, splitcomp2b, analogous1r, analogous1g, analogous1b, analogous2r, analogous2g, analogous2b;
var angleOfOffset = 0.10;
var colorAngle = 0;
var colorsUpdated = false;

function hexToRgb(hex) {

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
    console.log("Converted to rgb: " + r + "," + g + "," + b);
}

calculateHSL = function(r, g, b) {

    var_R = ( r / 255 );
    var_G = ( g / 255 );
    var_B = ( b / 255 );

    var_Min = Math.min( var_R, var_G, var_B );
    var_Max = Math.max( var_R, var_G, var_B );
    del_Max = var_Max - var_Min;

    l = ( var_Max + var_Min ) / 2;

    if ( del_Max == 0 ) {
       h = 0;
       s = 0;
    } else {
       if ( l < 0.5 ) {
            s = del_Max / ( var_Max + var_Min );
        } else {
            s = del_Max / ( 2 - var_Max - var_Min );
        }

       del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
       del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
       del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

       if ( var_R == var_Max ) {
            h = del_B - del_G;
        } else if ( var_G == var_Max ) {
            h = ( 1 / 3 ) + del_R - del_B;
        } else if ( var_B == var_Max ) {
            h = ( 2 / 3 ) + del_G - del_R;
        }

       if ( h < 0 ) { h += 1 }
       if ( h > 1 ) { h -= 1 }
    }
    //return [computedH,computedS,computedV];
    return [h, s, l];
    // console.log("Calculated HSV: " + computedH + "," + computedS + "," + computedV);    
    console.log("Calculated HSL: " + h + "," + s + "," + l); 
}

calculateHSV = function(r, g, b) {

    var_R = ( r / 255 );
    var_G = ( g / 255 );
    var_B = ( b / 255 );

    var_Min = Math.min( var_R, var_G, var_B );
    var_Max = Math.max( var_R, var_G, var_B );
    del_Max = var_Max - var_Min;

    v = var_Max;

    if ( del_Max == 0 ) {
       h = 0;
       s = 0;
    } else {
        s = del_Max / var_Max;

           del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
           del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
           del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

           if ( var_R == var_Max ) {
                h = del_B - del_G;
            } else if ( var_G == var_Max ) {
                h = ( 1 / 3 ) + del_R - del_B;
            } else if ( var_B == var_Max ) {
                h = ( 2 / 3 ) + del_G - del_R;
            }

           if ( h < 0 ) { h += 1 }
           if ( h > 1 ) { h -= 1 }
        }
    
    //return [computedH,computedS,computedV];
    return [h, s, l];
    // console.log("Calculated HSV: " + computedH + "," + computedS + "," + computedV);    
    console.log("Calculated HSL: " + h + "," + s + "," + l); 
}

calculateComplimentaries = function(h, s, v, type) {
    

    if (type === 'complementary') {
        h2 = (h % 360) + 0.5 + colorAngle;
        if (h2 > 1) {
            h2--;
        }

        if (s == 0) {
                hsv2r = v * 255;
                hsv2g = v * 255;
                hsv2b = v * 255;
        } else {
                if (v < 0.5) {
                        var_2 = v * (1 + s);
                } else {
                        var_2 = (v + s) - (s * v);
                }

                var_1 = 2 * v - var_2;
                hsv2r = 255 * hue_2_rgb(var_1,var_2,h2 + (1 / 3));
                hsv2g = 255 * hue_2_rgb(var_1,var_2,h2);
                hsv2b = 255 * hue_2_rgb(var_1,var_2,h2 - (1 / 3));
        }
        // if (v == 0 && s == 0) {
        //     complimentaryHex = 'FFFFFF'
        // } else {
            complimentaryHex = RGBToHex(hsv2r, hsv2g, hsv2b).toString();
            console.log("complimentaryHex: " + complimentaryHex);
        //}

    } else if (type === 'triad') {
        triad1 = (h % 360) + 0.33 + colorAngle;
        triad2 = (h % 360) - 0.33 - colorAngle;
        if (triad1 > 1) {
            triad1--;
        } else if (triad1 < 0) {
            triad1++;
        }
        if (triad2 > 1) {
            triad2--;
        } else if (triad2 < 0) {
            triad2++;
        }

        if (s == 0) {
                triad1r, triad2r = v * 255;
                triad1g, triad2g = v * 255;
                triad1b, triad2b = v * 255;
        } else {
                if (v < 0.5) {
                        var_2 = v * (1 + s);
                } else {
                        var_2 = (v + s) - (s * v);
                }

                var_1 = 2 * v - var_2;
                triad1r = 255 * hue_2_rgb(var_1,var_2,triad1 + (1 / 3));
                triad1g = 255 * hue_2_rgb(var_1,var_2,triad1);
                triad1b = 255 * hue_2_rgb(var_1,var_2,triad1 - (1 / 3));
                triad2r = 255 * hue_2_rgb(var_1,var_2,triad2 + (1 / 3));
                triad2g = 255 * hue_2_rgb(var_1,var_2,triad2);
                triad2b = 255 * hue_2_rgb(var_1,var_2,triad2 - (1 / 3));
        }
        // if (v == 0 && s == 0) {
        //     triad1Hex = 'FFFFFF';
        //     triad2Hex = 'F0F0F0';
        // } else {
            triad1Hex = RGBToHex(triad1r, triad1g, triad1b).toString();
            triad2Hex = RGBToHex(triad2r, triad2g, triad2b).toString();
            console.log("triad1Hex: " + triad1Hex);
            console.log("triad2Hex: " + triad2Hex);
        //}

    } else if (type === 'analogous') {
        analogous1 = (h % 360) + 0.10 + colorAngle;
        analogous2 = (h % 360) - 0.10 - colorAngle;
        if (analogous1 > 1) {
            analogous1-=1;
        } else if (analogous1 < 0) {
            analogous1+=1;
        }
        if (analogous2 > 1) {
            analogous2-=1;
        } else if (analogous2 < 0) {
            analogous2+=1;
        }

        if (s == 0) {
                analogous1r, analogous2r = v * 255;
                analogous1g, analogous2g = v * 255;
                analogous1b, analogous2b = v * 255;
        } else {
                if (v < 0.5) {
                        var_2 = v * (1 + s);
                } else {
                        var_2 = (v + s) - (s * v);
                }

                var_1 = 2 * v - var_2;
                analogous1r = 255 * hue_2_rgb(var_1,var_2,analogous1 + (1 / 3));
                analogous1g = 255 * hue_2_rgb(var_1,var_2,analogous1);
                analogous1b = 255 * hue_2_rgb(var_1,var_2,analogous1 - (1 / 3));
                analogous2r = 255 * hue_2_rgb(var_1,var_2,analogous2 + (1 / 3));
                analogous2g = 255 * hue_2_rgb(var_1,var_2,analogous2);
                analogous2b = 255 * hue_2_rgb(var_1,var_2,analogous2 - (1 / 3));
        }
        // if (v == 0 && s == 0) {
        //     analogous1Hex = 'FFFFFF';
        //     analogous2Hex = 'F0F0F0';
        // } else {
            analogous1Hex = RGBToHex(analogous1r, analogous1g, analogous1b).toString();
            analogous2Hex = RGBToHex(analogous2r, analogous2g, analogous2b).toString();
            console.log("analogous1Hex: " + analogous1Hex);
            console.log("analogous2Hex: " + analogous2Hex);
        //}
    } else if (type === 'splitcomp') {
        splitcomp1 = (h % 360) + 0.45 + colorAngle;
        splitcomp2 = (h % 360) - 0.45 - colorAngle;
        if (splitcomp1 > 1) {
            splitcomp1-=1;
        } else if (splitcomp1 < 0) {
            splitcomp1+=1;
        }
        if (splitcomp2 > 1) {
            splitcomp2-=1;
        } else if (splitcomp2 < 0) {
            splitcomp2+=1;
        }

        if (s == 0) {
                splitcomp1r, splitcomp2r = v * 255;
                splitcomp1g, splitcomp2g = v * 255;
                splitcomp1b, splitcomp2b = v * 255;
        } else {
                if (v < 0.5) {
                        var_2 = v * (1 + s);
                } else {
                        var_2 = (v + s) - (s * v);
                }

                var_1 = 2 * v - var_2;
                splitcomp1r = 255 * hue_2_rgb(var_1,var_2,splitcomp1 + (1 / 3));
                splitcomp1g = 255 * hue_2_rgb(var_1,var_2,splitcomp1);
                splitcomp1b = 255 * hue_2_rgb(var_1,var_2,splitcomp1 - (1 / 3));
                splitcomp2r = 255 * hue_2_rgb(var_1,var_2,splitcomp2 + (1 / 3));
                splitcomp2g = 255 * hue_2_rgb(var_1,var_2,splitcomp2);
                splitcomp2b = 255 * hue_2_rgb(var_1,var_2,splitcomp2 - (1 / 3));
        }
        // if (v == 0 && s == 0) {
        //     splitcomp1Hex = 'FFFFFF';
        //     splitcomp2Hex = 'F0F0F0';
        // } else {
            splitcomp1Hex = RGBToHex(splitcomp1r, splitcomp1g, splitcomp1b).toString();
            splitcomp2Hex = RGBToHex(splitcomp2r, splitcomp2g, splitcomp2b).toString();
            console.log("splitcomp1Hex: " + splitcomp1Hex);
            console.log("splitcomp2Hex: " + splitcomp2Hex);
        //}
    }    
}

RGBToHex = function(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}

function hue_2_rgb(v1,v2,vh) {
                if (vh < 0)
                {
                        vh += 1;
                };

                if (vh > 1)
                {
                        vh -= 1;
                };

                if ((6 * vh) < 1)
                {
                        return (v1 + (v2 - v1) * 6 * vh);
                };

                if ((2 * vh) < 1)
                {
                        return (v2);
                };

                if ((3 * vh) < 2)
                {
                        return (v1 + (v2 - v1) * ((2 / 3 - vh) * 6));
                };

                return (v1);
                console.log("hue to rgb");
        }

calculateCMYK = function(r, g, b) {
    c = 1 - ( r / 255 )
    m = 1 - ( g / 255 )
    y = 1 - ( b / 255 )

    var_K = 1

    if ( c < var_K ) { var_K = c }
    if ( m < var_K ) { var_K = m }
    if ( y < var_K ) { var_K = y }
    if ( var_K == 1 ) { //Black
       c = 0
       m = 0
       y = 0
    }
    else {
       c = ( c - var_K ) / ( 1 - var_K )
       m = ( m - var_K ) / ( 1 - var_K )
       y = ( y - var_K ) / ( 1 - var_K )
    }
    k = var_K
}

updateColors = function(angle) {

    var colorsUpdated = true;
    if (angle > 45) {
        document.getElementById("angle-alert").style.display="inline";
    } else {
        document.getElementById("angle-alert").style.display="none";
        colorAngle = Math.abs(angle) / 100;
    }
    
}

$("#colordata")
    .each(function () {
          var input = $(this);
          $("<span>")
            .addClass("colordata-addon")
            .insertAfter($(this));
        })
    .bind("slider:changed", function (event, data) {
        $(this)
        .nextAll(".colordata-addon:first")
          .html(data.value.toFixed() + "&deg;");
      colorAngle = Math.round(data.value) / 360;
      updateModalContents();
      //document.getElementById('colordata-addon').innerHTML=(Math.round(data.value));
    });