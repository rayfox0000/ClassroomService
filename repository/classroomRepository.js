const dbService = require("../services/dbservice");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ClassroomModel = require("./../models/classroom");
const TeacherModel = require("./../models/teacher");
const StudentModel = require("./../models/student");
const utils = require("./../helpers/utils");
const _ = require("lodash");

async function create(studentResult, teacherResult) {
    try {
        var result = [];
        var sequelize = dbService.getSequelize();
        var Classroom = ClassroomModel(sequelize, Sequelize);
        var Teacher = TeacherModel(sequelize, Sequelize);
        var Student = StudentModel(sequelize, Sequelize);

        Classroom.belongsTo(Teacher, { foreignKey: 'teacherId', targetKey: 'id' });
        Classroom.belongsTo(Student, { foreignKey: 'studentId', targetKey: 'id' });

        var targetBody = utils.generateCreateClassroomSchema(studentResult, teacherResult);
        for (var i in targetBody) {
            var createResult = await Classroom.findOrCreate({
                raw: true,
                where: { "studentId": targetBody[i].studentId, "teacherId": targetBody[i].teacherId },
                defaults: {
                    "studentId": targetBody[i].studentId,
                    "teacherId": targetBody[i].teacherId,
                    "createdAt": new Date().toISOString(),
                    "updatedAt": new Date().toISOString()

                }

            }).catch((err) => {
                console.log('failed to create teacher');
                console.log(err);
            })

            result.push(createResult[0]);
        }
        return result;
    } catch (e) {
        throw e;
    }

}

async function getStudentsJoin(teachers) {
    var result = [];
    var sequelize = dbService.getSequelize();
    var Classroom = ClassroomModel(sequelize, Sequelize);
    var Teacher = TeacherModel(sequelize, Sequelize);
    var Student = StudentModel(sequelize, Sequelize);
    Teacher.belongsToMany(Student, { as: "students", through: Classroom, foreignKey: 'teacherId' })
    Student.belongsToMany(Teacher, { as: "teachers", through: Classroom, foreignKey: 'studentId' })

    try {
        result = await Teacher.findAll({
            where: { "email": teachers }, include: [
                {
                    raw: true,
                    model: Student,
                    as: "students",
                    attributes: ["email"],
                    through: {
                        attributes: [],
                    }
                },
            ]
        }).catch((err) => {
            console.log('failed to create teacher');
            console.log(err);
        })

        return [null, result];
    } catch (e) {
        throw e;
    }



}

async function getNotificationStudents(teacher, students) {
    var result = [];
    var sequelize = dbService.getSequelize();
    var Classroom = ClassroomModel(sequelize, Sequelize);
    var Teacher = TeacherModel(sequelize, Sequelize);
    var Student = StudentModel(sequelize, Sequelize);
    Teacher.belongsToMany(Student, { as: "students", through: Classroom, foreignKey: 'teacherId' })
    Student.belongsToMany(Teacher, { as: "teachers", through: Classroom, foreignKey: 'studentId' })


    try {
        var result = await Classroom.findAll({
            where: {
                email: {
                    "email": teacher,
                    [Op.in]: students
                }
            }, include: [
                {
                    raw: true,
                    model: Student,
                    as: "students",
                    attributes: ["email"],
                    through: {
                        attributes: [],
                    }
                },
            ]
        }).catch((err) => {
            console.log('failed to get students');
            console.log(err);

        })
        return [null, result];

    } catch (e) {
        throw e;
    }



}




module.exports = {
    create,
    getStudentsJoin,
    getNotificationStudents

}