import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { sequelize } from '../../../../bootstrap/db.sql';
import { Sequelize } from 'sequelize';
import moment from 'moment/moment';

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
    console.log('today month', moment().format('MMMM'));

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
        // Convert `data` to JSON if it's not already
        data = data.map((item) => item.toJSON());

        // Initialize an empty array to hold totals for each ID
        let idWiseTotals = [];
        // Loop through each item in `data` to calculate totals
        for (let item of data) {
            // Calculate `total` for each ID
            const total = await accountFeesCollectionDetailsModel.sum('total', {
                where: {
                    branch_student_id: 22, // Hardcoded for demonstration
                    branch_class_fees_id: item.id, // Compare with each ID
                },
            });

            let fee_amount = 0;

            // Check if the `item.name` is "monthly fee"
            // if (item.name === 'monthly fee') {
            //     // Sum all fee amounts for "monthly fee"
            //     fee_amount = await accountFeesCollectionDetailsModel.sum(
            //         'fee_amount',
            //         {
            //             where: {
            //                 branch_student_id: 22, // Hardcoded for demonstration
            //                 branch_class_fees_id: item.id, // Compare with each ID
            //             },
            //         },
            //     );
            // Check if the `item.name` is "monthly fee"
            if (item.name === 'Monthly fee') {
                let thisMonth = moment().format('MMMM');
                // let thisMonth = 'July';
                console.log('thsimonth', thisMonth);
                // For other cases, retrieve the fee amount only once
                const feeRecord =
                    await accountFeesCollectionDetailsModel.findOne({
                        where: {
                            branch_student_id: 22, // Hardcoded for demonstration
                            branch_class_fees_id: item.id, // Compare with each ID
                        },
                        attributes: ['fee_amount'], // Fetch only `fee_amount` field
                    });
                let fee = feeRecord ? feeRecord.fee_amount : 0;
                if (thisMonth === 'January') {
                    fee_amount = fee * 1;
                } else if (thisMonth === 'February') {
                    fee_amount = fee * 2;
                } else if (thisMonth === 'March') {
                    fee_amount = fee * 3;
                } else if (thisMonth === 'April') {
                    fee_amount = fee * 4;
                } else if (thisMonth === 'May') {
                    fee_amount = fee * 5;
                } else if (thisMonth === 'June') {
                    fee_amount = fee * 6;
                } else if (thisMonth === 'July') {
                    fee_amount = fee * 7;
                } else if (thisMonth === 'August') {
                    fee_amount = fee * 8;
                } else if (thisMonth === 'September') {
                    fee_amount = fee * 9;
                } else if (thisMonth === 'October') {
                    fee_amount = fee * 10;
                } else if (thisMonth === 'November') {
                    fee_amount = fee * 11;
                } else if (thisMonth === 'December') {
                    fee_amount = fee * 12;
                }
            } else {
                // For other cases, retrieve the fee amount only once
                const feeRecord =
                    await accountFeesCollectionDetailsModel.findOne({
                        where: {
                            branch_student_id: 22, // Hardcoded for demonstration
                            branch_class_fees_id: item.id, // Compare with each ID
                        },
                        attributes: ['fee_amount'], // Fetch only `fee_amount` field
                    });
                fee_amount = feeRecord ? feeRecord.fee_amount : 0;
            }

            // Push the total along with the associated ID to the result array
            idWiseTotals.push({
                id: item.id,
                name: item.name,
                total: total || 0, // Ensure a fallback of 0 if no records are found
                fee_amount: fee_amount || 0, // Ensure a fallback of 0 if no records are found
                due_amount: (total || 0) - (fee_amount || 0), // Calculate the due amount
            });
        }
        // Calculate overall totals
        const summary = idWiseTotals.reduce(
            (acc, curr) => {
                acc.total += curr.total || 0;
                acc.fee_amount += curr.fee_amount || 0;
                acc.due_amount += curr.due_amount || 0;
                return acc;
            },
            { total: 0, fee_amount: 0, due_amount: 0 },
        );
        if (data) {
            return response(200, 'data created', {
                data,
                idWiseTotals,
                summary,
            });
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
