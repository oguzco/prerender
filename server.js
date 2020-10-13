const prerender = require('prerender'); //const server = prerender();
const child_process = require('child_process');

var server = prerender({
        chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu','--remote-debugging-port=9222', '--hide-scrollbars'],
        pageDoneCheckInterval: 50,
        blacklistedDomains: ['embed.tawk.to','cdn.jsdelivr.net','static-v.tawk.to','va.tawk.to','portalv3.s3.eu-central-1.amazonaws.com','www.googletagmanager.com','fonts.googleapis.com'],
        pageLoadTimeout: 30 * 1000,
        waitAfterLastRequest: 1000,
        followRedirects: true
});

const cacheModule =  require('prerender-memory-cache') ;
exports.CACHE_MAXSIZE=1000;
exports.CACHE_TTL=600;

server.use(cacheModule);


child_process.execFile("chrome.sh", [], (error, stdout, stderr) => {
	console.log("Startup Script",stdout);
});

server.start();
