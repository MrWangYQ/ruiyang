'use strict';

function ShowRtc() {
    console.log('rtc');
}




// 读取相关 DOM 结构
let videoElement = document.getElementById('WebRtcVideo');
let webRtcTips = document.getElementsByClassName('tips')[0];
let audioSelect = document.querySelector('#audioSource');
let videoSelect = document.querySelector('#videoSource');

// 切换选项更新 音频 视频流
audioSelect.onchange = getStream;
videoSelect.onchange = getStream;


// 读取设备 音频 视频 配置
navigator.mediaDevices.enumerateDevices()
    .then(getDevices).then(getStream).catch(handleError);

function getDevices(deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
        let deviceInfo = deviceInfos[i];
        let option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
            const audioLable = deviceInfo.label ||
                'microphone ' + (audioSelect.length + 1);
            option.text = audioLable;
            audioSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            const videoLabel = deviceInfo.label || 'camera ' +
                (videoSelect.length + 1);
            option.text = videoLabel;
            videoSelect.appendChild(option);
        } else {
            // console.log('Found one other kind of source/device: ', deviceInfo);
        }
    }
}

function getStream() {
    if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
    const constraints = {
        audio: {
            deviceId: {
                exact: audioSelect.value
            }
        },
        video: {
            deviceId: {
                exact: videoSelect.value
            }
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
}

function handleSuccess(stream) {
    webRtcTips.style.display = 'none';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    window.stream = stream; // only to make stream available to console
    videoElement.srcObject = stream;
}

function handleError(error) {
    // console.log('getUserMedia Error: ', error);
}