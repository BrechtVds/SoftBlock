var currentCallback;

function startListening() {
	chrome.storage.sync.get({
		blockedWebsites: '',
		unlockUntil: 0
	}, function(cache) {
		var websites = cache.blockedWebsites.match(/[^\r\n]+/g);

	    chrome.webRequest.onBeforeRequest.addListener(function(request) {
	    	currentCallback = arguments.callee;
			var url = request.url;

		    // Don't block chrome extension pages
		    if(url.lastIndexOf('chrome-extension://', 0) === 0) {
				return {};
			}

			// Ignore SoftBlock set
			if(cache.unlockUntil > Date.now()) {
				return {};
			}

			// Check if this url should be locked
			for(var i=0, l=websites.length; i<l; i++) {
		    	if(url.indexOf(websites[i]) != -1) {
		    		var redirect = chrome.extension.getURL("html/redirect.html");
		    		redirect = redirect + '?softblocked=' + url;

		    		return {redirectUrl: redirect};
		    	}
		    }

		    return {};
		},
		{urls: ["<all_urls>"]},
		["blocking"]);
	});
}

function update() {
    if (typeof currentCallback === "function") {
        chrome.webRequest.onBeforeRequest.removeListener(currentCallback);
        currentCallback = null;
    }

    startListening();
}

update();