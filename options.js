let saveBtn = document.getElementById('save');
let teamCityUrlInput = document.getElementById('teamcityUrl');
let teamCityTokenInput = document.getElementById('teamcityToken');
let teamcityBuildTypeIdInput = document.getElementById('teamcityBuildTypeId');
let matchedUrlsTextArea = document.getElementById('matchedUrls');

chrome.storage.sync.get(['teamcityUrl', 'teamcityToken', 'teamcityBuildTypeId'], function(data) {
    teamCityUrlInput.value = data.teamcityUrl;
    teamCityTokenInput.value = data.teamcityToken;
    teamcityBuildTypeIdInput.value = data.teamcityBuildTypeId;
});

saveBtn.addEventListener('click', (event) => {
    
    const teamcityUrl =  teamCityUrlInput.value;
    const teamcityToken = teamCityTokenInput.value
    const teamcityBuildTypeId = teamcityBuildTypeIdInput.value
    chrome.storage.sync.set({
        teamcityUrl,
        teamcityToken,
        teamcityBuildTypeId
    }, function() {
        console.log('Save configuration: ', teamcityUrl, teamcityToken);
      })
})


chrome.runtime.sendMessage({action: "getMatchedTab"}, function(response) {
    if( response != null && response != undefined ) {
        console.log(response.urls)
        matchedUrlsTextArea.value = response.urls.join('\n')
    }
});