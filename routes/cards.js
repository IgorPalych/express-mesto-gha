const router = require('express').Router();
const cardsControllers = require('../controllers/cards');

router.get('/', cardsControllers.getCards);

router.post('/', cardsControllers.createCard);

router.delete('/:cardId', cardsControllers.deleteCard);

router.put('/:cardId/likes', cardsControllers.likeCard);

router.delete('/:cardId/likes', cardsControllers.dislikeCard);

module.exports = router;
