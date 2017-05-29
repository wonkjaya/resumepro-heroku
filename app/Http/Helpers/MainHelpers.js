'use strict'

const ENV = use('Env');

class MainHelpers {

	constructor(options){
		this.base_url = (typeof(options) !== 'undefined') ? options.base_url : '';
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
	
	admin_menu(isHome){
		var host = '';
		if(isHome === false) host = this.base_url;
		var menus = [
			{
				'label'	:'none',
				'url'	:'#search',
				'li_class': '',
				'icon_class': 'glyphicon glyphicon-search',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.admin.info',
				'url'	:'#info',
				'li_class': 'visible-xs',
				'icon_class': 'glyphicon glyphicon-info-sign',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.admin.my_profile',
				'url'	:'#profile',
				'li_class': 'visible-xs',
				'icon_class': 'glyphicon glyphicon-user',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.admin.settings',
				'url'	:'#settings',
				'li_class': 'visible-xs',
				'icon_class': 'glyphicon glyphicon-cog',
				'custom_class': ''
			},
			{
				'label'	:'general.menu.logout',
				'url'	:host+'/auth/logout.html',
				'li_class': 'visible-xs',
				'icon_class': 'glyphicon glyphicon-log-out',
				'custom_class': 'logout-btn'
			}
		]
		return menus;
	}
}

module.exports = MainHelpers;