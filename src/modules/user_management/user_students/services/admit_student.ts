import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';

async function validate(req: Request) {
    // await body('name')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the name field is required')
    //     .run(req);

    // await body('email')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the email field is required')
    //     .run(req);

    // await body('gender')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the gender field is required')
    //     .run(req);

    // await body('phone_number')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the phone_number field is required')
    //     .run(req);

    // await body('password')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the password field is required')
    //     .run(req);

    // await body('role_no')
    //     .not()
    //     .isEmpty()
    //     .withMessage('the role_no field is required')
    //     .run(req);

    let result = await validationResult(req);

    return result;
}

async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = await db();
    let body = req.body as anyObject;
    let data = new models.UserStudentsModel();
    let useb_model = new models.UserStudentEducationalBackgroundsModel();
    let usdt_model = new models.UserStudentDocumentTitlesModel();
    let usdv_model = new models.UserStudentDocumentValuesModel();
    let usi_model = new models.UserStudentInformationsModel();
    let usp_model = new models.UserStudentParentsModel();
    let uscn_model = new models.UserStudentContactNumbersModel();
    let usl_model = new models.UserStudentLanguagesModel();
    let uss_model = new models.UserStudentSkillsModel();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.password, saltRounds);

    let inputs: InferCreationAttributes<typeof data> = {
        parent_id: body.parent_id,
        name: body.name,
        email: body.email,
        phone_number: body.phone_number,
        // image: body.image,
        password: password,
    };

    console.log('body data', body);

    let usi_inputs: InferCreationAttributes<typeof usi_model> = {
        user_student_id: body.user_student_id,
        branch_id: body.branch_id,
        present_address: body.present_address,
        permanent_address: body.permanent_address,
        date_of_birth: body.date_of_birth,
        gender: body.gender,
        nationality: body.nationality,
        city: body.city,
        state: body.state,
        post_code: body.post_code,
        country: body.country,
        medical_condition: body.medical_condition,
        current_medications: body.current_medications,
        telegram_name: body.telegram_name,
        telegram_id: body.telegram_id,
        student_id: body.student_id,
        blood_group: body.blood_group,
        student_expire_date: body.student_expire_date,
        admission_date: body.admission_date,
        addmission_no: body.addmission_no,
        role_no: body.role_no,
        section: body.section,
        s_class: body.s_class,
        shift: body.shift,
        division: body.division,
        family_information: body.family_information,
        shibling_information: body.shibling_information,
        // birth_certificate: body.birth_certificate,
        national_id: body.national_id,
        student_category: body.student_category,
        religion: body.religion,
        cast: body.cast,
        student_house: body.student_house,
        living_house_type: body.living_house_type,
        height: body.height,
        weight: body.weight,
        as_on_date: body.as_on_date,
    };

    let useb_inputs: InferCreationAttributes<typeof useb_model> = {
        user_student_id: body.user_student_id,
        previous_institute: body.previous_institute,
        year_of_leaving: body.year_of_leaving,
        result: body.result,
        transcript_cirtificate: body.transcript_cirtificate,
    };

    // let usdt_inputs: InferCreationAttributes<typeof usdt_model> = {
    //     user_student_id: body.user_student_id,
    //     title: body.document_title,
    // };

    // let usdv_inputs: InferCreationAttributes<typeof usdv_model> = {
    //     user_student_id: body.user_student_id,
    //     user_student_document_title_id: body.user_student_document_title_id,
    //     file: body.document_file,
    //     issue_date: body.issue_date,
    //     expire_date: body.expire_date,
    // };

    // let usp_inputs: InferCreationAttributes<typeof usp_model> = {
    //     user_student_id: body.user_student_id,
    //     relation: body.relation,
    //     is_parent: body.is_parent,
    //     user_student_parent_id: body.user_student_parent_id,
    // };

    // let uscn_inputs: InferCreationAttributes<typeof uscn_model> = {
    //     user_student_id: body.user_student_id,
    //     contact_number: body.contact_number,
    //     owner: body.owner,
    //     branch_id: body.branch_id,
    // };

    // let usl_inputs: InferCreationAttributes<typeof usl_model> = {
    //     user_student_id: body.user_student_id,
    //     language_title: body.language_title,
    //     profeciency: body.profeciency,
    //     branch_id: body.branch_id,
    // };

    // let uss_inputs: InferCreationAttributes<typeof uss_model> = {
    //     user_student_id: body.user_student_id,
    //     title: body.skills_title,
    //     level: body.level,
    //     branch_id: body.branch_id,
    // };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        (await usi_model.update(usi_inputs)).save();
        (await useb_model.update(useb_inputs)).save();
        return response(200, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
