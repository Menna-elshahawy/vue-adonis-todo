const InvalidAccessException = use('App/Exceptions/InvalidAccessException')
const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException')

class AuthorizationService{

	verifyPermission(resource, user){
		// resource is not defined 
		if(!resource){
			throw new ResourceNotExistException();
		}
		// code that will be used more than once.
		if(resource.user_id !== user.id){
			// return response.status(403);
			throw new InvalidAccessException(); 
		}
	}
}

module.exports = new AuthorizationService();