'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/branch-class-fees';
    const controllerInstance = controller(fastify);

    fastify
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .get(`${prefix}/:id`, controllerInstance.find)
        .get(
            `${prefix}/children-fees-types/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.children_fees_types,
        )
        .get(
            `${prefix}/fees-types`,
            { preHandler: [auth_middleware] },
            controllerInstance.fees_types,
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
        .post(`${prefix}/import`, controllerInstance.import);
};
