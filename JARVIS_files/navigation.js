Navigate = {};
Navigate.getState = function() {
  return $.extend({}, history.state);
}
Navigate.updateState = function(state, replace) {
  var method = (replace ? "replace" : "push");
  var title = undefined;
  var path = (state.path || "");
  var hash = (state.hash || "");
  history[method + "State"](state, title, path + (hash ? "#" + hash : ""));
  $("#ogurl").attr("content", window.location.href);
}
var DEFAULT_TAB = "home";
var pageContent;
var contentCache;
var slider;
var tabs;
var currentTab;

function titleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function sliderPosition(position, width) {
  return {
    top: position.top + 44,
    left: position.left
  };
}

function animateSlider(position, width) {
  var position = sliderPosition(position, width);
  slider.animate({
    left: position.left,
    width: width
  });
}

function getTab(tabName) {
  var tab = $("#tab-" + tabName.toLowerCase());
  return (tab.length > 0 ? tab : undefined);
}

function fetchTab(tabName, page) {
  var tab = $("#tabcontent-" + tabName.toLowerCase());
  if (tab.length > 0) return tab;
  tab = $("<div class='tab-content' id='tabcontent-" + tabName.toLowerCase() + "'></div>");
  tab.appendTo(contentCache);
  tab.load("/JARVIS/" + page.toLowerCase() + ".html");
  return tab;
}

function setCurrentTab(tab, pushState, replaceState) {
  tabName = currentTab.attr("id").substring(4);
  var state = Navigate.getState();
  state.page = tabName;
  if(tabName=='home') state.path = "/JARVIS/";
  else state.path = "/JARVIS/" + tabName;
  state.hash = "";
  if (pushState) Navigate.updateState(state, replaceState);
  var tab = fetchTab(tabName, currentTab.data("page"));
  pageContent.animate({
    opacity: 0
  }, function() {
    pageContent.children(":not(#tabcontent-" + tabName + ")").appendTo(contentCache);
    tab.appendTo(pageContent);
    $(document).trigger("pageUpdate");
    setTimeout(function() {
      pageContent.animate({
        opacity: 1
      }, reloadSlider);
    }, 100);
  });
}

function loadTab(tab, pushState) {
  if (tab.get(0) === currentTab.get(0)) return;
  currentTab.removeClass("current-tab");
  currentTab = tab;
  currentTab.addClass("current-tab");
  animateSlider(currentTab.offset(), currentTab.outerWidth());
  setCurrentTab(tab, pushState);
}
window.onpopstate = function(event) {
  var tab = getTab(event.state.page);
  if (tab) loadTab(tab);
}

function reloadSlider() {
  if (!currentTab || !slider) return;
  var position = sliderPosition(currentTab.offset(), currentTab.outerWidth());
  slider.offset(position);
  slider.width(currentTab.outerWidth());
}

function navTab(name) {
  loadTab(tabs.filter("[data-page='" + name + "']"), true);
}
$(window).resize(reloadSlider);
$(document).ready(function() {
  console.log('josh');
  var state = Navigate.getState();
  var path = window.location.pathname;
  var page = path.split("/")[1];
  var hash = window.location.hash.substring(1);
  var replaceState = false;
  var pageExists = !!getTab(page);
  if (page && pageExists) page = page.toLowerCase();
  else page = DEFAULT_TAB;
  if (!pageExists) replaceState = true;
  state.path = path;
  state.page = page;
  state.hash = hash;
  Navigate.updateState(state, replaceState);
  pageContent = $("#page-content");
  contentCache = $("#content-cache");
  slider = $("#tabs-slider");
  tabs = $(".nav-tabs li");
  currentTab = getTab(page);
  setTimeout(reloadSlider, 100);
  setCurrentTab(currentTab);
  tabs.click(function() {
    loadTab($(this), true);
  });
});
