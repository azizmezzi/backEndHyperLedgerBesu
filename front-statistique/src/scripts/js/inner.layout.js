var nice_menu = false;
var nice_content = false;
var nice_contextual = false;

$(document).ready(function () {
    $(".firstname").html(readCookie("firstname"));
    $(".lastname").html(readCookie("lastname"));
    
    if(!$.browser.mobile) {
        nice_menu = $("#menu > .menu-wrapper").niceScroll({
            autohidemode : false,
            railpadding  : {
                top    : 1,
                right  : 3,
                left   : 1,
                bottom : 1
            },
            cursorcolor: "rgba(255,255,255,.4)",
            cursorwidth: "5px",
            cursorborder: "none",
            cursorborderradius: "5px",
            horizrailenabled: false
        });
        nice_content = $("#content").niceScroll({
            autohidemode : false,
            railpadding  : {
                top    : 1,
                right  : 1,
                left   : 1,
                bottom : 1
            },
            cursorcolor: "rgba(0,0,0,.3)",
            cursorwidth: "5px",
            cursorborder: "none",
            cursorborderradius: "5px",
            horizrailenabled: false
        });
        nice_contextual = $("#contextual").niceScroll({
            autohidemode : false,
            railpadding  : {
                top    : 1,
                right  : 1,
                left   : 1,
                bottom : 1
            },
            cursorcolor: "rgba(0,0,0,.3)",
            cursorwidth: "5px",
            cursorborder: "none",
            cursorborderradius: "5px",
            horizrailenabled: false
        });
    }
});