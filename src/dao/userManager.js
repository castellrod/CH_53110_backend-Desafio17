const { userModel } = require("./models/users.modelo");
const bcrypt = require('bcrypt');

class UserManager {

    async getUsers() {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Error('Error al obtener los usuarios desde MongoDB: ' + error.message);
        }
    }

    async addUser(username, email, password, role) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); 
            const newUser = await userModel.create({
                username: username,
                email: email,
                password: hashedPassword,
                role: role
            });
            return newUser;
        } catch (error) {
            throw new Error('Error al agregar el usuario a MongoDB: ' + error.message);
        }
    }

    async authenticateUser(username, password) {
        try {
            const user = await userModel.findOne({ username }).lean();
            if (!user) {
                throw new Error('Usuario no encontrado.');
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new Error('Contraseña incorrecta.');
            }
            return user;
        } catch (error) {
            throw new Error('Error al autenticar al usuario: ' + error.message);
        }
    }

    async getUserByFilter(filter) {
        return await userModel.findOne(filter).lean()
    }

}

module.exports = UserManager;