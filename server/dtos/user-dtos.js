module.exports = class UserDto {
  email;
  id;
  isActivated;
  favoriteCities;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.favoriteCities = model.favoriteCities;
  }
};
