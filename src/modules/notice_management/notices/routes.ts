'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/notices';
    const controllerInstance = controller(fastify);

    fastify
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .get(
            `${prefix}/notice-categorys`,
            { preHandler: [auth_middleware] },
            controllerInstance.all_notice_categorys,
        )
        .get(
            `${prefix}/user/:user`,
            { preHandler: [auth_middleware] },
            controllerInstance.notices,
        )
        .get(
            `${prefix}/all/:user`,
            { preHandler: [auth_middleware] },
            controllerInstance.user_notices,
        )
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
        .get(`${prefix}/:id`, controllerInstance.find)

        .get(
            `${prefix}/students`,
            { preHandler: [auth_middleware] },
            controllerInstance.user_notices,
        ); // show notice
    // .get(`${prefix}/student/:student_id`, controllerInstance.find) //notice for a single presone
    // .post(`${prefix}/:notice_id/student/:student_id/seen`, controllerInstance.store) // show in seen table
    // .post(`${prefix}/:notice_id/student/:student_id/unseen`, controllerInstance.update) // dont show in seen table
};
