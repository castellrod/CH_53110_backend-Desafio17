const UserService = require('../services/user.service');
const UserDTO = require('../dto/user.dto');
const logger = require('../utils/logger');

class SessionController{

    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async registerError(req, res) {
        res.redirect("/register?message=Error en registro");
    }

    static async register(req, res) {
        return res.redirect("/register?message=¡Registro correcto!");
    }

    static async loginError(req, res) {
        res.redirect("/login?error=Error en login");
    }

    static async login(req, res) {
        let user=req.user
        user={...user}
        delete user.password
        req.session.user =user 

        res.redirect("/products");
    }


    static async githubError(req, res) {
        res.setHeader("Content-Type", "application/json");
        return res.status(500).json({
            error: "Error en servidor",
            detalle: "Error en login con Github"
        })
    }

    static async githubCallback(req, res) {
        req.session.user = req.user;
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json({payload: "Login successful", user: req.user});
    }

    static async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                logger.error('Error al cerrar sesión.', err);
                res.status(500).send('Error al cerrar sesión.');
            } else {
                res.redirect('/login'); 
            }
        });
    }


    static async currentUser(req, res) {
       try{
        const userId = req.session.user._id;
        const user = await UserService.getUserByFilter({ _id: userId });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const userDTO = new UserDTO(user);
        res.json(userDTO);
       }
         catch(error){
              res.status(500).json({error:error.message})
         }
    }

}

module.exports = SessionController;