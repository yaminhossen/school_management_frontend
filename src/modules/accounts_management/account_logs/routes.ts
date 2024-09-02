'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/account-logs';
    const controllerInstance = controller(fastify);

    fastify
        .get(`${prefix}`, controllerInstance.all)
        .post(`${prefix}/store`, controllerInstance.store)
        .get(`${prefix}/categories`, controllerInstance.categories)
        .get(`${prefix}/accounts`, controllerInstance.accounts)
        .get(`${prefix}/:id`, controllerInstance.find)
        .post(`${prefix}/fees-payment`, controllerInstance.fees_payment)
        .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/import`, controllerInstance.import);
};
