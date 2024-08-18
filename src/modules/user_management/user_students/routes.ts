'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import check_staff_auth from '../../auth_management/authetication/services/chech_staff_auth';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/user-students';
    const controllerInstance = controller(fastify);

    fastify
        .get(`${prefix}`, controllerInstance.all)
        .get(
            `${prefix}/all-class`,
            { preHandler: [check_staff_auth] },
            controllerInstance.all_class,
        )
        .get(`${prefix}/:id`, controllerInstance.find)
        .get(`${prefix}/class-details/:id`, controllerInstance.class_details)
        .get(`${prefix}/full-details/:id`, controllerInstance.full_details)
        .get(`${prefix}/students/:id`, controllerInstance.find_student)
        .post(`${prefix}/store`, controllerInstance.store)
        // .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/update`, controllerInstance.full_details_update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/import`, controllerInstance.import)
        .post(`${prefix}/login`, controllerInstance.login)
        .post(`${prefix}/forget`, controllerInstance.forget)
        .post(`${prefix}/change-password`, controllerInstance.change_password)
        .post(`${prefix}/logout`, controllerInstance.logout)
        .post(`${prefix}/admit`, controllerInstance.admit_student)
        .get(`${prefix}/:id/profile`, controllerInstance.profile);
};
