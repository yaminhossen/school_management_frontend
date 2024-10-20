import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../common_types/object';
import db from '../models/db';
import { env } from 'process';

const check_auth = async (request: FastifyRequest, reply: FastifyReply) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');
    // const token = request.headers.authorization;
    const token = request.cookies.token;
    const user_agent = request.headers['user-agent'];

    if (!token || !token.startsWith('Bearer ')) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token.slice(7), secretKey);
        let models = await db();
        let user: any = {};
        if (decoded.user_type == 'staff') {
            user = await models.UserStaffsModel.findByPk(decoded.id);
        } else {
            user = await models.User.findByPk(decoded.id);
        }

        if (user && user.token == decoded.token) {
            (request as anyObject).user = decoded;
            return;
        } else {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }
    } catch (error) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }
};

export default check_auth;
