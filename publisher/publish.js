$(function() {

  // Returns a random integer between min and max
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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
    console.dir(carCrashes);
    // call it again in 5 seconds
    setTimeout(publish, 5000);
  }

  var initApplication = function () {
    var $publishButton = $("a.publish").on("click", publish);
  };

  initApplication();
});
