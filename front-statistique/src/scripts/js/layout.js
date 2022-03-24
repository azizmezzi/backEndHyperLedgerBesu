var nice_body = false;

$(document).ready(function () {
    if(!$.browser.mobile) {
        nice_body = $("body").niceScroll({
            autohidemode : false,
            railpadding  : {
                top    : 1,
                right  : 1,
                left   : 1,
                bottom : 1
            },
            cursorcolor: "rgba(255,255,255,.4)",
            cursorwidth: "5px",
            cursorborder: "none",
            cursorborderradius: "5px",
            horizrailenabled: false
        });
    }
});