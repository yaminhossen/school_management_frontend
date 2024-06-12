'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import check_auth_and_redirect from '../modules/auth_management/authetication/services/check_auth_and_redirect';
import minified_view from '../helpers/minified_view';
import check_is_admin_and_redirect from '../modules/user_management/user_admin/services/check_is_admin_and_redirect';
// const fs = require('node:fs');
module.exports = async function (fastify: FastifyInstance) {
    fastify
        .get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
            return reply.view('website/index.ejs');
        })
        .get('/login', async (_req: FastifyRequest, reply: FastifyReply) => {
            return reply.view('website/pages/login.ejs');
        })

        .get(
            '/admin',
            { preHandler: check_is_admin_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/admin.ejs');
            },
        )
        .get(
            '/admin/login',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('auth/admin_login.ejs');
            },
        )
        .get(
            '/student',
            // { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/student_uni.ejs');
            },
        )
        .get(
            '/parent',
            // { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/parent_uni.ejs');
            },
        )
        .get(
            '/teacher',
            // { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/teacher_uni.ejs');
            },
        )
        .get(
            '/account',
            // { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/account_uni.ejs');
            },
        )
        .get(
            '/dashboard/login',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                let html = await minified_view(fastify, 'auth/login.ejs');
                return reply.type('text/html').send(html);
            },
        );
};
