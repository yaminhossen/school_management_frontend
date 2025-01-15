'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import controller from './controller';
import check_auth from './services/check_auth';
import check_account_auth from './services/check_account_auth';
import check_teacher_auth from './services/check_teacher_auth';
import check_staff_auth from './services/check_staff_auth';
import check_parent_auth from './services/check_parent_auth';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/auth';
    const controllerInstance = controller(fastify);
    console.log('account longin');
    /** public routes */
    fastify.register(
        async (route, opts) => {
            route
                .post(
                    `/admission-officer/login`,
                    controllerInstance.admission_login,
                )
                .post(`/account/login`, controllerInstance.account_login)
                .post(`/staff/login`, controllerInstance.staff_login)
                .post(`/teacher/login`, controllerInstance.teacher_login)
                .post(`/parent/login`, controllerInstance.parent_login)
                .post(`/login`, controllerInstance.login)
                .post(`/register`, controllerInstance.register)
                .post(`/forget`, controllerInstance.forget);
        },
        { prefix },
    );

    /** auth routes */
    fastify.register(
        async (route, opts) => {
            route
                // .addHook('preHandler', check_auth)
                .post(
                    `/logout`,
                    { preHandler: check_account_auth },
                    controllerInstance.logout,
                )
                .post(
                    `/teacher/logout`,
                    { preHandler: check_teacher_auth },
                    controllerInstance.logout,
                )
                .post(
                    `/staff/logout`,
                    { preHandler: check_staff_auth },
                    controllerInstance.logout,
                )
                .post(
                    `/parent/logout`,
                    { preHandler: check_parent_auth },
                    controllerInstance.logout,
                )
                .get(`/info`, controllerInstance.auth_user);
        },
        { prefix },
    );
};
