'use strict'

class MainHelpers {

	constructor(){

	}
	
	menu(active_menu){
		var menus = [
			{
				'label'	:'About',
				'url'	:'#about',
				'custom_class': ''
			},
			{
				'label'	:'Invite Friends',
				'url'	:'#invite-friends',
				'custom_class': ''
			},
			{
				'label'	:'Templates',
				'url'	:'#templates',
				'custom_class': ''
			},
			{
				'label'	:'Contact',
				'url'	:'#contact',
				'custom_class': ''
			},
			{
				'label'	:'Login',
				'url'	:'#login',
				'custom_class': 'login-btn'
			}
		]
		return menus;
	}
}

module.exports = MainHelpers;