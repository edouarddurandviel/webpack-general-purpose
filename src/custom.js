(function ( $ ) {

    // for each DOM el concerned by the plugin function
    // context this
 
    $.fn.greenify = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
        }, options );

        return this.each(function() {
            // Do something to each element here.
            this.css({
                color: settings.color,
                backgroundColor: settings.backgroundColor
            });
        });
    };
 
}( jQuery ));

// example
$('.listElement').greenify({
    color: 'red',
    backgroundColor: 'black'
})

// Plugin definition.
$.fn.hilight = function(options) {
 
    // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var opts = $.extend({}, $.fn.hilight.defaults, options);

     // Private function.
     function debug(obj) {
        if (window.console && window.console.log) {
            window.console.log("hilight selection count: " + obj.length);
        }
    };
 
    // Our plugin implementation code goes here.
    // Iterate and reformat each matched element.
    return this.each(function() {
 
        var elem = $(this);
 
        // ...
 
        var markup = elem.html();
 
        // Call our format function.
        markup = $.fn.hilight.format(markup);
 
        elem.html(markup);
 
    });
 
};

// Define our format function.
$.fn.hilight.format = function(txt) {
    return "<strong>" + txt + "</strong>";
};

 // Plugin defaults – added as a property on our plugin function.
 $.fn.hilight.defaults = {
    // These are the defaults.
    foreground: "red",
    background: "yellow"
};

// specify new settings
$.fn.hilight.defaults.foreground = "blue";

// Provide Public Access to Secondary Functions as Applicable

jQuery.fn.superGallery = function( options ) {
 
    // Bob's default settings:
    var defaults = {
        textColor: "#000",
        backgroundColor: "#fff",
        fontSize: "1em",
        delay: "quite long",
        getTextFromTitle: true,
        getTextFromRel: false,
        getTextFromAlt: false,
        animateWidth: true,
        animateOpacity: true,
        animateHeight: true,
        animationDuration: 500,
        clickImgToGoToNext: true,
        clickImgToGoToLast: false,
        nextButtonText: "next",
        previousButtonText: "previous",
        nextButtonTextColor: "red",
        previousButtonTextColor: "red",
        onImageShow : function() {}, // register callbacks
    };
 
    var settings = $.extend( {}, defaults, options );

    // create private function
    function showNextImage() {
        // Returns reference to the next image node
        var image = getNextImage();
        // Here's the callback:
        settings.onImageShow.call(image);
    }

    // use function internally
    nextButton.on( "click", showNextImage);
 
};

// application
$( "ul.imgs li" ).superGallery({
    // callbacks
    onImageShow: function() {
        $( this ).after( "<span>" + $( this ).attr( "longdesc" ) + "</span>" );
    },
 
    // ... other options ...
});