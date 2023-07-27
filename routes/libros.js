const express = require('express');
const router = express.Router();

// Importamos la librería para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

const Libro = require('../models/Libro');

router.get('/', requiredScopes("read:libros"),  async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'no se pudo obtener el libro' });
    };
});

router.post('/', requiredScopes("read:libros"), async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error:'no se pudo crear nuevo libro' });
    };
});

router.put('/:id', requiredScopes("read:libros"), async (req, res) => {
    try {
        const Libro = findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
        });

        res.json(Libro);
    } catch (error) {
        res.status(500).json({ error:'no se pudo actualizar' });
    };
});

router.delete('/:id', requiredScopes("read:libros"), async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'libro eliminado correctamente '});
    } catch (error) {
      res.status(500).json({ error: 'el libro no se ha podido eliminar' });
    }
});
module.exports = router;