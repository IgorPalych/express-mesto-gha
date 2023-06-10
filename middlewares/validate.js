const { celebrate, Joi } = require('celebrate');

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(https?:\/\/)?([\w-]+\.[\w-]+)\S*$/, 'URL'),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(https?:\/\/)?([\w-]+\.[\w-]+)\S*$/, 'URL'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const validateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(https?:\/\/)?([\w-]+\.[\w-]+)\S*$/, 'URL'),
  }),
});

module.exports = {
  validateUserId,
  validateUserProfile,
  validateUserAvatar,
  validateSignUp,
  validateSignIn,
  validateCardId,
  validateCardData,
};
