'use strict'

const Task = use('App/Models/Task')
const Project = use('App/Models/Project')
const AuthorizationService = use('App/Services/AuthorizationService');


class TaskController {

	async index({auth, request, params}){

		const user = await auth.getUser();
		const {id} = params;
		const project = await Project.find(id);
		
		AuthorizationService.verifyPermission(project, user);

		return await project.tasks().fetch();

	}
	async create({auth, request, params }){

		const user = await auth.getUser();
		const {title, description} =  request.all();
		// get project id from route and fetch the project
		const {id} = params;
		const project = await Project.find(id);
		// verify user access to project
		AuthorizationService.verifyPermission(project, user);

		const task = await Task.create({
			title,
			description
		});
		await project.tasks().save(task); 

		return task;
	}
}

module.exports = TaskController
