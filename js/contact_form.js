var form = document.getElementsByName("developer-contact")[0];

var nameInput = document.getElementById("name")
var surnameInput = document.getElementById("surname");
var emailInput = document.getElementById("email");
var requestTextarea = document.getElementById("service-request");
var domainInput = document.getElementsByName("actual-project-domain");

var actualDomainUrl = document.createElement("input");
actualDomainUrl.setAttribute("id", "domainUrl");
actualDomainUrl.setAttribute("type", "text");
actualDomainUrl.setAttribute("name", "domain-url");
actualDomainUrl.setAttribute("placeholder", "Project Url");
actualDomainUrl.setAttribute("required", "");
actualDomainUrl.setAttribute("tabindex", "-1");



for (var i = 0; i < domainInput.length; i++) {
    domainInput[i].addEventListener('click', function (event) {
        
        if (this.value == 'yes') {
            this.parentNode.appendChild(actualDomainUrl);
        } else {
            if (document.getElementById("domainUrl")) {
                this.parentNode.removeChild(actualDomainUrl);
            }
        }
    });
}

form.addEventListener("submit", function (event) {
    if (nameInput.checkValidity() === false || empty(nameInput)) {
        sendNotification("Invalid Field", "A valid name is required");
        nameInput.focus();
        event.preventDefault();
        return false;
    }

    if (surnameInput.checkValidity() === false || empty(surnameInput)) {
        sendNotification("Invalid Field", "A valid surname is required");
        surnameInput.focus();
        event.preventDefault();
        return false;
    }

    var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
    var resultEmailValidation = regex.test(emailInput.value);

    if (resultEmailValidation === false) {
        sendNotification("Invalid Field", "A valid mail is required");
        emailInput.focus();
        event.preventDefault();
        return false;
    }

    if (requestTextarea.checkValidity() === false || empty(requestTextarea)) {
        sendNotification("Invalid Field", "Text shoudn't exceed the 250 characters");
        requestTextarea.focus();
        event.preventDefault();
        return false;
    }

    if(document.getElementsByName("domain-url")) {
		if(actualDomainUrl.checkValidity() == false || empty(actualDomainUrl)){
			sendNotification("Invalid Field", "Please, specify your actual project URL")
			actualDomainUrl.focus();
			event.preventDefault();
			return false;
		}
	}

    submitButton.setAttribute("disabled", "");
    event.preventDefault();

    setTimeout(function () {
        form.reset();
        sendNotification("Form has been successfully sent, Thanks!");
        submitButton.removeAttribute("disabled");
    }, 1000);
});

function empty(input) {
    var value;
    value = input.value;
    if (value.trim() === "" || value === null) {
        return true;
    };

    return false;
}