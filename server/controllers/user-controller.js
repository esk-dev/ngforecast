const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error');

class UserController {

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const {email, password} = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 2 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' });
      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const {email,password} = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 2 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' });
      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 2 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async read(req, res, next) {
    try {
      const { id } = req.headers;
      const userInformation = await userService.read(id);
      return res.json(userInformation);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { city } = req.body;
      const { id } = req.headers;
      const updateCallback = await userService.update(id, city);
      return res.json(updateCallback);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    try {
      const { city } = req.body;
      const { id } = req.headers;
      const deleteCallback = await userService.delete(id, city);
      return res.json(deleteCallback);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
