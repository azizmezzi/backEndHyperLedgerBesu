if((readCookie("firstname") == undefined) || (readCookie("firstname") == null)) window.location.replace("index.html");
else $(document).ready(function() {
    startLoading("#content", 0, function() {
        $.ajax({
            type: "POST",
            url: "http://3.86.66.87:3000/balanceOf",
            data: {
                owner: readCookie("wallet")
            },
            success: function(data) {
                $("#balance").html(data.balance);
            },
            complete: function() {
                endLoading("#content");
            },
            dataType: "json"
        });
    });
});