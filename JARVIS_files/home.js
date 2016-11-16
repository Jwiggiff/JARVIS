var featureDisplay;
var featureUnderline;
var features = ["utility commands", "fun commands", "poll/voting system", "music commands"];
var featureID = 0;

function updateFeature() {
  var pushinFeatureDisplay = featureDisplay.clone();
  pushinFeatureDisplay.appendTo(featureDisplay.parent());
  pushinFeatureDisplay.text(features[featureID]);
  pushinFeatureDisplay.css("opacity", 0);
  pushinFeatureDisplay.css("margin-left", -pushinFeatureDisplay.width());
  pushinFeatureDisplay.animate({
    opacity: 1,
    marginLeft: -(pushinFeatureDisplay.width() * 0.5)
  }, 1000);
  var oldFeatureUnderline = featureUnderline.clone();
  oldFeatureUnderline.prependTo(featureUnderline.parent());
  oldFeatureUnderline.animate({
    width: 0
  }, 1000);
  featureUnderline.prependTo($(".feature-box")[featureID]);
  featureUnderline.css("width", 0);
  featureUnderline.animate({
    width: featureUnderline.parent().find(".feature-title").first().innerWidth()
  }, 1000);
  featureDisplay.animate({
    opacity: 0,
    marginLeft: (pushinFeatureDisplay.width() * 0.25)
  }, 1000, function() {
    featureDisplay.text(features[featureID++]);
    if (featureID >= features.length) featureID = 0;
    featureDisplay.css("opacity", 1);
    featureDisplay.css("margin-left", -(pushinFeatureDisplay.width() * 0.5));
    pushinFeatureDisplay.remove();
    oldFeatureUnderline.remove();
  });
}
var lastServerCount = 0;


function updateServers() {
  console.log('updating server count...');

  $.get("https://raw.githubusercontent.com/jwiggiff/JARVIS/gh-pages/api.json",function(data){
    var serverCount=data.text.serverCount;
    console.log(data.text);
    console.log(serverCount);
    if(serverCount<=lastServerCount){return;}
    else{lastServerCount=serverCount;}
    $("#server-count").html(serverCount);
  });

  /*
  $.getJSON('https://raw.githubusercontent.com/jwiggiff/JARVIS/gh-pages/api.json', function(data) {
    var serverCount = data.serverCount;
    if (serverCount <= lastServerCount) {
      return;
    } else {
      lastServerCount = serverCount;
    }
    console.log(serverCount);
    $("#server-count").html(serverCount);
  });
  */
}


$(document).ready(function() {
  featureDisplay = $("#feature-display");
  featureUnderline = $("<div class='feature-underline'></div>");
  new Odometer({el:document.querySelector("#server-count"),value:0});
  setTimeout(updateFeature, 1000);
  setInterval(updateFeature, 2500);
  setTimeout(updateServers, 500);
  setInterval(updateServers, 2500);
});
