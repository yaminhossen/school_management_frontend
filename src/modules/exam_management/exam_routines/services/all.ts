import { FindAndCountOptions } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import moment from 'moment';

async function all(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let query_param = req.query as any;

    const { Op } = require('sequelize');
    let search_key = query_param.search_key;
    let orderByCol = query_param.orderByCol || 'id';
    let orderByAsc = query_param.orderByAsc || 'true';
    let show_active_data = query_param.show_active_data || 'true';
    let paginate = parseInt((req.query as any).paginate) || 10;
    let select_fields: string[] = [];

    if (query_param.select_fields) {
        select_fields = query_param.select_fields.replace(/\s/g, '').split(',');
        select_fields = [...select_fields, 'id', 'status'];
    }

    const whereClause: any = {
        status: show_active_data === 'true' ? 'active' : 'deactive',
    };
    const today = moment().format('YYYY-MM-DD');
    console.log('todya', today);

    let month1 = query_param?.start_date || today; // Start date
    let month2 = query_param?.end_date || today;
    if (query_param?.start_date && query_param?.end_date) {
        const endDate = new Date(query_param.end_date);
        endDate.setDate(endDate.getDate() + 1); // Increment by one day
        const formattedEndDate = endDate.toISOString().split('T')[0];
        console.log('month2', formattedEndDate);

        whereClause.date = {
            [Op.between]: [query_param.start_date, formattedEndDate],
        };
    }
    let query: FindAndCountOptions = {
        order: [[orderByCol, orderByAsc == 'true' ? 'ASC' : 'DESC']],
        where: whereClause,
        include: [
            {
                model: models.BranchClassesModel,
                as: 'class',
            },
            {
                model: models.BrachClassSubjectsModel,
                as: 'subjects',
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
                { '$class.name$': { [Op.like]: `%${search_key}%` } },
                // { preferred_name: { [Op.like]: `%${search_key}%` } },
                { status: { [Op.like]: `%${search_key}%` } },
                { id: { [Op.like]: `%${search_key}%` } },
            ],
        };
    }

    try {
        let data = await (fastify_instance as anyObject).paginate(
            req,
            models.ExamRoutinesModel,
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
