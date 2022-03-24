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
                $("#form-field-balance").val(data.balance + " E-FCFA");
            },
            complete: function() { endLoading("#content"); },
            dataType: "json"
        });
    });

    //-------------------------------------------------------------------------------------------------------

    $("#form-field-amount").inputFilter(function(value) {
        return /^\d*$/.test(value);
    });

    //-------------------------------------------------------------------------------------------------------

    var $form = $("#transfer-form");
    var $fields = $form.find(".form-fields .field");

    $form.submit(function(e) {
        e.preventDefault();

        $form.find(".error").removeClass("error");
        $("#content > .content-wrapper > header > p").remove();

        $fields.each(function() {
            var $field = $(this);
            if($field.val() == "") $field.parent().addClass("error");
        });

        if($form.find(".error").length == 0)
            confirmBox("êtes-vous sûr de vouloir continuer?", "Annuler", "Continuer", "#content", function() {
                startLoading("#content", 200, function() {
                    $.ajax({
                        type: "POST",
                        url: "http://3.86.66.87:3007/getAdherentbyID",
                        data: {
                            idAD : $("#form-field-receiver").val()
                        },
                        success: function(receiver) {
                            $.ajax({
                                method: "POST",
                                url: "http://3.86.66.87:3002/newTransfer",
                                data: {
                                    amount : $("#form-field-amount").val(),
                                    sender : readCookie("wallet"),
                                    fnamesender : readCookie("firstname"),
                                    lnamesender : readCookie("lastname"),
                                    idsender : readCookie("id"),
                                    reciver : receiver.wallet,
                                    namereciver : receiver.firstname,
                                    id_reciver : receiver.id
                                },
                                success: function(hash) {
                                    $("#content > .content-wrapper > header").append('<p class="success">Le transfer a été effectué avec succès.<br/>Le hash de l\'opération est <span class="hash">' + hash + '</span></p>');
                                    $("#form-field-amount").val('');
                                    $("#form-field-receiver").val('');
                                },
                                complete: function() {
                                    $.ajax({
                                        method: "POST",
                                        url: "http://3.86.66.87:3000/balanceOf",
                                        data: {
                                            owner: readCookie("wallet")
                                        },
                                        success: function(data) {
                                            $("#form-field-balance").val(data.balance + " E-FCFA");
                                        },
                                        complete: function() { endLoading("#content"); }
                                    });
                                }
                            });
                        }
                    });
                });
            });
    });
});