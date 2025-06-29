'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/academic-calendars';
    const controllerInstance = controller(fastify);

    fastify
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .get(`${prefix}/:id`, controllerInstance.find)
        .get(`${prefix}/events/:id`, controllerInstance.calendar)
        .post(
            `${prefix}/store`,
            { preHandler: [auth_middleware] },
            controllerInstance.store,
        )
        .post(
            `${prefix}/get-academic-event-by-month`,
            { preHandler: [auth_middleware] },
            controllerInstance.get_academic_event_by_month,
        )
        .post(
            `${prefix}/get-academic-event-by-month-account`,
            { preHandler: [auth_middleware] },
            controllerInstance.get_academic_event_by_month_account,
        )

        .post(
            `${prefix}/update`,
            { preHandler: [auth_middleware] },
            controllerInstance.update,
        )
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/import`, controllerInstance.import);
};
