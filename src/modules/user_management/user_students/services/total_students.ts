import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function total_students(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let informationsModel = models.UserStudentInformationsModel;
    let params = req.params as any;
    let user = (req as any).user;
    let auth_user;
    auth_user = await models.UserAdminsModel.findOne({
        where: {
            id: user?.id || null,
        },
    });

    try {
        let data = await informationsModel.count({
            where: {
                branch_id: auth_user?.branch_id,
                status: 'active',
            },
        });
        let data2 = await informationsModel.findAll({
            where: {
                branch_id: auth_user?.branch_id,
                status: 'active',
            },
            attributes: ['blood_group', 'gender'],
        });
        // const bloodGroupCount = {};
        // Convert Sequelize models to plain objects
        const plainData = data2.map((item: any) => item.dataValues);

        // ------------------------------
        // BLOOD GROUP COUNT
        // ------------------------------
        const bloodGroupCount: Record<string, number> = {};

        plainData.forEach((item) => {
            const group = item.blood_group;
            bloodGroupCount[group] = (bloodGroupCount[group] || 0) + 1;
        });

        const student_bloodGroup = Object.keys(bloodGroupCount).map(
            (group) => ({
                group,
                count: bloodGroupCount[group],
            }),
        );

        // ------------------------------
        // GENDER COUNT
        // ------------------------------
        const genderCount: Record<string, number> = {};

        plainData.forEach((item) => {
            const gender = item.gender;
            genderCount[gender] = (genderCount[gender] || 0) + 1;
        });

        const student_gender = Object.keys(genderCount).map((gender) => ({
            gender,
            count: genderCount[gender],
        }));
        if (data) {
            return response(200, 'data created', {
                total_students: data,
                blood_group: student_bloodGroup,
                gender: student_gender,
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

export default total_students;
