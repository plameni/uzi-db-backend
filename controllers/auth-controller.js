const accountRepository = require('../repositories/account-repository');
const userRepository = require('../repositories/account-repository');

class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const userData = await userRepository.register(username, password);
            res.status(201).json({
                message: 'Korisnik uspešno registrovan',
                token: userData.token,
                userId: userData.userId, // Ensure this is a number
                username: userData.username
            });
        } catch (error) {
            console.error('Greška prilikom registracije:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const userData = await userRepository.login(username, password);
            res.json(userData);
        } catch (error) {
            console.error('Greška prilikom prijave:', error);
            res.status(401).json({ error: error.message });
        }
    }

  
}

module.exports = new AuthController();