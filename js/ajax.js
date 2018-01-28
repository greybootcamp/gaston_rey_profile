var form = document.getElementsByName("contacto")[0];

var xhr = new XMLHttpRequest();

var API_ENDPOINT = "http://localhost:8000/api/";

function submitForm(form) {
  var data = {
    form: form
  };
  makeRequest("POST", API_ENDPOINT + "task", data, function() {
    console.log("Form submitted successfully!!");
  });
}

function makeRequest(method, url, body, callbackSuccess) {
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 2 && xhr.status !== 201) {
      callbackSuccess(xhr.responseText);
    }
  };

  if (body) {
    xhr.send(body["form"]);
  } else {
    xhr.send();
  }
}
