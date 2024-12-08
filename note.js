/* let data = new models.AccountLogsModel();
let image_path1 = '';

if (body['attachment']?.ext) {
    image_path1 =
        'uploads/accounts' +
        moment().format('YYYYMMDDHHmmss') +
        body['attachment'].name;
    await (fastify_instance as any).upload(body['attachment'], image_path1);
}
let income_attachments: anyObject[] = [];
for (let i = 0; i < parseInt(body.attachment?.length); i++) {
    let image_path = ``;
    let image_file = body.attachment[i];
    if (image_file?.ext) {
        image_path =
            'uploads/accounts' +
            moment().format('YYYYMMDDHHmmss') +
            image_file.name;
        await (fastify_instance as any).upload(image_file, image_path);
    }
    income_attachments.push({
        file: image_path,
    });
} */

/* 
    let user = (req as any).user;
    let auth_user = await models.BranchStaffsModel.findOne({
    where: {
        user_staff_id: (req as any).user.id,
    },
}); 
*/

/* branch_id: auth_user?.branch_id || 1,
   creator: user?.id || null,
*/
