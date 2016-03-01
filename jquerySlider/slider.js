var webkitBefore = "#slider::-webkit-slider-thumb:before";
var webkitAfter = "#slider::-webkit-slider-thumb:after";
var msBefore = "#slider::-ms-thumb:before";
var msAfter = "#slider::-ms-thumb:after";
var mozBefore = "#slider::-moz-range-thumb:before";
var mozAfter = "#slider::-moz-range-thumb:after";

function injectStyles(rule, clear) {
    if($("#sliderStyle").length === 0) {
        $("body").append('<style id="sliderStyle">' + rule + '</style>')
    } else {
        if (clear) {
            $("#sliderStyle").html(rule);
        } else {
            $("#sliderStyle").append(rule);
        }
    }
}

$(window).load(function() {
    injectStyles(webkitAfter + " {content:'50'; top: 0;  -webkit-appearance: none; border: none; background: rgba(0, 0, 0, 0);}");
    injectStyles(webkitBefore + " {display: none;}");

    //###### MICROSOFT/IE #########
    injectStyles(msAfter + " {content:'50'; top: 0;  -webkit-appearance: none; border: none; background: rgba(0, 0, 0, 0);}");
    injectStyles(msBefore + " {display: none;}");


    //###### MOZILLA #########
    injectStyles(mozAfter + " {content:'50'; top: 0;  -webkit-appearance: none; border: none; background: rgba(0, 0, 0, 0);}");
    injectStyles(mozBefore + " {display: none;}");
});

$.fn.buildSlider = function() {
    this.html('<input type="range" min="0" max="100" value="50" id="slider"/>');
    this.addClass("sliderWrapper");


    $("#slider").on("mouseup", function() {
        //###### CHROME #########
        injectStyles(webkitAfter + " {content:'" + this.value + "'; top: 0;  -webkit-appearance: none; border: none; background: rgba(0, 0, 0, 0);}", true);
        injectStyles(webkitBefore + " {display: none;}");

        //###### MICROSOFT/IE #########
        injectStyles(msAfter + " {content:'" + this.value + "'; top: 0;  -webkit-appearance: none; border: none; background: rgba(0, 0, 0, 0);}");
        injectStyles(msBefore + " {display: none;}");


        //###### MOZILLA #########
        injectStyles(mozAfter + " {content:'" + this.value + "'; top: 0;  -webkit-appearance: none; border: none; background: rgba(0, 0, 0, 0);}");
        injectStyles(mozBefore + " {display: none;}");

    }).on("mousedown input", function() {
        //###### CHROME #########
        injectStyles(webkitBefore + " {display: block;}", true);
        injectStyles(webkitAfter + " {content:'" + this.value + "'; top: -35px; border: 2px solid #282828; background: #282828;}");

        //###### MICROSOFT/IE #########
        injectStyles(msBefore + " {display: block;}");
        injectStyles(msAfter + " {content:'" + this.value + "'; top: -35px; border: 2px solid #282828; background: #282828;}");

        //###### MOZILLA #########
        injectStyles(mozBefore + " {display: block;}");
        injectStyles(mozAfter + " {content:'" + this.value + "'; top: -35px; border: 2px solid #282828; background: #282828;}");
    });
}

$.fn.getValue = function() {
    return $(this).find("#slider").val();
}
