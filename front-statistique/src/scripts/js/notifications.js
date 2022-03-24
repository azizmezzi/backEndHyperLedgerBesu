if((readCookie("firstname") == undefined) || (readCookie("firstname") == null)) window.location.replace("index.html");
else $(document).ready(function() {
    startLoading("#content", 0, function() {
        $.ajax({
            type: "POST",
            url: "http://3.86.66.87:3000/notification",
            data: {
                borrower : readCookie("wallet")
            },
            success: function(data) {
                $.each(data, function(i, notification) {
                    var date = notification.pd[4] * 1000;
                    var $date = new Date(date);
                    $date = $date.toLocaleString((navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language, {
                        day : 'numeric',
                        month : 'short',
                        year : 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    var currentDate = new Date();
                    currentDate = currentDate.getTime();

                    $("#notifications").append("\
                        <div class='notification' data-timestamp='" + notification.pd[4] + "'>\
                            <div>Date limite : <span class='date'>" + $date + "</span>" + (date <= currentDate ? "<span class='status late'>échéance dépassée</span>" : "") + "</div>\
                            <div><span class='amount'>" + notification.pd[5] + " e-FCFA</span></div>\
                            <div>" + (date <= currentDate ? "Cette échéance est dépassée" : "Cette échéance expirera dans moins d'une semaine") + "</span></div>\
                        </div>\
                    ");
                });
            },
            dataType: "json"
        });
    });
    
    $(document).ajaxStop(function () {
        $(this).unbind("ajaxStop");
        
        $("#notifications").find(".notification").sort(function(a,b) {
             return b.dataset.timestamp - a.dataset.timestamp;
        }).appendTo("#notifications");
        
        endLoading("#content");
    });
});