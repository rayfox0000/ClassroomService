const dbService = require("../services/dbservice");
const Sequelize = require('sequelize');
const TeacherModel = require('./../models/teacher');

async function create(teacherEmail) {
    var result = null;
    try {
        var sequelize = await dbService.getSequelize();
        var Teacher = TeacherModel(sequelize, Sequelize);

        result = await Teacher.findOrCreate({
            raw: true,
            where: { "email": teacherEmail },
            defaults: {
                "email": teacherEmail,
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString()

            }

        }).catch((err) => {
            console.log('failed to create teacher');
            console.log(err);
        })

    } catch (e) {
        return [e];
    }
    return [null, result[0]];

}

module.exports = {
    create
};