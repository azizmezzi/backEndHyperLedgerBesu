if((readCookie("firstname") == undefined) || (readCookie("firstname") == null)) window.location.replace("index.html");
else $(document).ready(function() {
    startLoading("#content", 0, function() {
        $.ajax({
            type: "POST",
            url: "http://3.86.66.87:3003/getCashoutLengthByTs",
            data: {
                ts: readCookie("wallet")
            },
            success: function(cashoutLength) {
                var i; for(i = 0; i < cashoutLength; i++) {
                    $.ajax({
                        type: "POST",
                        url: "http://3.86.66.87:3003/getCashoutIndexByTs",
                        data: {
                            ts: readCookie("wallet"),
                            i: i
                        },
                        success: function(cashoutID) {
                            $.ajax({
                                type: "POST",
                                url: "http://3.86.66.87:3003/getcashoutinfo",
                                data: {
                                    _id: cashoutID
                                },
                                success: function(data) {
                                    $.ajax({
                                        type: "POST",
                                        url: "http://3.86.66.87:3007/getAgent",
                                        data: {
                                            wallet: data.result.wallet_Tokenreceiver
                                        },
                                        success: function(agent) {
                                            var date = new Date(data.result.Cashout_Date * 1000);
                                            date = date.toLocaleString((navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language, {
                                                day : 'numeric',
                                                month : 'short',
                                                year : 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            });
                                            
                                            $("#proofs").prepend("\
                                                <div class='proof' data-timestamp='" + data.result.Cashout_Date + "'>\
                                                    <div><span class='id'>" + cashoutID + "</span><span class='date'>" + date + "</span></div>\
                                                    <div><span class='amount'>" + data.result.Amount_Token + " e-FCFA</span></div>\
                                                    <div>Cash-out" + (data.type == 1 ? " pour le compte de <span class='receiver'>" + data.result.Nom_FIATreceiver + " " + data.result.Prenom_FIATreceiver + "</span>," : "") + " pris en charge par <span class='agent'>" + agent.firstname + " " + agent.lastname + "</span> à l'agence <span class='address'>" + agent.id_agence + "</span></div>\
                                                </div>\
                                            ");
                                        },
                                        dataType: "json"
                                    });
                                },
                                dataType: "json"
                            });
                        },
                        dataType: "json"
                    });
                }
            },
            dataType: "json"
        });
    });
    
    $(document).ajaxStop(function () {
        $(this).unbind("ajaxStop");
        
        $("#proofs").find(".proof").sort(function(a,b) {
             return b.dataset.timestamp - a.dataset.timestamp;
        }).appendTo("#proofs");
        
        endLoading("#content");
    });

    //-------------------------------------------------------------------------------------------------------
    
    startLoading("#contextual", 0, function() {
        $.ajax({
            type: "POST",
            url: "http://3.86.66.87:3000/balanceOf",
            data: {
                owner: readCookie("wallet")
            },
            success: function(data) {
                $("#form-field-balance").val(data.balance + " E-FCFA");
            },
            complete: function() { endLoading("#contextual"); },
            dataType: "json"
        });
    });

    //-------------------------------------------------------------------------------------------------------
    
    var $form = $("#cashout-form");
    var $fields = $form.find(".field");
    
    $("#form-field-amount").inputFilter(function(value) {
        return /^\d*$/.test(value);
    });
    
    $("#form-field-agent").on("propertychange input change paste", function() {
        var value = $(this).val();
        if(value.length == 42)
            $.ajax({
                type: "POST",
                url: "http://3.86.66.87:3007/getAgent",
                data: {
                    wallet: value
                },
                success: function(agent) {
                    $("#form-field-address").val(agent.id_agence);
                    $("#form-field-agent-firstname").val(agent.firstname);
                    $("#form-field-agent-lastname").val(agent.lastname);
                    $("#form-field-address").parent().removeClass("hidden");
                },
                fail: function() {
                    $("#form-field-address").val('');
                    $("#form-field-agent-firstname").val('');
                    $("#form-field-agent-lastname").val('');
                    $("#form-field-address").parent().addClass("hidden");
                },
                complete: function() { nice_contextual.resize(); },
                dataType: "json"
            });
        else {
            $("#form-field-address").val('');
            $("#form-field-address").parent().addClass("hidden");
        }
    });

    $fields.filter(":radio").change(function() {
        $("#receiver-data").toggleClass("hidden", $(this).is("#form-field-receiver-1"));
        nice_contextual.resize();
    });
    
    $form.submit(function(e) {
        e.preventDefault();
        
        if($("#form-field-amount").val() == "") $("#form-field-amount").parent().addClass("error");
        if(($("#form-field-agent").val().length != 42) || ($("#form-field-address").val() == '')) $("#form-field-agent").parent().addClass("error");
        if(!$("#receiver-data").hasClass("hidden")) {
            if($("#form-field-receiver-id").val() == "") $("#form-field-receiver-id").parent().addClass("error");
            if($("#form-field-receiver-firstname").val() == "") $("#form-field-receiver-firstname").parent().addClass("error");
            if($("#form-field-receiver-lastname").val() == "") $("#form-field-receiver-lastname").parent().addClass("error");
        }
        
        if($form.find(".error").length == 0)
            confirmBox("êtes-vous sûr de vouloir continuer?", "Annuler", "Continuer", "#contextual", function() {
                startLoading("#contextual", 200, function() {
                    $("#contextual > .contextual-wrapper > header > p").remove();
                    
                    var data = {
                        Amount_Token: $("#form-field-amount").val(),
                        wallet_Tokenreceiver: $("#form-field-agent").val(),
                        ID_Sender: readCookie("id"),
                        Nom_Sender: readCookie("lastname"),
                        Prenom_Sender: readCookie("firstname"),
                        wallet_Sender: readCookie("wallet")
                    };

                    if($("#receiver-data").hasClass("hidden")) {
                        data.ID_FIATReceiver = readCookie("id");
                        data.Nom_FIATreceiver = readCookie("lastname");
                        data.Prenom_FIATreceiver = readCookie("firstname");
                    }
                    else {
                        data.ID_FIATReceiver = $("#form-field-receiver-id").val();
                        data.Nom_FIATreceiver = $("#form-field-receiver-lastname").val();
                        data.Prenom_FIATreceiver = $("#form-field-receiver-firstname").val();
                    }

                    $.ajax({
                        method: "POST",
                        url: "http://3.86.66.87:3003/newCashout",
                        data: data,
                        success: function(hash) {
                            $("#contextual > .contextual-wrapper > header").append('<p class="success">La demande de cash-out a été effectuée avec succès.<br/>Le hash de l\'opération est <span class="hash">' + hash + '</span></p>');
                            var currentDate = new Date();
                            var formattedDate = currentDate.toLocaleString((navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language, {
                                day : 'numeric',
                                month : 'short',
                                year : 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                            
                            $("#proofs").prepend("\
                                <div class='proof' data-timestamp='" + currentDate.getTime() + "'>\
                                    <div><span class='date'>" + formattedDate + "</span><span class='new'>Nouveau</span></div>\
                                    <div><span class='amount'>" + $("#form-field-amount").val() + " e-FCFA</span></div>\
                                    <div>Cash-out" + (!$("#receiver-data").hasClass("hidden") ? " pour le compte de <span class='receiver'>" + $("#form-field-receiver-firstname").val() + " " + $("#form-field-receiver-lastname").val() + "</span>," : "") + " pris en charge par <span class='agent'>" + $("#form-field-agent-firstname").val() + " " + $("#form-field-agent-lastname").val() + "</span> à l'agence <span class='address'>" + $("#form-field-address").val() + "</span></div>\
                                </div>\
                            ");
                            
                            $("#form-field-amount").val('');
                            $("#form-field-agent").val('');
                            $("#form-field-agent-firstname").val('');
                            $("#form-field-agent-lastname").val('');
                            $("#form-field-address").val('');
                            $("#form-field-address").parent().addClass("hidden");
                            $("#form-field-receiver-id").val('');
                            $("#form-field-receiver-firstname").val('');
                            $("#form-field-receiver-lastname").val('');
                            $("#form-field-receiver-1").prop("checked", true);
                            $("#receiver-data").addClass("hidden");
                            
                            $.ajax({
                                method: "POST",
                                url: "http://3.86.66.87:3000/balanceOf",
                                data: {
                                    owner: readCookie("wallet")
                                },
                                success: function(balance) {
                                    $("#form-field-balance").val(balance.balance + " E-FCFA");
                                },
                                complete: function() { endLoading("#contextual"); }
                            });
                        },
                        fail: function() {
                            $("#contextual > .contextual-wrapper > header").append('<p class="failure">Une erreur s\'est produite.<br/>Veuillez réessayer ultérieurement.</p>');
                            endLoading("#contextual");
                        }
                    });
                });
            });
    });
});