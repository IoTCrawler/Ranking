import express from 'express';
import { Controller } from './controller'
let c = new Controller(process.env.INDEXER_URL);
export default express.Router()
    // .post('/', controller.create)
    // .get('/', controller.all)
    // .get('/:id', controller.byId)
    .get('/entities', c.near.bind(c));