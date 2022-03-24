$(document).ready(function() {
    $("#signout-btn").click(function() {
        eraseCookie("firstname");
        eraseCookie("lastname");
        eraseCookie("email");
        eraseCookie("role");
        eraseCookie("state");
        eraseCookie("Address");
        eraseCookie("Cashout_limit");
        eraseCookie("username");
        eraseCookie("wallet");
        eraseCookie("privateKey");
        eraseCookie("token");
        eraseCookie("id");

        window.location.replace("index.html");
    });
});