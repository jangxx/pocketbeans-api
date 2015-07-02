var request = require('request');
var moment = require('moment');
var crypto = require('crypto');

var endpoint = process.argv[2];

var params = "537f94c69b86e95c";

var time = moment();
var str1 = moment(time).format('YYYY-MM-DDTHH:mm:ssZZ');
var nonce = params + str1 + "q2$B'b*p"; //nicht wirklich random, aber whatever
var nonceEncoded = new Buffer(nonce).toString('base64');
var str2 = new Buffer(sha1(nonce + str1 + "ev%cel,eV&dIj]Bycs]Ig@mEip)ij&")).toString('base64');

var wsseHeader = 'UsernameToken Username="lac0Von8hAp2Wyd8aT5G", PasswordDigest="' + str2 + '", Nonce="' + nonceEncoded + '", Created="' + str1 + '"';

var options = {
	url: 'http://api.rocketmgmt.de/' + endpoint,
	headers: {
		'X-WSSE': wsseHeader,
		'User-Agent': 'Apache-HttpClient/UNAVAILABLE (java 1.4)'
	}
};

request(options, function(err, resp, body) {
	try {
		console.log(JSON.parse(body));
	} catch(e) {
		console.log('JSON parse error');
	}
});

function sha1(str) {
	return crypto.createHash('sha1').update(str).digest('hex');
}
