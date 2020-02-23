; (function (bili) {
	"use strict";
	var converts = [
		{ // Video
			from: /<a href="(?:https?:\/\/)?(?:www\.)?bilibili\.(?:tv|com)\/video\/av(\d+).*?">.+<\/a>/g,
			to: '<div class="embed-responsive embed-responsive-16by9">' +
				'<iframe src="//player.bilibili.com/player.html?aid=$1&as_wide=1 style=\"border:0;height:100%;left:0;position:absolute;width:100%\" allowfullscreen=\"true\" scrolling=\"no\" ></iframe></div>'
		},
		{
			// b23 video (short url)
			// eg: https://b23.tv/av*****
			from: /<a href="(?:https?:\/\/)?(?:www\.)?b23\.(?:tv|com)\/av(\d+).*?">.+<\/a>/g,
			to: '<div class="embed-responsive embed-responsive-16by9">' +
				'<iframe allowfullscreen="true" scrolling="no" src="//player.bilibili.com/player.html?aid=$1&as_wide=1" ' +
				'style="border:0;height:100%;left:0;position:absolute;width:100%"></iframe></div>'
		}
	];

	// 这个干嘛的,我也不知道raw和下面的post的区别
	bili.parseRaw = function (data, callback) {
		try {
			for (var i = 0; i < converts.length; i++)
				data=data.replace(converts[i].from, converts[i].to);
			callback(null, data);
		} catch (ex) {
			callback(ex, data);
		}
	};

	bili.parse= function (data, callback) {
		try {
			for (var i = 0; i < converts.length; i++)
				data.postData.content = data.postData.content.replace(converts[i].from, converts[i].to);
			callback(null, data);
		} catch (ex) {
			callback(ex, data);
		}
	};

	bili.updateSanitizeConfig =async (config) =>{

		config.allowedAttributes.iframe.push('allowfullscreen');

		return config;


	}

})(module.exports);