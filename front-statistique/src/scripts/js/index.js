if((readCookie("firstname") != undefined) && (readCookie("firstname") != null)) window.location.replace("home.html");
else $(document).ready(function() {
    var $form = $("#login-form");
    var $fields = $form.find(".form-fields .field");

    $form.submit(function(e) {
        e.preventDefault();

        $form.find(".error").removeClass("error");

        $fields.each(function() {
            var $field = $(this);
            if($field.val() == "") $field.parent().addClass("error");
        });

        if($form.find(".error").length == 0) {
            $.ajax({
                method: "POST",
                url: "http://18.223.98.67:3001/adherentlogin",
                data: $form.serialize(),
                statusCode: {
                    801: function(response) {
                        var data = response.responseJSON;

                        $.ajax({
                            type: "POST",
                            url: "http://3.86.66.87:3007/getAdherentbyAdrr",
                            data: {
                                wallet: data.user.wallet
                            },
                            success: function(adherent) {
                                createCookie("id", adherent.id, 7);
                                createCookie("firstname", data.user.firstname, 7);
                                createCookie("lastname", data.user.lastname, 7);
                                createCookie("email", data.user.email, 7);
                                createCookie("role", data.user.role, 7);
                                createCookie("state", data.user.state, 7);
                                createCookie("Address", data.user.Address, 7);
                                createCookie("Cashout_limit", data.user.Cashout_limit, 7);
                                createCookie("username", data.user.username, 7);
                                createCookie("wallet", data.user.wallet, 7);
                                createCookie("privateKey", data.user.privateKey, 7);
                                createCookie("token", data.token, 7);

                                window.location.replace("home.html");
                            },
                            dataType: "json"
                        });
                    },
                    802: function() {},
                    803: function() {}
                }
            });
        }
    });
});