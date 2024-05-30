import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../common_types/object';
import db from '../models/db';
import { env } from 'process';

const check_is_admin_and_redirect = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');
    // const token = request.headers.authorization;
    const token = request.cookies.token;
    const user_agent = request.headers['user-agent'];

    if (!token || !token.startsWith('Bearer ')) {
        return reply.redirect('/admin/login');
    }

    try {
        const decoded = jwt.verify(token.slice(7), secretKey);
        let models = await db();
        let user = await models.UserAdminsModel.findByPk(decoded.id);
        if (
            user &&
            user.token == decoded.token &&
            decoded.user_agent == user_agent
        ) {
            (request as anyObject).user = decoded;
            return;
        } else {
            return reply.redirect('/admin/login');
        }
    } catch (error) {
        return reply.redirect('/admin/login');
    }
};

export default check_is_admin_and_redirect;
