class UserDTO {
    constructor({ _id, username, email, role }) {
        this.id = _id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}

module.exports = UserDTO;