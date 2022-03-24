function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

//-----------------------------------------------------------------------------------

function startLoading(anchor, duration, callback) {
    $children = $(anchor).children();
    if($children.length > 0)
        $children.fadeOut(duration, function() {
            $(anchor).addClass("loading animate-loading");
            setTimeout(callback(), 200);
        });
    else {
        if((anchor == "#contextual") && $(anchor).hasClass("empty")) $(anchor).removeClass("empty");
        $(anchor).addClass("loading animate-loading");
        setTimeout(callback(), 200);
    }
}
function endLoading(anchor, callback) {
    $(anchor).removeClass("loading");
    setTimeout(function() {
        $(anchor).removeClass("animate-loading");
        $(anchor).children().fadeIn(200, function() {
            if(anchor == "#content") nice_content.resize();
            else if(anchor == "#contextual") nice_contextual.resize();
            if(typeof callback !== "undefined") callback();
        });
    }, 200);
}

//-----------------------------------------------------------------------------------

function confirmBox($message, $cancel, $accept, anchor, callback) {
    $(anchor).append('\
        <div id="overlay">\
            <div class="confirm">\
                <div class="message">\
                    <span>' + $message + '</span>\
                </div>\
                <button id="confirm-cancel">' + $cancel + '</button>\
                <button id="confirm-accept">' + $accept + '</button>\
            </div>\
        </div>\
    ');
    $("#overlay").css("display", "flex").hide().fadeIn(400);
    
    $(anchor).on("click", "#confirm-cancel", function() {
        $("#overlay").fadeOut(200, function() {
            $(this).remove();
        });
    });
    $(anchor).on("click", "#confirm-accept", function() {
        $("#overlay").fadeOut(200, function() {
            $(this).remove();
            callback();
        });
    });
}

//-----------------------------------------------------------------------------------

(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if(inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if(this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));