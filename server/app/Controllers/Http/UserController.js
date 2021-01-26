'use strict'

const User = use('App/Models/User');

class UserController {
	async register({request}){

		const {email, password} = request.all();
		console.log(email, password);
		user = await User.create({
			email, 
			password, 
			username: email
		});
		// return this.login(...arguments);
		return user;
	}
// auth for authentication
	async login({request, auth}){
		const {email, password} = request.all();
		const token = await auth.attempt(email, password);

		return token;

	}



}

module.exports = UserController
