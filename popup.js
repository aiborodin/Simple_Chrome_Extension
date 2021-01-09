let downloadAudio = document.getElementById('downloadAudio');
downloadAudio.onclick = function (element) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'content.js'},
            // Downloading starts after content.js updates audio_url and audio_name variables
            function (args) {
                chrome.storage.local.get(['audio_url', 'audio_name'], function (data) {
                    // For debugging extracted data
                    // chrome.runtime.getBackgroundPage(window => {
                    //     window.console.log(data);
                    // });
                    if (data.audio_url) {
                        chrome.downloads.download({
                                url: data.audio_url,
                                filename: data.audio_name + ".mp3"
                            },
                            function (downloadId) {
                                chrome.runtime.getBackgroundPage(window => {
                                    window.console.log("Downloading has begun, the downloadId is: " + downloadId);
                                });
                                // Remove last extracted data for correct next condition checking
                                chrome.storage.local.remove(['audio_url', 'audio_name']);
                            });
                    } else {
                        chrome.tabs.executeScript(
                            tabs[0].id,
                            {code: 'alert("Аудио файл не был найден на этой странице. Попробуйте изменить страницу.");'}
                        );
                    }
                });
            }
        );
    });
};