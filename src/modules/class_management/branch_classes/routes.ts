'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/branch-classes';
    const controllerInstance = controller(fastify);

    fastify
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .get(
            `${prefix}/all-class`,
            { preHandler: [auth_middleware] },
            controllerInstance.all_class,
        )
        .post(
            `${prefix}/branch-class-wise-student`,
            controllerInstance.branch_class_wise_student,
        )
        .get(
            `${prefix}/class-routine-auth`,
            { preHandler: [auth_middleware] },
            controllerInstance.class_routine_auth,
        )
        .post(
            `${prefix}/class-routine`,
            { preHandler: [auth_middleware] },
            controllerInstance.class_routine,
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
        .post(`${prefix}/import`, controllerInstance.import)
        .get(
            `${prefix}/class-wise-subject/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.class_wise_subject,
        );
};
