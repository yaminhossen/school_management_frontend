import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../common_types/object';
import db from '../models/db';
import { env } from 'process';

function parseCookieString(cookieString: any) {
    try {
        const cookieObj: any = {};
        const cookies = cookieString.split(';');
        cookies.forEach((cookie: any) => {
            const [key, value] = cookie.split('=');
            cookieObj[key.trim()] = decodeURIComponent(value);
        });
        return cookieObj;
    } catch (error) {
        return {};
    }
}

const auth_middleware = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');
    // const token = request.headers.authorization;
    const token = parseCookieString(request.headers.cookie)?.token;
    // const user_agent = request.headers['user-agent'];
    const fullUrl = request.url;
    const needUrl = fullUrl.split('/')[1];
    console.log('request token', token);
    console.log('request fullurl', needUrl);

    if (!token || !token.startsWith('Bearer ')) {
        return reply.redirect(`${fullUrl}/login`);
        // reply.code(401).send({ error: 'Unauthorized' });
        // return;
        // (decoded.user_type == 'account')
    }

    try {
        const decoded = jwt.verify(token.slice(7), secretKey);
        console.log('request decode', decoded);
        let models = await db();
        let user: any = {};
        if (needUrl == 'account') {
            user = await models.UserStaffsModel.findByPk(decoded.id);
        } else if (needUrl == 'staff') {
            user = await models.UserStaffsModel.findByPk(decoded.id);
        } else if (needUrl == 'teacher') {
            user = await models.UserTeachersModel.findByPk(decoded.id);
        } else if (needUrl == 'student') {
            user = await models.UserStudentsModel.findByPk(decoded.id);
        } else if (needUrl == 'parent') {
            user = await models.UserParentsModel.findByPk(decoded.id);
        } else {
            user = await models.User.findByPk(decoded.id);
        }
        // console.log('decoded', decoded);

        if (user && user.token == decoded.token) {
            (request as anyObject).user = decoded;
            return;
        } else {
            console.log('decoded user type', needUrl);

            // reply.code(401).send({ error: 'Unauthorized' });
            reply.redirect(`/${needUrl}/login`);
            return;
        }
    } catch (error) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }
};

export default auth_middleware;
