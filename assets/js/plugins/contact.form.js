/**
 *
 * -----------------------------------------------------------------------------
 *
 * Template : Reeni Personal Portfolio HTML Template
 * Author : themes-park
 * Author URI : https://themes-park.com/ 
 *
 * -----------------------------------------------------------------------------
 *
 **/

(function ($) {
    'use strict';

    $('.tmp-dynamic-form').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var formMessages = form.find('#form-messages').length ? form.find('#form-messages') : $('#form-messages');

        // Form data serialize
        var formData = form.serialize();

        // Dynamically update subject if name is present
        var nameVal = form.find('input[name="name"]').val();
        if (nameVal && form.find('input[name="subject"]').length) {
            formData = formData.replace(/subject=[^&]*/, "subject=" + encodeURIComponent("New Lead from " + nameVal));
        }

        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            dataType: 'json'
        })
            .done(function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank You!',
                        text: response.message || 'Your message has been sent successfully.',
                        confirmButtonColor: '#3085d6'
                    });
                    // ইনপুট ফিল্ড ক্লিয়ার করা
                    form.find('input, textarea').val('');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.message || 'Something went wrong!',
                        confirmButtonColor: '#d33'
                    });
                }
            })
            .fail(function (data) {
                var errorMsg = 'Oops! An error occurred and your message could not be sent.';
                var errorResponse = data.responseJSON;
                if (errorResponse && errorResponse.message) {
                    errorMsg = errorResponse.message;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMsg,
                    confirmButtonColor: '#d33'
                });
            });
    });

})(jQuery);
