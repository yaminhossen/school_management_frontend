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
import block from './services/block';
import data_import from './services/import';
import login from './services/login';
import logout from './services/logout';
import forget from './services/forget';
import profile_update from './services/profile_update';
import make_admin from './services/make_admin';
import make_admin_teacher from './services/make_admin_teacher';
import admin_details from './services/admin_details';

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
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

        admin_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await admin_details(fastify, req);
            res.code(data.status).send(data);
        },

        make_admin: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await make_admin(fastify, req);
            res.code(data.status).send(data);
        },

        make_admin_teacher: async function (
            req: FastifyRequest,
            res: FastifyReply,
        ) {
            let data: responseObject = await make_admin_teacher(fastify, req);
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

        block: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await block(fastify, req);
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
