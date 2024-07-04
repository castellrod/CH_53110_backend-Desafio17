const UserManager = require('../dao/userManager');
const UserDTO = require('../dto/user.dto');

class UserService{
    constructor(){
        this.userDAO = new UserManager();
    }

    async getUsers(){
       const users = await this.userDAO.getUsers();
       return users.map(user => new UserDTO(user));
    }

    async addUser(userData){
        const { username, email, password, role } = userData;
        const newUser = await this.userDAO.addUser(username, email, password, role);
        return new UserDTO(newUser);
    }

    async authenticateUser(username, password){
        const user = await this.userDAO.authenticateUser(username, password);
        return new UserDTO(user);
    }

    async getUserByFilter(filter){
        const user = await this.userDAO.getUserByFilter(filter);
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        return new UserDTO(user);
    }
}

module.exports = new UserService();