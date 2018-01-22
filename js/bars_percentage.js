var horizontal_progress_bars = document.getElementsByClassName('progress-fill');
    
Array.prototype.forEach.call(horizontal_progress_bars, function(el) {
    var percent = el.children[0].getAttribute("data");
    el.style.width = percent + '%';
});
  


window.onload = function() {
    horizontal_progress_bars;

    
}