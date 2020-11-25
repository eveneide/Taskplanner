//legg inn js her fra filene etter at koden er god nok
var FormValidation = function () {

    var processForm = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

        var formCategory = $('#taskForm');
    

        formCategory.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            onkeyup: false, //turn off auto validate whilst typing
            rules: {
                inpTitle: {
                    required: true
                },
                inpTask: {
                    required: false
                }
            },
            messages: {
                inpTitle: {
                    required: "Det feltet er obligaotirsk."
                }
            },
            debug: true,

            invalidHandler: function (event, validator) { //display error alert on form submit
                
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            submitHandler: function (form) {

                console.log('Kommer vi inn her ?');

                var inpTitle = $('#inpTitle').val();
                var inpTask = $('#inpTask').val();

            
                $.ajax({
                    url: "http://localhost:8080/task",
                    type: "POST",
                    data: "inpTitle="+inpTitle+"&inpTask="+inpTask,
                    dataType: 'json',
                    success: function(data)
                    {
                        console.log(data);
                    }

                });


                return false;
            }

        });
    };

    return {
        //main function to initiate the module
        init: function () {
            processForm();
        }

    };

}();