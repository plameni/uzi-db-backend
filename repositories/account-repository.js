const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../common/db-config');

class UserRepository {
    async register(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await sequelize.query(
            'INSERT INTO account (role_id,email, username,name, surname, hashed_password, updated, created, updated_by, active) VALUES (?, ?, ?,?,?,?, NOW(), NOW(),?, 0)',
            { replacements: [1, null, username, null, null, hashedPassword, 1] }
        );

        // Ensure result.insertId is a number
        const userId = Number(result.insertId);

        const token = jwt.sign(
            { userId: userId, username: username },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        return {
            userId: userId,
            username: username,
            token
        };
    }

    async login(username, password) {
    const [users] = await sequelize.query(
        'SELECT * FROM account WHERE username = ?',
        { replacements: [username] }
    );

    if (users.length === 0) {
        throw new Error('Korisnik nije pronađen');
    }

    const user = users[0];

    // ✅ Provjera da li je aktivan
    if (user.active !== 0) {
        throw new Error('Vaš profil je deaktiviran');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) {
        throw new Error('Pogrešna lozinka');
    }

    // Generisanje JWT tokena
    const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
    );

    return {
        userId: user.id,
        username: user.username,
        token
    };
}

    async getUserById(id) {
        const [users] = await sequelize.query(
            'SELECT * FROM account WHERE id = ?',
            { replacements: [id] }
        );
        return users[0];
    }
}

module.exports = new UserRepository();