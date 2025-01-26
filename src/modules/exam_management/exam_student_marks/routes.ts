'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/exam-student-marks';
    const controllerInstance = controller(fastify);

    fastify
        .get(`${prefix}`, controllerInstance.all)
        .get(`${prefix}/:id`, controllerInstance.find)
        .get(`${prefix}/mark-details/:class`, controllerInstance.mark_details)
        .get(`${prefix}/student-class`, controllerInstance.student_class)
        .get(`${prefix}/class-wise-exam`, controllerInstance.class_wise_exam)
        .get(`${prefix}/exam-wise`, controllerInstance.exam_wise)
        .post(`${prefix}/store`, controllerInstance.store)
        .post(`${prefix}/mark-store`, controllerInstance.mark_store)
        .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/import`, controllerInstance.import);
};
