const router = require('express').Router();
const cardsControllers = require('../controllers/cards');
const { validateCardId, validateCardData } = require('../middlewares/validate');

router.get('/', cardsControllers.getCards);

router.post('/', validateCardData, cardsControllers.createCard);

router.delete('/:cardId', validateCardId, cardsControllers.deleteCard);

router.put('/:cardId/likes', validateCardId, cardsControllers.likeCard);

router.delete('/:cardId/likes', validateCardId, cardsControllers.dislikeCard);

module.exports = router;
