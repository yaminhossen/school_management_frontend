'use strict';
import fastify, {
    FastifyReply,
    FastifyRequest,
    FastifyInstance,
} from 'fastify';
import all from './services/all';
import details from './services/details';
import soft_delete from './services/soft_delete';
import store from './services/store';
import { responseObject } from '../../common_types/object';
import update from './services/update';
import restore from './services/restore';
import destroy from './services/destroy';
import data_import from './services/import';
import login from './services/login';
import logout from './services/logout';
import forget from './services/forget';
import staff_all from './services/staff_all';
import basic_information from './services/basic_information';
import profile_update from './services/profile_update';
import filter_all from './services/filter_all';
import staff_all_task_user from './services/staff_all_task_user';
import admin_details from './services/admin_details';
import staff_details from './services/staff_details';

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
            res.code(data.status).send(data);
        },
        filter_all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await filter_all(fastify, req);
            res.code(data.status).send(data);
        },
        admin_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await admin_details(fastify, req);
            res.code(data.status).send(data);
        },
        staff_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await staff_details(fastify, req);
            res.code(data.status).send(data);
        },
        basic_information: async function (
            req: FastifyRequest,
            res: FastifyReply,
        ) {
            let data: responseObject = await basic_information(fastify, req);
            res.code(data.status).send(data);
        },
        staff_all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await staff_all(fastify, req);
            res.code(data.status).send(data);
        },
        staff_all_task_user: async function (
            req: FastifyRequest,
            res: FastifyReply,
        ) {
            let data: responseObject = await staff_all_task_user(fastify, req);
            res.code(data.status).send(data);
        },

        find: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await details(fastify, req);
            res.code(data.status).send(data);
        },

        store: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store(fastify, req);
            res.code(data.status).send(data);
        },

        profile_update: async function (
            req: FastifyRequest,
            res: FastifyReply,
        ) {
            let data: responseObject = await profile_update(fastify, req);
            res.code(data.status).send(data);
        },

        update: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update(fastify, req);
            res.code(data.status).send(data);
        },

        soft_delete: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await soft_delete(fastify, req);
            res.code(data.status).send(data);
        },

        restore: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await restore(fastify, req);
            res.code(data.status).send(data);
        },

        destroy: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await destroy(fastify, req);
            res.code(data.status).send(data);
        },

        import: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await data_import(fastify, req);
            res.code(data.status).send(data);
        },

        login: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await login(fastify, req);
            res.code(data.status).send(data);
        },

        logout: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await logout(fastify, req);
            res.code(data.status).send(data);
        },

        forget: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await forget(fastify, req);
            res.code(data.status).send(data);
        },

        // export: async function (req: FastifyRequest, res: FastifyReply) {},
    };
}
