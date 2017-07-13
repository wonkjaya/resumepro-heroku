'use strict'

const ENV = use('Env');

class MainHelpers {

	constructor(options){
		this.base_url = (typeof(options) !== 'undefined') ? options.base_url : '';
	}

	form_profile(){
		return {
			"basic_info":
			[
				{
					'label':'profile.form.fullname', 
					'type':'text',
					'name':'fullname',
					'class':'form-control'
				},
				{
					'label':'profile.form.address', 
					'type':'text',
					'name':'address',
					'class':'form-control'
				},
				{
					'label':'profile.form.place_of_birth', 
					'type':'text',
					'name':'gender',
					'class':'form-control'
				},
				{
					'label':'profile.form.date_of_birth', 
					'type':'text',
					'name':'date_of_birth',
					'class':'form-control'
				},
				{
					'label':'profile.form.gender', 
					'type':'radio',
					'name':'gender',
					'child':[
						{'label':'profile.form.male','class':'form-control','value':'L'},
						{'label':'profile.form.female','class':'form-control','value':'P'}
					]
				},
				{
					'label':'profile.form.marital_status', 
					'type':'dropdown',
					'name':'marital_status',
					'class':'form-control',
					'child':[
						{'label':'profile.form.singgle','value':'0'},
						{'label':'profile.form.married','value':'1'},
						{'label':'profile.form.widow_widower','value':'2'},
						{'label':'profile.form.other','value':'3'}
					]
				},
				{
					'label':'profile.form.religion', 
					'type':'dropdown',
					'name':'religion',
					'class':'form-control',
					'child':[
						{'label':'profile.form.islam','value':'0'},
						{'label':'profile.form.kristen','value':'1'},
						{'label':'profile.form.hindu','value':'2'},
						{'label':'profile.form.budha','value':'3'},
						{'label':'profile.form.konghucu','value':'4'},
						{'label':'profile.form.other','value':'5'}
					]
				},
				{
					'label':'profile.form.nationality', 
					'type':'text',
					'name':'nationality',
					'class':'form-control',
					'value':'Indonesia'
				},
				{
					'label':'profile.form.phonenumber', 
					'type':'text',
					'name':'phonenumber',
					'class':'form-control'
				}
			],
			"working_experiences":[
				{
					'title_name':'title1', 
					'start_name':'start1', 
					'end_name':'end1', 
					'desc_name':'description1',
					'company_name':'company1',
					'title_value':'',
					'start_value':'',
					'end_value':'',
					'desc_value':'',
					'company_value':'',
					'title_class':'form-control',
					'start_class':'form-control',
					'end_class':'form-control',
					'desc_class':'form-control',
					'company_class':'form-control'
				},
				{
					'title_name':'title2', 
					'start_name':'start2', 
					'end_name':'end2', 
					'desc_name':'description2',
					'company_name':'company2',
					'title_value':'',
					'start_value':'',
					'end_value':'',
					'desc_value':'',
					'company_value':'',
					'title_class':'form-control',
					'start_class':'form-control',
					'end_class':'form-control',
					'desc_class':'form-control',
					'company_class':'form-control'
				}
			],
			"certifications":[
				{
					'title_name':'title1', 
					'title_value':'', 
					'period_name':'period1', 
					'period_value':'', 
					'instance_name':'instance1', 
					'instance_value':'', 
					'desc_name':'description1',
					'desc_value':'',
				},
				{
					'title_name':'title2', 
					'title_value':'', 
					'period_name':'period2', 
					'period_value':'',
					'instance_name':'instance2',
					'instance_value':'',  
					'desc_name':'description2',
					'desc_value':'',
				}
			]
		}
	}
	
	menu(isHome){
		var host = '';
		if(isHome === false) host = this.base_url;
		var menus = [
			{
				'label'	:'general.menu.about',
				'url'	:host+'#about',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.invite',
				'url'	:host+'#invite-friends',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.templates',
				'url'	:host+'#templates',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.contact',
				'url'	:host+'#contact',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.login',
				'url'	:host+'/auth/login.html',
				'custom_class': 'login-btn'
			}
		]
		return menus;
	}
	
	client_menu(isHome){
		var host = '';
		if(isHome === false) host = this.base_url;
		var menus = [
			{
				'label'	:'general.menu.clients.dashboard',
				'url'	:'/clients/main.html',
				'fa_icon': 'home',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.clients.my_profile',
				'url'	:'/clients/my_profile.html',
				'fa_icon': 'user',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.clients.my_resume',
				'url'	:'#my_resume',
				'fa_icon': 'file-text',
				'custom_class': '',
				'child':[
					{
						'label'	:'general.menu.clients.show_resume',
						'url'	:'/clients/my_resume/show_resume.html',
						'isnew' : false
					},
					{
						'label'	:'general.menu.clients.new_resume',
						'url'	:'/clients/my_resume/new_resume.html',
						'isnew' : false
					}
				]
			},
			{
				'label'	:'general.menu.clients.reminder',
				'url'	:'#reminder',
				'fa_icon': 'bell',
				'custom_class': '',
				'child':[
					{
						'label'	:'general.menu.clients.interview',
						'url'	:'/clients/reminder/reminder.html',
						'isnew' : false
					},
					{
						'label'	:'general.menu.clients.activities',
						'url'	:'/clients/reminder/activities.html',
						'isnew' : false
					}
				]
			},
			{
				'label'	:'general.menu.clients.find_job',
				'url'	:'#find_post',
				'fa_icon': 'briefcase',
				'custom_class': '',
				'child':[
					{
						'label'	:'general.menu.clients.all_jobs',
						'url'	:'/clients/find_job/all_jobs.html',
						'isnew' : false
					},
					{
						'label'	:'general.menu.clients.jobsid',
						'url'	:'/clients/find_job/jobsid.html',
						'isnew' : false
					},
					{
						'label'	:'general.menu.clients.jobstreet',
						'url'	:'/clients/find_job/jobstreet_com.html',
						'isnew' : true
					},
					{
						'label'	:'general.menu.clients.lokerwebid',
						'url'	:'/clients/find_job/loker_web_id.html',
						'isnew' : false
					}
				]
			}
		]
		return menus;
	}
	
	admin_menu(isHome){
		var host = '';
		if(isHome === false) host = this.base_url;
		var menus = [
			{
				'label'	:'general.menu.admin.dashboard',
				'url'	:'/dashboard/default.html',
				'fa_icon': 'home',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.admin.user',
				'url'	:'/dashboard/users.html',
				'fa_icon': 'user',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.admin.logs',
				'url'	:'/dashboard/logs.html',
				'fa_icon': 'warning',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.admin.jobs_post_crawling',
				'url'	:'#jobs_post',
				'fa_icon': 'briefcase',
				'custom_class': '',
				'child':[
					{
						'label'	:'general.menu.admin.job.jobsid',
						'url'	:'/dashboard/job_crawl/jobsid.html',
						'isnew' : true
					},
					{
						'label'	:'general.menu.admin.job.jobstreet',
						'url'	:'/dashboard/job_crawl/jobstreet_com.html',
						'isnew' : true
					},
					{
						'label'	:'general.menu.admin.job.lokerwebid',
						'url'	:'/dashboard/job_crawl/loker_web_id.html',
						'isnew' : true
					}
				]
			},
			{
				'label'	:'general.menu.admin.account_crawling',
				'url'	:'#account_post',
				'fa_icon': 'chain',
				'custom_class': '',
				'child':[
					{
						'label'	:'general.menu.admin.account.facebook',
						'url'	:'/dashboard/account/facebook.html',
						'isnew' : true
					},
					{
						'label'	:'general.menu.admin.account.linkin',
						'url'	:'/dashboard/account/linkin.html',
						'isnew' : true
					},
					{
						'label'	:'general.menu.admin.account.twitter',
						'url'	:'/dashboard/account/twitter.html',
						'isnew' : true
					},
					{
						'label'	:'general.menu.admin.account.google',
						'url'	:'/dashboard/account/googleplus.html',
						'isnew' : true
					}
				]
			},
			{
				'label'	:'general.menu.admin.settings',
				'url'	:'#settings',
				'fa_icon': 'cog',
				'custom_class': '',
				'child':[
					{
						'label'	:'general.menu.admin.settings',
						'url'	:'/dashboard/settings.html'
					}
				]
			}
		]
		return menus;
	}
}

module.exports = MainHelpers;