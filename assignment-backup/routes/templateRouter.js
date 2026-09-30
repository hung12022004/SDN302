const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseController'); // 1. Sửa tên file controller
// const auth = require('../middlewares/auth'); // 2. Bỏ comment nếu đề yêu cầu x-api-key

// Nếu đề bắt kiểm tra x-api-key cho tất cả các route thì bỏ comment dòng dưới:
// router.use(auth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;