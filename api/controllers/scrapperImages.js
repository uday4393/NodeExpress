var Scraper = require ('images-scraper')
  , google = new Scraper.Google();

exports.scrappingImages = function(keyword) {
	google.list({
    keyword: keyword,
    num: 15,
    detail: true,
    nightmare: {
        show: true
    }
})
.then(function (res) {
    console.log('first 15 results from google', res);
}).catch(function(err) {
    console.log('err', err);
});
 
// you can also watch on events 
google.on('result', function (item) {
    console.log('out', item);
});
};