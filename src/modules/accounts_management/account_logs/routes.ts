'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import check_auth from '../../auth_management/authetication/services/check_auth';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/account-logs';
    const controllerInstance = controller(fastify);

    fastify
        // .addHook('onRequest', check_auth)
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .post(
            `${prefix}/credit`,
            { preHandler: [auth_middleware] },
            controllerInstance.credit,
        )
        .post(
            `${prefix}/category-wise/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.category_wise,
        )
        .post(
            `${prefix}/month-wise-statement`,
            { preHandler: [auth_middleware] },
            controllerInstance.month_wise_statement,
        )
        .get(
            `${prefix}/month-wise-statement/:month`,
            { preHandler: [auth_middleware] },
            controllerInstance.single_month_wise,
        )
        .get(
            `${prefix}/today-income`,
            { preHandler: [auth_middleware] },
            controllerInstance.today_income,
        )
        .get(
            `${prefix}/bank-total`,
            { preHandler: [auth_middleware] },
            controllerInstance.bank_total,
        )
        .get(
            `${prefix}/hand-cash`,
            { preHandler: [auth_middleware] },
            controllerInstance.hand_cash,
        )
        .get(
            `${prefix}/running-month-income`,
            { preHandler: [auth_middleware] },
            controllerInstance.running_month_income,
        )
        .get(
            `${prefix}/running-month-expense`,
            { preHandler: [auth_middleware] },
            controllerInstance.running_month_expense,
        )
        .get(
            `${prefix}/current-balance`,
            { preHandler: [auth_middleware] },
            controllerInstance.current_balance,
        )
        .get(
            `${prefix}/expense-today`,
            { preHandler: [auth_middleware] },
            controllerInstance.expense_today,
        )
        .post(
            `${prefix}/payment-history-auth`,
            { preHandler: [auth_middleware] },
            controllerInstance.payment_history_auth,
        )
        .post(
            `${prefix}/payment-history/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.payment_history,
        )
        .get(
            `${prefix}/income-statement`,
            { preHandler: [auth_middleware] },
            controllerInstance.income_statement,
        )
        .post(
            `${prefix}/journal`,
            { preHandler: [auth_middleware] },
            controllerInstance.journal,
        )
        .post(
            `${prefix}/profit-loss`,
            { preHandler: [auth_middleware] },
            controllerInstance.profit_loss,
        )
        .post(
            `${prefix}/debit`,
            { preHandler: [auth_middleware] },
            controllerInstance.debit,
        )
        .post(
            `${prefix}/store`,
            { preHandler: [auth_middleware] },
            controllerInstance.store,
        )
        .post(
            `${prefix}/fees-store`,
            { preHandler: [auth_middleware] },
            controllerInstance.fees_store,
        )
        .post(
            `${prefix}/income-store`,
            { preHandler: [auth_middleware] },
            controllerInstance.income_store,
        )
        .post(
            `${prefix}/expense-store`,
            { preHandler: [auth_middleware] },
            controllerInstance.expense_store,
        )
        .get(
            `${prefix}/account/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.account_details,
        )
        .get(
            `${prefix}/categories`,
            { preHandler: [auth_middleware] },
            controllerInstance.categories,
        )
        .get(
            `${prefix}/periods`,
            { preHandler: [auth_middleware] },
            controllerInstance.account_periods,
        )
        .get(
            `${prefix}/receipt-book`,
            { preHandler: [auth_middleware] },
            controllerInstance.receipt_books,
        )
        .get(
            `${prefix}/accounts`,
            { preHandler: [auth_middleware] },
            controllerInstance.accounts,
        )
        .post(
            `${prefix}/fees-payment`,
            { preHandler: [auth_middleware] },
            controllerInstance.fees_payment,
        )
        .post(
            `${prefix}/update`,
            { preHandler: [auth_middleware] },
            controllerInstance.update,
        )
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/import`, controllerInstance.import)
        .get(`${prefix}/:id`, controllerInstance.find);
};
