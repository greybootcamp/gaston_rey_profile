var form = document.getElementsByName("developer-contact")[0];

var nameInput = document.getElementById("name");
var surnameInput = document.getElementById("surname");
var emailInput = document.getElementById("email");
var requestTextarea = document.getElementById("service-request");
var domainInput = document.getElementsByName("actual-project-domain");
var dueDate = document.getElementById("due-date");
var phone = document.getElementById("phone-number");

var actualDomainUrl = document.createElement("input");
actualDomainUrl.setAttribute("id", "domainUrl");
actualDomainUrl.setAttribute("type", "text");
actualDomainUrl.setAttribute("name", "domain-url");
actualDomainUrl.setAttribute("placeholder", "Project Url");
actualDomainUrl.setAttribute("required", "");
actualDomainUrl.setAttribute("tabindex", "-1");

for (var i = 0; i < domainInput.length; i++) {
  domainInput[i].addEventListener("click", function(event) {
    if (this.value == "yes") {
      this.parentNode.appendChild(actualDomainUrl);
    } else {
      if (document.getElementById("domainUrl")) {
        this.parentNode.removeChild(actualDomainUrl);
        actualDomainUrl = null;
      }
    }
  });
}

form.addEventListener("submit", function(event) {
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

  var phoneRegex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
  var isPhoneCorrect = phoneRegex.test(phone.value);

  if (isPhoneCorrect === false) {
    sendNotification("Invalid Field", "Phone number is not correct");
    phone.focus();
    event.preventDefault();
    return false;
  }

  if (requestTextarea.checkValidity() === false || empty(requestTextarea)) {
    sendNotification("Invalid Field", "Text shoudn't be blank");
    requestTextarea.focus();
    event.preventDefault();
    return false;
  }

  //   Checking if content respects the max words on it
  var wordsLength = countWordsINTEXT(requestTextarea.value);
  var nWords = document.createElement("p");
  nWords.setAttribute("id", "num-of-words");
  nWords.setAttribute("name", "words-counter");
  nWords.innerText = "* Maximum 150 words.";

  if (wordsLength > 150) {
    if (document.getElementById("num-of-words") === null) {
      requestTextarea.parentNode.appendChild(nWords);
    }
    sendNotification("Max Exceeded", "This field is limited to 150 words");
    requestTextarea.focus();
    event.preventDefault();
    return false;
  }

  if (dueDate.checkValidity() === false) {
    sendNotification("Invalid Field", "Provide a valid date");
    dueDate.focus();
    event.preventDefault();
    return false;
  }

  if (document.getElementById("domainUrl") !== null) {
    if (actualDomainUrl.checkValidity() == false || empty(actualDomainUrl)) {
      sendNotification(
        "Invalid Field",
        "Please, specify your actual project URL"
      );
      actualDomainUrl.focus();
      event.preventDefault();
      return false;
    }
  }

  submitButton.setAttribute("disabled", "");
  event.preventDefault();

  setTimeout(function() {
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
  }

  return false;
}

function countWordsINTEXT(text) {
  // Cleaning up double spaces and others
  cleanedText = text.replace(/(^\s*)|(\s*$)/gi, "");
  cleanedText = text.replace(/[ ]{2,}/gi, " ");
  cleanedText = text.replace(/\n /, "\n");

  return cleanedText.split(" ").length;
}
