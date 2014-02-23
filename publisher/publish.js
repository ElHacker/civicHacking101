$(function() {

  // Returns a random integer between min and max
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Appends a new log entry
  var appendLogEntry = function(data) {
    $("<p>", {
      "class": "log-entry",
      "html": JSON.stringify(data)
    }).appendTo("div.log");
  }

  // POST data to CKAN's DataStore API
  var postToDataStore = function(dataToPost) {
    var baseURL = "http://datamx.io/api/3/action";
    var endPoint = "/datastore_create";
    var url = baseURL + endPoint;

    var dataToPostFields = [];
    for (var key in dataToPost) {
      if (dataToPost.hasOwnProperty(key)) {
        dataToPostFields.push({"id": key});
      }
    }

    var dataToPostValues = [];
    for (var key in dataToPost) {
      if (dataToPost.hasOwnProperty(key)) {
        dataToPostValues.push(dataToPost[key]);
      }
    }
    console.log(dataToPostValues);

    $.ajax({
      url: url,
      type: "post",
      crossDomain: true,
      dataType: "json",
      headers: {
        "Authorization": "7d85d965-67e5-4955-9706-46a5416b3ccc",
        "Content-type": "json"
      },
      data: JSON.stringify({
             "resource_id" : "1d9416f3-3c7e-44d7-836c-9476d424b787",
             "force": true,
             "fields": dataToPostFields,
             "records": dataToPostValues
           }),
      success: function(data, textStatus) {
        console.log(data);
        console.log(textStatus);
      }
    })
    .fail(function(error) {
      console.log(error);
      console.log("OOPS!");
    });
  }

  // Publishes random generated data to CKAN
  var publish = function publish(event) {
    if (typeof event !== "undefined") {
      event.preventDefault();
    }
    var carCrashes = {
      "monterrey": getRandomInt(0, 20),
      "san pedro": getRandomInt(0, 20),
      "guadalupe": getRandomInt(0, 20),
      "escobedo": getRandomInt(0, 20),
      "san nicolas": getRandomInt(0, 20),
      "apodaca": getRandomInt(0, 20),
    };

    // Create a log of generated values
    appendLogEntry(carCrashes);

    // Post the generated data to DataMX.io
    postToDataStore(carCrashes);

    // call it again in 5 seconds
    setTimeout(publish, 5000);
  }

  var initApplication = function () {
    var $publishButton = $("a.publish").on("click", publish);
  };

  initApplication();
});
