import { FindAndCountOptions } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import moment from 'moment/moment';

async function all(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let query_param = req.query as any;
    let leave_type_model = models.LeaveTypesModel;

    const { Op } = require('sequelize');
    let search_key = query_param.search_key;
    let orderByCol = query_param.orderByCol || 'id';
    let orderByAsc = query_param.orderByAsc || 'true';
    let show_active_data = query_param.show_active_data || 'true';
    let paginate = parseInt((req.query as any).paginate) || 10;
    let select_fields: string[] = [];
    let user = (req as any).user;
    let auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: user?.id || null,
        },
    });

    if (query_param.select_fields) {
        select_fields = query_param.select_fields.replace(/\s/g, '').split(',');
        select_fields = [...select_fields, 'id', 'status'];
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day
    const whereClause: any = {
        status: show_active_data === 'true' ? 'active' : 'deactive',
        leave_status: 'pending',
        branch_id: auth_user?.branch_id,
        // start_date: {
        //     [Op.lte]: today,
        // },
    };
    if (query_param?.start_date && query_param?.end_date) {
        const endDate = new Date(query_param.end_date);
        endDate.setDate(endDate.getDate() + 1); // Increment by one day
        const formattedEndDate = endDate.toISOString().split('T')[0];

        whereClause.created_at = {
            [Op.between]: [query_param.start_date, formattedEndDate],
        };
        // whereClause.where = 'pending';
    }
    let query: FindAndCountOptions = {
        order: [
            // [orderByCol, orderByAsc === 'true' ? 'ASC' : 'DESC'],
            ['start_date', orderByAsc === 'true' ? 'DESC' : 'ASC'],
            ['id', orderByAsc === 'true' ? 'ASC' : 'DESC'],
        ],
        where: whereClause,
        include: [
            {
                model: leave_type_model,
                as: 'leave_type',
            },
        ],
    };

    if (select_fields.length) {
        query.attributes = select_fields;
    }

    if (search_key) {
        query.where = {
            ...query.where,
            [Op.or]: [
                { leave_status: { [Op.like]: `%${search_key}%` } },
                { '$leave_type.title$': { [Op.like]: `%${search_key}%` } },
                { status: { [Op.like]: `%${search_key}%` } },
                { id: { [Op.like]: `%${search_key}%` } },
            ],
        };
    }

    try {
        let data = await (fastify_instance as anyObject).paginate(
            req,
            models.LeaveApplicationsModel,
            paginate,
            query,
        );
        return response(200, 'data fetched', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.query);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default all;
