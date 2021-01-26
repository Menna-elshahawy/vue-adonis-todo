'use strict'


const Project = use('App/Models/Project')

class ProjectController {
	// returns all projects that is associated with users
	async index({auth}){

		const user = await auth.getUser();
		return await user.projects().fetch();

	}

	async create({auth, request}){

		const user = await auth.getUser();
		const {title} = request.all();

		const project = await Project.create({
			title
		});

		await user.projects().save(project); 

		return project;



	}
}

module.exports = ProjectController
