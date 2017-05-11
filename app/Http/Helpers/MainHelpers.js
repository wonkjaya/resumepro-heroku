'use strict'

const ENV = use('Env');

class MainHelpers {

	constructor(){
	}

	get_host(){
		if(ENV.get('PROTOCOL') === null) return '';
		return `${ENV.get('PROTOCOL')}://${ENV.get('HOST')}:${ENV.get('PORT')}/`;
	}
	
	menu(isHome){
		var host = '';
		if(isHome === false) host = this.get_host();
		var menus = [
			{
				'label'	:'About',
				'url'	:host+'#about',
				'custom_class': ''
			},
			{
				'label'	:'Invite Friends',
				'url'	:host+'#invite-friends',
				'custom_class': ''
			},
			{
				'label'	:'Templates',
				'url'	:host+'#templates',
				'custom_class': ''
			},
			{
				'label'	:'Contact',
				'url'	:host+'#contact',
				'custom_class': ''
			},
			{
				'label'	:'Login',
				'url'	:host+'/auth/login.html',
				'custom_class': 'login-btn'
			}
		]
		return menus;
	}
}

module.exports = MainHelpers;