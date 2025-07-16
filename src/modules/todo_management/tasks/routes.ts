'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import auth_middleware from '../../auth_management/authetication/services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/tasks';
    const controllerInstance = controller(fastify);

    fastify
        .get(
            `${prefix}`,
            { preHandler: [auth_middleware] },
            controllerInstance.all,
        )
        .get(
            `${prefix}/pending`,
            { preHandler: [auth_middleware] },
            controllerInstance.teacher_pending,
        )
        .get(
            `${prefix}/teachers`,
            { preHandler: [auth_middleware] },
            controllerInstance.teacher_tasks,
        )
        .get(
            `${prefix}/staffs`,
            { preHandler: [auth_middleware] },
            controllerInstance.staff_task,
        )
        .get(
            `${prefix}/complete`,
            { preHandler: [auth_middleware] },
            controllerInstance.teacher_complete,
        )
        .get(
            `${prefix}/staff-pending`,
            { preHandler: [auth_middleware] },
            controllerInstance.staff_pending,
        )
        .get(
            `${prefix}/staff-expired`,
            { preHandler: [auth_middleware] },
            controllerInstance.staff_expired,
        )
        .get(
            `${prefix}/expired`,
            { preHandler: [auth_middleware] },
            controllerInstance.teacher_expired,
        )
        .get(
            `${prefix}/staff-complete`,
            { preHandler: [auth_middleware] },
            controllerInstance.staff_complete,
        )
        .get(
            `${prefix}/unseen-tasks`,
            { preHandler: [auth_middleware] },
            controllerInstance.unseen_tasks,
        )
        .post(
            `${prefix}/teacher-update/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.teacher_update,
        )
        .get(
            `${prefix}/seen-user/:id`,
            { preHandler: [auth_middleware] },
            controllerInstance.seen_user,
        )
        .post(
            `${prefix}/staff-update`,
            { preHandler: [auth_middleware] },
            controllerInstance.staff_update,
        )
        .get(`${prefix}/:id`, controllerInstance.find)
        .get(`${prefix}/admin/:id`, controllerInstance.admin_task)
        .get(`${prefix}/task-user/:id`, controllerInstance.task_user_details)
        .get(`${prefix}/task-details/:id`, controllerInstance.task_details)
        .post(`${prefix}/store`, controllerInstance.store)
        .post(
            `${prefix}/task-assign`,
            { preHandler: [auth_middleware] },
            controllerInstance.task_assign,
        )
        .post(
            `${prefix}/task-assign-update`,
            { preHandler: [auth_middleware] },
            controllerInstance.task_assign_updated,
        )
        .post(
            `${prefix}/task-user/update`,
            { preHandler: [auth_middleware] },
            controllerInstance.task_user_update,
        )
        .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/import`, controllerInstance.import);

    // .get(`${prefix}/teacher/all`, controllerInstance.all)
    // .get(`${prefix}/teacher/:id`, controllerInstance.find)
    // .post(`${prefix}/teacher/seen`, controllerInstance.store)
    // .post(`${prefix}/teacher/unseen`, controllerInstance.update)
};
