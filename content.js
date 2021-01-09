{
    let audio_tags = document.getElementsByTagName("audio");
    let audio_regex = /.*\.mp3/;
    for (let i = 0; i < audio_tags.length; i++) {
        // If <audio> tag has mp3 source
        if (audio_regex.test(audio_tags[i].src)) {
            // Set audio_url
            chrome.storage.local.set({audio_url: audio_tags[i].src}, function() {
                console.log('Url is set to ' + audio_tags[i].src);
            });
            // Set audio_name
            let h1 = document.querySelectorAll('h1.podcasts__play-data_title')[0];
            chrome.storage.local.set({audio_name: h1.innerHTML}, function() {
                console.log('Audio_name is set to ' + h1.innerHTML);
            });
            break;
        }
    }
}