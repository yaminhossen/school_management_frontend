'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/account-logs';
    const controllerInstance = controller(fastify);

    fastify
        .get(`${prefix}`, controllerInstance.all)
        .post(`${prefix}/credit`, controllerInstance.credit)
        .get(`${prefix}/income-statement`, controllerInstance.income_statement)
        .post(`${prefix}/journal`, controllerInstance.journal)
        .get(`${prefix}/debit`, controllerInstance.debit)
        .post(`${prefix}/store`, controllerInstance.store)
        .post(`${prefix}/income-store`, controllerInstance.income_store)
        .post(`${prefix}/expense-store`, controllerInstance.expense_store)
        .get(`${prefix}/account/:id`, controllerInstance.account_details)
        .get(`${prefix}/categories`, controllerInstance.categories)
        .get(`${prefix}/periods`, controllerInstance.account_periods)
        .get(`${prefix}/receipt-book`, controllerInstance.receipt_books)
        .get(`${prefix}/accounts`, controllerInstance.accounts)
        .get(`${prefix}/:id`, controllerInstance.find)
        .post(`${prefix}/fees-payment`, controllerInstance.fees_payment)
        .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/import`, controllerInstance.import);
};
