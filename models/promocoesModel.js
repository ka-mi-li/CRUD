const db = require('../config/db');

const promocoes = {
    create: (promocoes, callback) => {
        const query = 'INSERT INTO promocoes (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [promocoes.nome, promocoes.descricao, promocoes.preco, promocoes.quantidade, promocoes.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT promocoes.*, categorias.nome AS categoria_nome FROM promocoes JOIN categorias ON promocoes.categoria = categorias.id WHERE promocoes.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, promocoes, callback) => {
        const query = 'UPDATE promocoes SET nome = ?, preco = ?, descricao = ?, quantidade = ?, categoria = ? WHERE id = ?';
        db.query(query, [promocoes.nome, promocoes.preco, promocoes.descricao, promocoes.quantidade, promocoes.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM promocoes WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (categoria, callback) => {
        let query = 'SELECT promocoes.id, promocoes.nome, promocoes.descricao, promocoes.preco, promocoes.quantidade, categorias.nome AS categoria_nome FROM promocoes JOIN categorias ON promocoes.categoria = categorias.id';
        
        if (categoria) {
            query += ' WHERE promocoes.categoria = ?';
        }
    
        db.query(query, [categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    
};

module.exports = promocoes;