const Promocoes = require('../models/promocoesModel');
const Categoria = require('../models/categoriaModel');

const promocoesController = {

    createPromocoes: (req, res) => {

        const newPromocoes = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Promocoes.create(newPromocoes, (err, promocoesId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/promocoes');
        });
    },

    getPromocoesById: (req, res) => {
        const promocoesId = req.params.id;

        Promocoes.findById(promocoesId, (err, promocoes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!promocoes) {
                return res.status(404).json({ message: 'Promocoes not found' });
            }
            res.render('promocoes/show', { promocoes });
        });
    },
    
    getAllPromocoess: (req, res) => {
        const categoria = req.query.categoria || null;
        
        Promocoes.getAll(categoria, (err, promocoes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('promocoes/index', { promocoes, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('promocoes/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const promocoesId = req.params.id;

        Promocoes.findById(promocoesId, (err, promocoes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!promocoes) {
                return res.status(404).json({ message: 'Promocoes not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('promocoes/edit', { promocoes, categorias });
            });
        });
    },

    updatePromocoes: (req, res) => {
        const promocoesId = req.params.id;
        
        const updatedPromocoes = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Promocoes.update(promocoesId, updatedPromocoes, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/promocoes');
        });
    },

    deletePromocoes: (req, res) => {
        const promocoesId = req.params.id;

        Promocoes.delete(promocoesId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/promocoes');
        });
    }
};

module.exports = promocoesController;