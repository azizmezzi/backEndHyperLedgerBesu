$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "http://3.86.66.87:3000/notification",
        data: {
            borrower: readCookie("wallet")
        },
        success: function(data) {
            if(data.length > 0)
                $("<span>" + data.length + "</span>").appendTo("#menu .link.notifications").hide().fadeIn(200);
        },
        fail: function() {},
        dataType: "json"
    });
});