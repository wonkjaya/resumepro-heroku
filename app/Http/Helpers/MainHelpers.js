'use strict'

const ENV = use('Env');

class MainHelpers {

	constructor(){
	}

	get_host(){
		if(typeof(ENV.get('PROTOCOL')) === 'undefined') return '';
		return `${ENV.get('PROTOCOL')}://${ENV.get('HOST')}:${ENV.get('PORT')}/`;
	}
	
	menu(isHome){
		var host = '';
		if(isHome === false) host = this.get_host();
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
}

module.exports = MainHelpers;