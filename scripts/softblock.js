chrome.storage.sync.get({
	blockedWebsites: ''
}, function(cache) {
	var websites = cache.blockedWebsites.match(/[^\r\n]+/g);

    chrome.webRequest.onBeforeRequest.addListener(
    	function(request) {
	        var url = request.url;

	        if(url.lastIndexOf('chrome-extension://', 0) === 0) {
				return {};
			}

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