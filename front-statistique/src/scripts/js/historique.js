window.contextual_busy = false;

if((readCookie("firstname") == undefined) || (readCookie("firstname") == null)) window.location.replace("index.html");
else $(document).ready(function() {
    startLoading("#content", 0, function() {
        $.ajax({
            type: "POST",
            url: "http://3.86.66.87:3002/getTransferInfo/sender",
            data: {
                sender: readCookie("wallet")
            },
            success: function(data) {
                if(data != "aucun transfert effectué")
                    $.each(data, function(i, entry) {
                        $.ajax({
                            type: "POST",
                            url: "http://3.86.66.87:3007/getAdherentbyAdrr",
                            data: {
                                wallet: entry["_reciver"]
                            },
                            success: function($receiver) {
                                var date = new Date(entry["_TransferDate"] * 1000);
                                var $date = date.toLocaleString((navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language, {
                                    day : 'numeric',
                                    month : 'short',
                                    year : 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                $("#history").prepend("\
                                    <div class='entry' data-id='" + entry["_idOp"] + "' data-timestamp='" + entry["_TransferDate"] + "' data-hash='" + entry["_transaction_hash"] + "'>\
                                        <div>\
                                            <span class='date'>" + $date + "</span>\
                                            <div>Transfer de <span class='amount'>" + entry["_amount"] + "</span> de <span class='sender'>" + entry["_fnamesender"] + " " + entry["_namesender"] + "</span> à <span class='receiver'>" + $receiver.firstname + " " + $receiver.lastname + "</span></div>\
                                        </div>\
                                        <div class='button'>Détails de l'opération</div>\
                                    </div>\
                                ");
                            },
                            dataType: "json"
                        });
                    });
            },
            dataType: "json"
        });
    });
    
    $(document).ajaxStop(function () {
        $(this).unbind("ajaxStop");
        
        $("#history").find(".entry").sort(function(a,b) {
             return b.dataset.timestamp - a.dataset.timestamp;
        }).appendTo("#history");
        
        endLoading("#content");
    });
    
    //-------------------------------------------------------------------------------------------------------

    $("#history").on("click", ".entry", function() {
        if(!$(this).hasClass("selected") && !window.contextual_busy) {
            window.contextual_busy = true;
            
            var $this = $(this);
            $this.siblings().removeClass("selected");
            $this.addClass("selected");

            startLoading("#contextual", 200, function() {
                $("#contextual").children().remove();

                var details = {
                    date: $this.find(".date").html(),
                    sender: $this.find(".sender").html(),
                    receiver: $this.find(".receiver").html(),
                    amount: $this.find(".amount").html(),
                    id: $this.data("id"),
                    hash: $this.data("hash")
                }
                $('\
                    <div class="contextual-wrapper">\
                        <header>\
                            <h1>Détails de l\'opération</h1>\
                        </header>\
                        <section class="details">\
                            <div class="detail id">\
                                <span class="detail-name">Identificateur de l\'opération</span>\
                                <span class="detail-value">' + details.id + '</span>\
                            </div>\
                            <div class="detail date">\
                                <span class="detail-name">Date et heure de l\'opération</span>\
                                <span class="detail-value">' + details.date + '</span>\
                            </div>\
                            <div class="detail sender">\
                                <span class="detail-name">Expéditeur</span>\
                                <span class="detail-value">' + details.sender + '</span>\
                            </div>\
                            <div class="detail receiver">\
                                <span class="detail-name">Receveur</span>\
                                <span class="detail-value">' + details.receiver + '</span>\
                            </div>\
                            <div class="detail amount">\
                                <span class="detail-name">Montant</span>\
                                <span class="detail-value">' + details.amount + '</span>\
                            </div>\
                            <div class="detail hash">\
                                <span class="detail-name">Hash de l\'opération</span>\
                                <span class="detail-value">' + details.hash + '</span>\
                            </div>\
                        </section>\
                    </div>\
                ').hide().appendTo("#contextual");

                endLoading("#contextual", function() { window.contextual_busy = false; });
            });
        }
    });
});