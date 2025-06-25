const express = require("express");
const router = express.Router();
const promocoesController = require("../controllers/promocoesController");

router.get('/', promocoesController.getAllPromocoes);
router.get('/new', promocoesController.renderCreateForm);
router.post('/', promocoesController.createPromocoes);
router.get('/:id', promocoesController.getPromocoesById);
router.get('/:id/edit', promocoesController.renderEditForm);
router.put('/:id', promocoesController.updatePromocoes);
router.delete('/:id', promocoesController.deletePromocoes);

module.exports = router;
