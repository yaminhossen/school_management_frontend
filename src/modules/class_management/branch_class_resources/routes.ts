'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/branch-class-resources';
    const controllerInstance = controller(fastify);

    fastify
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .get(
            `${prefix}/classes`,
            { preHandler: [auth_middleware] },
            controllerInstance.classes,
        )
        .get(
            `${prefix}/class-wise-subject/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.class_wise_subject,
        )
        .get(`${prefix}/:id`, controllerInstance.find)
        .get(
            `${prefix}/academic-resource`,
            { preHandler: [auth_middleware] },
            controllerInstance.academic_resource,
        )
        .get(
            `${prefix}/academic-resource-pagination`,
            { preHandler: [auth_middleware] },
            controllerInstance.academic_resources_pagination,
        )
        .get(
            `${prefix}/teacher-resource/:id`,
            controllerInstance.teacher_resource,
        )
        .get(
            `${prefix}/subject-wise/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.sub_wise_resource,
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
