import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { sequelize } from '../../../../bootstrap/db.sql';
import { Sequelize } from 'sequelize';

async function fees_categories_second(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let accountFeesCollectionDetailsModel =
        models.AccountFeesCollectionDetailsModel;
    let informationsModel = models.UserStudentInformationsModel;
    let studentsModel = models.UserStudentsModel;
    let classFeesTypesModel = models.BranchClassFeeTypesModel;
    let classesModel = models.BranchClassesModel;
    let classFeessModel = models.BranchClassFeesModel;
    let params = req.params as any;
    let user_id = (req as any).user?.id;
    console.log('user', user_id);

    try {
        let data = await classFeessModel.findAll({
            where: {
                // branch_class_id: params.class,
                branch_class_id: 1,
            },
            include: [
                {
                    model: classFeesTypesModel,
                    as: 'fees_types',
                },
            ],
        });
        // let category_wise_total = await accountFeesCollectionDetailsModel.sum(
        //     'total',
        //     {
        //         where: {
        //             branch_student_id: 22,
        //             branch_class_fees_id: 1,
        //         },
        //     },
        // );
        // Convert `data` to JSON if it's not already
        data = data.map((item) => item.toJSON());

        // Initialize an empty array to hold totals for each ID
        let idWiseTotals = [];

        // Loop through each item in `data` to calculate totals
        for (let item of data) {
            const total = await accountFeesCollectionDetailsModel.sum('total', {
                where: {
                    branch_student_id: 22, // Hardcoded for demonstration
                    branch_class_fees_id: item.id, // Compare with each ID
                },
            });

            // Push the total along with the associated ID to the result array
            idWiseTotals.push({
                id: item.id,
                name: item.name,
                total: total || 0, // Ensure a fallback of 0 if no records are found
            });
        }
        if (data) {
            return response(200, 'data created', { data, idWiseTotals });
        } else {
            throw new custom_error('not found', 404, 'data not found');
        }
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

export default fees_categories_second;
