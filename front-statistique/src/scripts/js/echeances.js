window.contextual_busy = false;

if((readCookie("firstname") == undefined) || (readCookie("firstname") == null)) window.location.replace("index.html");
else $(document).ready(function() {
    startLoading("#content", 0, function() {
        $.ajax({
            type: "POST",
            url: "http://3.86.66.87:3000/getDeadlinesIndexes",
            data: {
                borrower : readCookie("wallet")
            },
            success: function(data) {
                $.each(data, function(i, deadlineID) {
                    $.ajax({
                        type: "POST",
                        url: "http://3.86.66.87:3000/getDeadlineInfo",
                        data: {
                            id : deadlineID,
                            borrower : readCookie("wallet")
                        },
                        success: function($details) {
                            var date = $details.DateDeadline * 1000;
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

                            $("#deadlines").append("\
                                <div class='deadline" + ($details.state == "1" ? " payed" : (date <= currentDate ? " late" : " ongoing")) + "' data-timestamp='" + $details.DateDeadline + "' data-deadline-id='" + deadlineID + "' data-op-id='" + $details.id_op + "' data-loan-id='" + $details.id_loan + "' data-intermediate='" + $details.intermediate + "'>\
                                    <div>\
                                        <span class='date'>" + $date + "</span>\
                                        " + ($details.state == "1" ? "<span class='status payed'>échéance payée</span>" : (date <= currentDate ? "<span class='status late'>échéance dépassée</span>" : "")) + "\
                                        <span class='amount'>" + $details.amount + "</span>\
                                    </div>\
                                    <div class='button'>" + ($details.state == "1" ? "Voir les détails de l'échéance" : "Payer l'échéance") + "</div>\
                                </div>\
                            ");
                        },
                        dataType: "json"
                    });
                })
            },
            dataType: "json"
        });
    });
    
    $(document).ajaxStop(function () {
        $(this).unbind("ajaxStop");
        
        $("#deadlines").find(".deadline").sort(function(a,b) {
             return b.dataset.timestamp - a.dataset.timestamp;
        }).appendTo("#deadlines");
        
        endLoading("#content");
    });

    //-------------------------------------------------------------------------------------------------------

    $(".filter").click(function() {
        $this = $(this);
        filter = $this.data("filter");

        if(!$this.hasClass("active")) {
            $this.addClass("active");
            $this.siblings().removeClass("active");

            switch(filter) {
                case("all"):
                    $(".deadline").fadeIn(200, function() { nice_content.resize(); });
                    break;
                case("ongoing"):
                    $(".deadline.ongoing").fadeIn(200);
                    $(".deadline").not(".ongoing").fadeOut(200, function() { nice_content.resize(); });
                    break;
                case("payed"):
                    $(".deadline.payed").fadeIn(200);
                    $(".deadline").not(".payed").fadeOut(200, function() { nice_content.resize(); });
                    break;
                case("late"):
                    $(".deadline.late").fadeIn(200);
                    $(".deadline").not(".late").fadeOut(200, function() { nice_content.resize(); });
                    break;
            }
        }
    });

    //-------------------------------------------------------------------------------------------------------

    $("#deadlines").on("click", ".deadline", function() {
        if(!$(this).hasClass("selected") && !window.contextual_busy) {
            window.contextual_busy = true;

            var $this = $(this);
            $this.siblings().removeClass("selected");
            $this.addClass("selected");

            startLoading("#contextual", 200, function() {
                $("#contextual").children().remove();

                if($this.hasClass("payed")) {
                    var details = {
                        deadlineID: $this.data("deadline-id"),
                        opID: $this.data("op-id"),
                        loanID: $this.data("loan-id"),
                        borrower: readCookie("firstname") + " " + readCookie("lastname"),
                        intermediate: $this.data("intermediate"),
                        date: $this.find(".date").html(),
                        amount: $this.find(".amount").html()
                    };

                    $('\
                        <div class="contextual-wrapper">\
                            <header>\
                                <h1>Détails de l\'opération</h1>\
                            </header>\
                            <section class="details">\
                                <div class="detail deadline-id">\
                                    <span class="detail-name">Identificateur de l\'échéance</span>\
                                    <span class="detail-value">' + details.deadlineID + '</span>\
                                </div>\
                                <div class="detail op-id">\
                                    <span class="detail-name">Identificateur de l\'opération</span>\
                                    <span class="detail-value">' + details.opID + '</span>\
                                </div>\
                                <div class="detail loan-id">\
                                    <span class="detail-name">Identificateur du crédit</span>\
                                    <span class="detail-value">' + details.loanID + '</span>\
                                </div>\
                                <div class="detail borrower">\
                                    <span class="detail-name">Bénéficiaire</span>\
                                    <span class="detail-value">' + details.borrower + '</span>\
                                </div>\
                                <div class="detail date">\
                                    <span class="detail-name">Date d\'échéance</span>\
                                    <span class="detail-value">' + details.date + '</span>\
                                </div>\
                                <div class="detail amount">\
                                    <span class="detail-name">Montant</span>\
                                    <span class="detail-value">' + details.amount + '</span>\
                                </div>\
                            </section>\
                        </div>\
                    ').hide().appendTo("#contextual");
                    
                    endLoading("#contextual", function() { window.contextual_busy = false; });
                }
                else $.ajax({
                    method: "POST",
                    url: "http://3.86.66.87:3000/balanceOf",
                    data: {
                        owner: readCookie("wallet")
                    },
                    success: function(balance) {
                        var details = {
                            balance: balance.balance,
                            deadlineID: $this.data("deadline-id"),
                            amount: $this.find(".amount").html()
                        };
                        
                        $('\
                            <div class="contextual-wrapper">\
                                <header>\
                                    <h1>Payement de l\'échéance</h1>\
                                </header>\
                                <form id="payment-form">\
                                    <div class="form-fields">\
                                        <div class="form-field">\
                                            <label>Mon Solde</label>\
                                            <input type="text" id="form-field-balance" class="field" value="' + details.balance + ' E-FCFA" readonly>\
                                        </div>\
                                        <div class="form-field">\
                                            <label for="form-field-amount">Montant à payer</label>\
                                            <input type="text" id="form-field-amount" class="field" value="' + details.amount + ' E-FCFA" readonly>\
                                        </div>\
                                        <div class="form-field">\
                                            <label for="form-field-deadline">Identificateur de l\'échéance</label>\
                                            <input type="text" id="form-field-deadline" class="field" value="' + details.deadlineID + '" readonly>\
                                        </div>\
                                    </div>\
                                    <input type="submit" class="form-submit" value="Payer">\
                                </form>\
                            </div>\
                        ').hide().appendTo("#contextual");
                    },
                    complete: function() {
                        endLoading("#contextual", function() { window.contextual_busy = false; });
                    }
                });
            });
        }
    });

    //-------------------------------------------------------------------------------------------------------

    $("#contextual").on("submit", "#payment-form", function(e) {
        e.preventDefault();

        var balance = parseInt($("#form-field-balance").val().replace(' E-FCFA',''));
        var amount = parseInt($("#form-field-amount").val().replace(' E-FCFA',''));
        if(balance >= amount) {
            window.contextual_busy = true;
            confirmBox("êtes-vous sûr de vouloir continuer?", "Annuler", "Continuer", "#contextual", function() {
                $("#contextual > .contextual-wrapper").fadeOut(200, function() {
                    $("#contextual").addClass("loading");
                    $.ajax({
                        method: "POST",
                        url: "http://3.86.66.87:3000/accomplishEcheance",
                        data: {
                            id : $("#form-field-deadline").val(),
                            amout : parseInt($("#form-field-amount").val().replace(' E-FCFA','')),
                            borrower : readCookie("wallet")
                        },
                        success: function(data) {
                            var deadlineID = $("#form-field-deadline").val();
                            $.ajax({
                                type: "POST",
                                url: "http://3.86.66.87:3000/getDeadlineInfo",
                                data: {
                                    id : deadlineID,
                                    borrower : readCookie("wallet")
                                },
                                success: function($details) {
                                    var $date = new Date($details.DateDeadline * 1000);
                                    $date = $date.toLocaleString((navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language, {
                                        day : 'numeric',
                                        month : 'short',
                                        year : 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });

                                    $("#contextual > .contextual-wrapper > header > h1").html('Détails de l\'opération');
                                    $("#contextual > .contextual-wrapper > header").append('<p class="success">Le payement a été effectué avec succès.<br/>Le hash de l\'opération est <span class="hash">' + data.transactionHash + '</span></p>');
                                    $("#payment-form").remove();

                                    $("#contextual > .contextual-wrapper").append('\
                                        <section class="details">\
                                            <div class="detail deadline-id">\
                                                <span class="detail-name">Identificateur de l\'échéance</span>\
                                                <span class="detail-value">' + deadlineID + '</span>\
                                            </div>\
                                            <div class="detail op-id">\
                                                <span class="detail-name">Identificateur de l\'opération</span>\
                                                <span class="detail-value">' + $details.id_op + '</span>\
                                            </div>\
                                            <div class="detail loan-id">\
                                                <span class="detail-name">Identificateur du crédit</span>\
                                                <span class="detail-value">' + $details.id_loan + '</span>\
                                            </div>\
                                            <div class="detail borrower">\
                                                <span class="detail-name">Bénéficiaire</span>\
                                                <span class="detail-value">' + readCookie("firstname") + " " + readCookie("lastname") + '</span>\
                                            </div>\
                                            <div class="detail date">\
                                                <span class="detail-name">Date d\'échéance</span>\
                                                <span class="detail-value">' + $date + '</span>\
                                            </div>\
                                            <div class="detail amount">\
                                                <span class="detail-name">Montant</span>\
                                                <span class="detail-value">' + $details.amount + '</span>\
                                            </div>\
                                        </section>\
                                    ');

                                    if($("#deadlines").find(".selected").hasClass("ongoing")) $("#deadlines").find(".selected").removeClass("ongoing");
                                    if($("#deadlines").find(".selected").hasClass("late")) $("#deadlines").find(".selected").removeClass("late");
                                    $("#deadlines").find(".selected").addClass("payed");

                                    $("#deadlines").find(".selected").attr("data-op-id", $details.id_op);
                                    $("#deadlines").find(".selected").children(':first-child').html("\
                                        <span class='date'>" + $date + "</span>\
                                        <span class='status payed'>échéance payée</span>\
                                        <span class='amount'>" + $details.amount + "</span>\
                                    ");
                                    $("#deadlines").find(".selected").children('.button').html("Voir les détails de l'échéance");
                                },
                                complete: function() {
                                    $("#contextual").removeClass("loading");
                                    $("#contextual > .contextual-wrapper").fadeIn(200, function() {
                                        window.contextual_busy = false;
                                        nice_contextual.resize();
                                    });
                                },
                                dataType: "json"
                            });
                        }
                    });
                });
            });
        }
    });
});