const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const weatherController = require('../controllers/weather-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
            body('email').isEmail(),
            body('password').isLength({min: 4, max: 32}),
            userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/read', authMiddleware, userController.read);
router.put('/update', authMiddleware, userController.update);
router.put('/delete', authMiddleware, userController.delete);
router.post('/weather', weatherController.weather);
router.post('/forecast', weatherController.forecast);
router.post('/search', weatherController.search);


module.exports = router
