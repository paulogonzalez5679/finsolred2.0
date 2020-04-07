    // -------   Mail Send ajax

    $(window).on("load", function() {
        var form = $('#contact-form'); // contact form
        // form submit event
        form.on('submit', function(e) {

            $('#contact-form').find('.messages').html('<p> Enviando correo...</p>');

            var url = "/post";
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function(data) {
                    var messageText = data.message;
                    var alertBox = '<div class="alert alert-success alert-dismissable fade show"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                },
                error: function(data) {
                    var msg = '';
                    if (data.responseJSON) {
                        msg = data.responseJSON.message;
                    } else {
                        msg = 'Servidor no disponible';
                    }
                    var alertBox = '<div class="alert alert-danger alert-dismissable fade show"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ' + msg + ' </div>';
                    $('#contact-form').find('.messages').html(alertBox);
                },

            });
            return false;
        });
    });