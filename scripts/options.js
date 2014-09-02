// Saves options to chrome.storage
function save_options() {
  var websites = document.getElementById('websites').value;

  chrome.storage.sync.set({
    blockedWebsites: websites,
    unlockUntil: 0
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);

    // Update listener
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.update();
  });
}

function restore_options() {
  chrome.storage.sync.get({
    blockedWebsites: ''
  }, function(items) {
    document.getElementById('websites').value = items.blockedWebsites;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);