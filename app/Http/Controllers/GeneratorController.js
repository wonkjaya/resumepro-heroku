'use strict'

class GeneratorController {
 * generate(req, res){
	const url2pdf = use('App/Model/Pdfgenerator')
	const q = use('q')
	const url = req.get('url').url

	if(url.length <= 3){
		res.send({"error":"url tidak tersedia"});
		res.end();
		return;
	}
	q.all([
 		url2pdf.renderPdf(url/*, {paperSize: {orientation: "potrait"}}*/)
	])
	.then(function (paths) {
	    // console.log("Created PDFs @", paths);
	    res.send(paths);
	    // manual clenup could be done here, but better use autocelan
	    // if you want a manual cleanup, disable autoclean by setting option: autoCleanFileAgeInSec = -1
	    // then do the cleanup manual; use a timeout to prevent deleting pending operations
	    // console.log("Deleted", url2pdf.cleanup(5)); // remove all files older than 5 seconds
	})
	.catch(function (err) {
	    console.error(err.stack);
	});
 }
}

module.exports = GeneratorController
