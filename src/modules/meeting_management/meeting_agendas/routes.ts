'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/meeting-agendas';
    const controllerInstance = controller(fastify);

    fastify
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .get(
            `${prefix}/teacher`,
            { preHandler: [auth_middleware] },
            controllerInstance.teacher_all,
        )
        .get(
            `${prefix}/admission-officer`,
            { preHandler: [auth_middleware] },
            controllerInstance.admission_officer_all,
        )
        .get(
            `${prefix}/admission-officer-complete`,
            { preHandler: [auth_middleware] },
            controllerInstance.admission_officer_complete,
        )
        .get(
            `${prefix}/meeting-all`,
            { preHandler: [auth_middleware] },
            controllerInstance.meeting_all,
        )
        .get(`${prefix}/:id`, controllerInstance.find)
        .post(
            `${prefix}/store`,
            { preHandler: [auth_middleware] },
            controllerInstance.store,
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
