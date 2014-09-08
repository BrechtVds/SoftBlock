window.addEventListener('load', function() {
	var url = document.URL;
	var parameter = '?softblocked=';

	var index = url.lastIndexOf(parameter);
	var url = url.substr(index + parameter.length);

	var btn = document.getElementById('unlock');

	btn.addEventListener('click', function() {
		var time = document.getElementById('time');
		var seconds = time.options[time.selectedIndex].value;

		var unlockUntil = Date.now() + seconds*1000;

		chrome.storage.sync.set({
    		unlockUntil: unlockUntil
  		}, function() {
  			// Update listener
  			var bgPage = chrome.extension.getBackgroundPage();
  			bgPage.update();

  			// Redirect to original target URL
  			window.location = url;
  		});

  		return false;
	});
});