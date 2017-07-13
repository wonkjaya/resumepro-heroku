'use strict'
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
const Env = use('Env')
const Got = use('Got')
const cheerio = use('cheerio')
const Moment = use('moment')
	  Moment.locale('id')
const Model = use('App/Model/base');
const firebase = new Model('FirebaseCrawl');

class DummyController {

	constructor(options){
		this.options = (options)?options:{};
	}

	jobstreet(options){
		var cheerio_client = cheerio
		const url = Env.get('JOBSTREET-URL');
		var runner = function(url, pos){
			if(pos > 1){
				url = url.replace('.php','/'+pos+'/');
			}
			Got.get(url, function(e, body){
				var $ = cheerio_client.load(body, {
						    normalizeWhitespace: true,
						    xmlMode: true
						});
				let a = 1;
				$('.panel').each(function(){
					var content = $(this);
					let selector = content.children()['0']
					let id = selector.attribs.id
					if(typeof(id) !== 'undefined'){ // filter step 1
						if(selector.children.length > 10){
							var company_attrib = {};
								company_attrib.source = 'jobstreet.co.id'
							$('#company_name_'+a).each(function(){
								var c_attrib = $(this)['0'].attribs;
								company_attrib.search_job = c_attrib.href
							})
							$('#position_title_'+a).each(function(){
								var p_attrib = $(this)['0'].attribs;
								company_attrib.link = p_attrib.href
								company_attrib.id = p_attrib['data-job-id']
								company_attrib.job_title = p_attrib['data-job-title']
							})
							/*$('#job_location_'+a).each(function(){
								var l_attrib = $(this)['0'].attribs;
								company_attrib.job_location = l_attrib.title
							})
							$('#job_desc_detail_'+a).each(function(){
								var desc = $(this)['0'];
								desc.children.forEach(function(d, i){
									if(typeof(d.children) !== 'undefined'){
										company_attrib.job_desc = d.children[0].data
									}
								})
							})*/

							$('#posted_datetime_'+a).each(function(){
								var s_attrib = $(this)['0'];
								var time = s_attrib.children[0].data
								var month_short = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'];
								if(time.indexOf('-') >= 0){
									var t = time.split('-');
									var tgl = t[0].toLowerCase();
									var jam = t[1].toLowerCase();
									let type_of_tgl = tgl.replace(new RegExp("[0-9]", "g"),'')
									let number_of_tgl = tgl.replace(new RegExp("[a-z]", "g"),'')
									let date = new Date(tgl.replace(' ', '').replace(/ /g, '-')+'2017'+jam).getTime();
										time = Moment(date).valueOf()
								}else if(time==='kemarin'){
									time = Moment().subtract(1, 'day').valueOf()
								}else{
									let type_of_time = time.replace(new RegExp("[0-9]", "g"),'')
									let number_of_time = time.replace(new RegExp("[a-z]", "g"),'')
									time = time.replace('yang lalu','').replace('jam','h').replace('menit', 'm').replace(/ /g,'').toLowerCase()
										time = Moment().subtract(Number(number_of_time), String(type_of_time)).valueOf()
								}
								company_attrib.published_time = time
							})
							get_detail(company_attrib, function(result){
								firebase.execute('upsert_job_crawl', company_attrib); 
							})
							a++
						}
					}
				})
			})
		}
		var get_detail = function(data, callback){
			var url_detail = data.link;
			Got.get(url_detail, function(e, body){
				var $ = cheerio_client.load(body, {
						    normalizeWhitespace: true,
						    xmlMode: true
						});
				var company= $('div#company_name').children()['0']
					data.company_link = (typeof(company) !== 'undefined')?company.attribs.href:'';
					data.years_of_experience= $('span#years_of_experience').text()
					data.work_location= $('span#single_work_location').text()
				$('div#job_description').each(function(){
					var content = $(this).children().text();
					var req = [
							'Requirments :',
							'Requirments:',
							'Requirments',
							'Requirement :',
							'Requirement:',
							'Requirement',
							'Required :',
							'Required:',
							'Required',
							'REQUIREMENT',
							'Qualifications :',
							'Qualifications:',
							'Qualifications',
							'Syarat :',
							'Syarat:',
							'Kualifikasi :',
							'Kualifikasi:']
							var tanda = 0;
						var description = [];
						var requirments = [];
						data.raw = content;
					req.forEach(function(j, index){
						if(content.indexOf(j) >= 0){
							tanda++;
							// content = content.split(j)
							content.split(j)[0].split('&nbsp;').forEach(function(x1, i1){
								if(x1.length > 3) description.push(x1.replace(/  /g, ' ').replace(/  /g, ' '))
								// console.log(data.description);return;
							})
							content.split(j)[1].split('&nbsp;').forEach(function(x2, i2){
								if(x2.length > 3) requirments.push(x2.replace(/  /g, ' ').replace(/  /g, ' '))
							})
						}
						if(index === req.length-1 && tanda > 0){
							description.push('')
							content.split('&nbsp;').forEach(function(x3, i3){
								if(x3.length > 3) requirments.push(x3.replace(/  /g, ' ').replace(/  /g, ' '))
							})
						}
					})
					data.description = {'data':description}
					data.requirments = {'data':requirments}

						data.company_location = $('p#address').text()
				})
					return callback(data);
			})
		}

		var interval = (this.options.interval !== null)?Number(this.options.interval):0;
			interval = interval * 1000
		if(interval > 0){
			var position = 1;
			runner(url, 1);
			setInterval(function(){
				if(position > 30) process.exit(0)
				runner(url, position)
				position++
			}, interval)
		}else{
			runner(url, 1);
			// process.exit(0)
		}
	}


}

module.exports = DummyController
