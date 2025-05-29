import { FindAndCountOptions } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import moment from 'moment/moment';

async function teacher_pending_tasks(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** initializations */
    let models = await db();
    let query_param = req.query as any;
    let user = (req as any).user;
    let auth_user = await models.BranchTeachersModel.findOne({
        where: {
            user_teacher_id: user?.id || null,
        },
    });

    const { Op } = require('sequelize');
    let orderByCol = query_param.orderByCol || 'id';
    let orderByAsc = query_param.orderByAsc || 'true';
    let show_active_data = query_param.show_active_data || 'true';
    let select_fields: string[] = [];
    let exclude_fields: string[] = ['password'];

    if (query_param.select_fields) {
        select_fields = query_param.select_fields.replace(/\s/g, '').split(',');
        select_fields = [...select_fields, 'id', 'status'];
    } else {
        select_fields = ['id', 'branch_id', 'is_complete'];
    }

    const whereClause: any = {
        status: show_active_data == 'true' ? 'active' : 'deactive',
        is_complete: 'pending',
        teacher_id: user?.id,
    };
    const today = moment().format('YYYY-MM-DD');

    let month1 = query_param?.start_date || today;
    let month2 = query_param?.end_date || today;
    if (query_param?.start_date && query_param?.end_date) {
        const endDate = new Date(query_param.end_date);
        endDate.setDate(endDate.getDate() + 1);
        const formattedEndDate = endDate.toISOString().split('T')[0];
        whereClause.created_at = {
            [Op.between]: [query_param.start_date, formattedEndDate],
        };
    }

    let query: FindAndCountOptions = {
        order: [[orderByCol, orderByAsc == 'true' ? 'ASC' : 'DESC']],
        where: whereClause,
        include: [
            {
                model: models.TasksModel,
                as: 'tasks',
                where: {
                    status: 'active',
                    is_complete: 'pending',
                },
            },
        ],
        attributes: {
            include: select_fields,
            exclude: exclude_fields,
        },
    };

    try {
        let data = await models.TaskUsersModel.findAndCountAll(query);
        return response(200, 'teacher pending tasks count fetched', {
            length: data.count,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.query);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default teacher_pending_tasks;
