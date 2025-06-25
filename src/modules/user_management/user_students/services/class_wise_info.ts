import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { sequelize } from '../../../../bootstrap/db.sql';

async function class_wise_info(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let informationsModel = models.UserStudentInformationsModel;
    let user_id = (req as any).user?.id;
    console.log('user', user_id);
    let params = req.params as any;

    try {
        let bclass = await models.BranchClassesModel.findOne({
            where: {
                id: params.class_id,
            },
        });

        let data = await informationsModel.findOne({
            where: {
                s_class: params.class_id,
            },
            order: [['id', 'DESC']],
            attributes: ['student_id', 'role_no', 'addmission_no'], // spelling retained if DB uses it
        });

        // Function to extract numeric part and increment
        const increment = (value?: string): string => {
            if (!value) return '';
            const numericPart = parseInt(value.replace(/\D/g, ''), 10);
            return value.replace(/\d+/, (num) =>
                (numericPart + 1).toString().padStart(num.length, '0'),
            );
        };

        let transformedData;

        if (!data) {
            const base1 = `${bclass?.name?.toLowerCase() || 'class'}01`;
            const base2 = '01';
            const base3 = `A${bclass?.name?.toLowerCase() || 'class'}01`;

            transformedData = {
                student_id: base1,
                role_no: base2,
                admission_no: base3,
            };
        } else {
            transformedData = {
                student_id: increment(data.student_id || ''),
                role_no: increment(data.role_no || ''),
                admission_no: increment(data.addmission_no || ''),
            };
        }

        return response(200, 'data created', transformedData);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.params);

        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }

        throw error;
    }
}

export default class_wise_info;
