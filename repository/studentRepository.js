const dbService = require("../services/dbservice");
const Sequelize = require('sequelize');
const StudentModel = require('./../models/student');


async function create(students) {
    var result = [];
    try {
        var sequelize = await dbService.getSequelize();
        var Student = StudentModel(sequelize, Sequelize);
        for (var i in students) {
            var createResult = await Student.findOrCreate({
                raw: true,
                where: { "email": students[i].email },
                defaults: {
                    "email": students[i].email,
                    "createdAt": new Date().toISOString(),
                    "updatedAt": new Date().toISOString()

                }

            }).catch((err) => {
                console.log('failed to create teacher');
                console.log(err);
            })

            result.push(createResult[0]);
        }
    } catch (e) {
        throw e;
    }
    return [null, result];

}


async function deleteUser(deleteStudentSchema) {
    try {
        var sequelize = await dbService.getSequelize();
        var Student = StudentModel(sequelize, Sequelize);

        var result = await Student.destroy({
            where: deleteStudentSchema
        }).catch((err) => {
            console.log('failed to create teacher');
            console.log(err);
        })
        return [null, result]

    } catch (e) {
        throw e;
    }
}

module.exports = {
    create,
    deleteUser
};