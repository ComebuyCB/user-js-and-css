function _skipAds(){
	console.log('偵測廣告中~')
	
	// Skip廣告
	$('body #player-container .ytp-ad-skip-button').trigger('click')
	let adSkip = $('body #player-container .ytp-ad-skip-button')
		adSkip.trigger('click')
	if ( adSkip.length > 0 ){
		console.log( '關閉 Skip廣告!' )
	}
	
	// 彈窗廣告
	let adBox = $('body #player-container .ytp-ad-overlay-close-button')
		adBox.trigger('click')
	if ( adBox.length > 0 ){
		console.log( '關閉 彈窗廣告!' )
	}
	
	// 倒數廣告
	let adText = $('body #player-container .ytp-ad-preview-text').text()
	let $video = $('body #player-container .html5-main-video')
	if ( ( adText.indexOf('影片將在') > -1 || adText.indexOf('秒後結束') > -1 ) && $video[0].currentTime < $video[0].duration ){
		$video[0].currentTime = $video[0].duration
	}
	if ( adText.length > 0 ){
		console.log( '關閉 倒數廣告!' )
	}
}

_skipAds()
setInterval( _skipAds, 50)