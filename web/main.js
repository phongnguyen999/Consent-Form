
(function($) {

  $('#reset').on('click', function(){
      $('#register-form').reset();
  });
  
  
  $("#phone_number").keydown(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
            var curchr = this.value.length;
            var curval = $(this).val();
            if (curchr == 3 && e.which != 8 && e.which != 0) {
                $(this).val(curval + "-");
            } else if (curchr == 7 && e.which != 8 && e.which != 0) {
                $(this).val(curval + "-");
            }
            $(this).attr('maxlength', '12');
        });

  $('#register-form').validate({
    rules : {
        name : {
            required: true,
        },
        lname : {
            required: true,
        },
        sign : {
            required: true,
        },
        phone_number : {
            required: true,
        },
        checkbox1 : {
            required: true,
        },
        checkbox2 : {
            required: true,
        },
        checkbox3 : {
            required: true,
        },
    },
    onfocusout: function(element) {
        $(element).valid();
    },
    submitHandler: function() { 
            generateQRCode();
            return false; // return true will submit form
            },
    invalidHandler: function(form, validator) {
        var errors = validator.numberOfInvalids();
            if (errors) {
                if (validator.errorList.length > 0) {
                    for (x=0;x<validator.errorList.length;x++) {
                        errors += validator.errorList[x].message;
                    }
                }
            generateQRCode();
        }
    }
});


    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });
})(jQuery);


function generateQRCode() {
	var name = document.getElementById("name").value
    var phone = document.getElementById("phone_number").value
    var sign = document.getElementById("sign").value
    var check1 = document.getElementById("checkbox1").value
    var lname = document.getElementById("lname").value
    if (name != '' && lname != '' && phone != '' && sign != '') {
        if(validateCheckbox()){
            eel.generate_qr(name,phone,sign,check1,lname)(clearTxt)
            swal({
            timer: 3000,
            title: "Thank You!",
            text: "Your submission has been received",
            icon: "success",
        });
        
        }
        else{
            swal({
            title: "Please check all boxes that apply!",
            text: "Please try again",
            icon: "warning",
        });
        }
        
    }
    else{
        swal({
            title: "All fields are required!",
            text: "Please try again",
            icon: "error",
        });
    }
    
	
}


function validateCheckbox()
{
    var c=document.getElementsByTagName('input');
    for (var i = 0; i<c.length; i++){
        if (c[i].type=='checkbox')
        {
            if (c[i].checked){return true}
        }
    }
    return false;
}

function clearTxt() {
	document.getElementById("name").value = ''
    document.getElementById("lname").value = ''
    document.getElementById("phone_number").value = ''
    document.getElementById("sign").value = ''
}


function forceInputUppercase(e){
    var charInput = e.keyCode;
    if((charInput >= 97) && (charInput <= 122)) { // lowercase
      if(!e.ctrlKey && !e.metaKey && !e.altKey) { // no modifier key
        var newChar = charInput - 32;
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) + String.fromCharCode(newChar) + e.target.value.substring(end);
        e.target.setSelectionRange(start+1, start+1);
        e.preventDefault();
      }
    }
}

document.getElementById("name").addEventListener("keypress", forceInputUppercase, false);
document.getElementById("lname").addEventListener("keypress", forceInputUppercase, false);
document.getElementById("sign").addEventListener("keypress", forceInputUppercase, false);