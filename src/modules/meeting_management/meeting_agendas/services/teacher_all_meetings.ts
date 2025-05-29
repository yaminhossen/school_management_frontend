import { FindAndCountOptions } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function teacher_all_meetings(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** initializations */
    let models = await db();
    let query_param = req.query as any;

    const { Op } = require('sequelize');
    let search_key = query_param.search_key;
    let orderByCol = query_param.orderByCol || 'id';
    let orderByAsc = query_param.orderByAsc || 'true';
    let show_active_data = query_param.show_active_data || 'true';
    let select_fields: string[] = [];
    let exclude_fields: string[] = ['password'];

    if (query_param.select_fields) {
        select_fields = query_param.select_fields.replace(/\s/g, '').split(',');
        select_fields = [...select_fields, 'id', 'status'];
    } else {
        select_fields = [
            'id',
            'branch_id',
            'meeting_id',
            'title',
            'description',
            'is_complete',
        ];
    }

    let query: FindAndCountOptions = {
        order: [[orderByCol, orderByAsc == 'true' ? 'ASC' : 'DESC']],
        where: {
            status: show_active_data == 'true' ? 'active' : 'deactive',
            role: 'teacher',
            is_complete: 'pending',
        },
        attributes: {
            include: select_fields,
            exclude: exclude_fields,
        },
    };

    if (search_key) {
        query.where = {
            ...query.where,
            [Op.or]: [
                { title: { [Op.like]: `%${search_key}%` } },
                { description: { [Op.like]: `%${search_key}%` } },
                { status: { [Op.like]: `%${search_key}%` } },
                { id: { [Op.like]: `%${search_key}%` } },
            ],
        };
    }

    try {
        let data = await models.MeetingAgendasModel.findAndCountAll(query);
        return response(200, 'teacher all meetings count fetched', {
            length: data.count,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.query);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default teacher_all_meetings;
