let saveBtn = document.getElementById('save');
let teamCityUrlInput = document.getElementById('teamcityUrl');
let teamCityTokenInput = document.getElementById('teamcityToken');
let teamcityBuildTypeIdInput = document.getElementById('teamcityBuildTypeId');
let matchedUrlsTextArea = document.getElementById('matchedUrls');
let matchPatternInput = document.getElementById('matchPattern')
let submitAllButton = document.getElementById('submitAll')

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
});

submitAllButton.addEventListener('click', (event) => {
    const text = matchedUrlsTextArea.value;
    const urls = text.split('\n');
    chrome.runtime.sendMessage({
        action: "submitAll",
        urls
    }, function(response) {
        if( response != null && response != undefined ) {
            console.log('Submitted all');
        }
    });
});


chrome.runtime.sendMessage({action: "getMatchedTab"}, function(response) {
    if( response != null && response != undefined ) {
        const urls = response.urls;
        const pattern = matchPatternInput.value;
        let re = new RegExp(pattern);
        const filteredUrls = urls.filter(url => re.test(url))

        matchedUrlsTextArea.value = filteredUrls.join('\n');
    }
});