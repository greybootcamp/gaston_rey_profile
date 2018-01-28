function sendNotification(title, body) {
  var notification = Notification || mozNotification || webkitNotification;

  if (body) {
    var options = {
      body: body
    };
  }

  if ("undefined" === typeof notification) {
    console.warn("Web notification not supported");
  } else {
    notification.requestPermission(function(permission) {
      if (Notification.permission === "granted") {
        new Notification(title, options);
      }
    });
  }
}
