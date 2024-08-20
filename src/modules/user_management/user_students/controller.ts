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
import change_password from './services/change_password';
import profile from './services/student_profile';
import admit_student_store from './services/admit_student_store';
import students_details from './services/student_details';
import full_details from './services/full_details';
import class_details from './services/class_details';
import all_class from './services/all_class';
import classes from './services/classes';
import shifts from './services/shifts';
import branches from './services/branches';
import sections from './services/sections';
import full_details_update from './services/admit_student_update';

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

        find_student: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await students_details(fastify, req);
            res.code(data.status).send(data);
        },

        full_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await full_details(fastify, req);
            res.code(data.status).send(data);
        },

        all_class: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await all_class(fastify, req);
            res.code(data.status).send(data);
        },

        classes: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await classes(fastify, req);
            res.code(data.status).send(data);
        },

        shifts: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await shifts(fastify, req);
            res.code(data.status).send(data);
        },

        branches: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await branches(fastify, req);
            res.code(data.status).send(data);
        },

        sections: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await sections(fastify, req);
            res.code(data.status).send(data);
        },
        class_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await class_details(fastify, req);
            res.code(data.status).send(data);
        },

        full_details_update: async function (
            req: FastifyRequest,
            res: FastifyReply,
        ) {
            let data = await full_details_update(fastify, req);
            res.code(data.status).send(data);
        },

        store: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store(fastify, req);
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

        profile: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await profile(fastify, req);
            res.code(data.status).send(data);
        },

        admit_student: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await admit_student_store(fastify, req);
            res.code(data.status).send(data);
        },

        change_password: async function (
            req: FastifyRequest,
            res: FastifyReply,
        ) {
            let data = await change_password(fastify, req);
            res.code(data.status).send(data);
        },
        // export: async function (req: FastifyRequest, res: FastifyReply) {},
    };
}
