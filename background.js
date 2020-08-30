async function readConfiguration() {
    const p = new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(['teamcityUrl', 'teamcityToken', 'teamcityBuildTypeId'], function(data) {
                resolve(data);
            });
        } catch (e) {
            reject(e);
        }
        
    })
    return p;
}

chrome.runtime.onInstalled.addListener(function() {

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            
            switch (request.action) {
                case "getMatchedTab":
                    chrome.windows.getAll({populate:true},function(windows){
                        windows.forEach(function(window){
                          const urls = window.tabs.map(function(tab){
                            return tab.url;
                          });
                          sendResponse({urls});
                        });                        // console.log('Sent response: ' + urls)
                      });

                  break;
                default:
                  sendResponse({});
            }

            return true;
    });


    console.log('onInstalled()');

    chrome.browserAction.onClicked.addListener(function(tab) {

        console.log('onClicked()');

        (async () => {

            console.log('onClicked():async function')

            const { teamcityUrl, teamcityToken, teamcityBuildTypeId } = await readConfiguration()
            console.log('Send job to teamcity ', teamcityUrl, teamcityToken)
            console.log(tab)
            const { title, url, favIconUrl } = tab;

            const resp = await fetch(teamcityUrl + '/app/rest/buildQueue', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/xml',
                    'Authorization': 'Bearer ' + teamcityToken,
                },
                body: `<build>
                           <buildType id=\"${teamcityBuildTypeId}\"/>
                           <properties>
                           <property name=\"url\" value=\"${url}\"/>
                           </properties>
                        </build>`
            });

            const notification = new Notification(resp.ok ? 'Succeeded' : 'Failed', {
                body: title + '\n' + url,
                icon: favIconUrl
            });

            setTimeout(() => {
                notification.close();
                console.log('Closed notification')
            }, 2000);

            const text = await resp.text();
            console.log(text);
        })();
        
    });
});