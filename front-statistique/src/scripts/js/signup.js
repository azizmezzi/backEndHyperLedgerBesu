if((readCookie("firstname") != "undefined") && (readCookie("firstname") != "")) window.location.replace("home.html");
else $(document).ready(function() {
    var $form = $("#signup-form");
    var $fields = $form.find(".form-fields .field");

    $form.submit(function(e) {
        e.preventDefault();

        $form.find(".error").removeClass("error");

        $fields.each(function() {
            var $field = $(this);
            if($field.val() == "") $field.parent().addClass("error");
        });

        if($form.find(".error").length == 0) {

        }
    });
});