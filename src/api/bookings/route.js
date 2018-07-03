const { Router } = require('express');
const controller = require('./controller');
// const log = require('debug')('@BOOKINGS');

const router = Router();

router.param('id', controller.params);

router.route('/')
  .get(controller.getAll)
  .post(controller.post);

router.route('/:id')
  .get(controller.getById)
  .put(controller.update)
  .delete(controller.delete);

module.exports = { path: '/bookings', router };
