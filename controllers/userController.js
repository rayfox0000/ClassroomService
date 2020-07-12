const _ = require("lodash");
const userRepository = require("./../repository/studentRepository");
const teacherRepository = require("./../repository/teacherRepository");
const utils = require("./../helpers/utils");
const classroomRepository = require("../repository/classroomRepository");
const studentRepository = require("./../repository/studentRepository");

async function createUser(body) {
    var result = null;
    var students = [];
    var teacherResult = null;
    var studentsError = null;
    var teachersError = null;
    var classroomError = null;
    var classroomResult = null;
    try {
        if (_.isEmpty(body)) {
            return [{ message: "Must contains students/teacher data" }]
        }


        if (body.students) {
            var students = utils.generateCreateStudentSchema(body.students);
            [studentsError, result] = await userRepository.create(students);
        }
        if (body.teacher) {
            [teachersError, teacherResult] = await teacherRepository.create(body.teacher);
        }
        if (result && teacherResult) {
            [classroomResult] = await classroomRepository.create(result, teacherResult);
        }

        if (studentsError || teachersError || classroomError) {
            return [{ message: "Insert/Get Database Error" }]
        }
        return [null, classroomResult]
    } catch (e) {
        throw e;
    }


}

async function suspendUser(body) {
    var result = null;
    try {
        if (_.isEmpty(body)) {
            return [{ message: "Must contains students/teacher data" }]
        }

        if (body.student) {
            var deleteStudentSchema = utils.generateDeleteStudent(body.student);
            [studentsError, result] = await userRepository.deleteUser(deleteStudentSchema);
        } else {
            return [{ message: "Does not exist" }]
        }

        return [null, result]
    } catch (e) {
        throw e;
    }
}

async function getStudents(query) {
    var teachers = query.teachers;
    var studentResultList = {
        students: []
    };
    try {
        [classroomError, result] = await classroomRepository.getStudentsJoin(teachers);
        if (result) {
            for (var i in result) {
                var dataValues = result[i].dataValues;
                for (var j in dataValues.students) {
                    var studentDataValues = dataValues.students[j].dataValues;
                    studentResultList.students.push(studentDataValues.email);
                }
            }
        }

        return [null, studentResultList];
    } catch (e) {
        throw e;
    }

}

async function getNotificationStudents(query) {
    var notification = query.notification;
    var listOfEmail = utils.extractEmails(notification);
    var studentResultList = {
        students: []
    };
    var teacher = query.teacher;
    try {
        [classroomError, result] = await classroomRepository.getStudentsJoin(teacher);
        if (result) {
            for (var i in result) {
                var dataValues = result[i].dataValues;
                for (var j in dataValues.students) {
                    var studentDataValues = dataValues.students[j].dataValues;
                    studentResultList.students.push(studentDataValues.email);
                }
            }
        }
        studentResultList.students = Array.from(new Set(listOfEmail.concat(studentResultList.students)));

        return [null, studentResultList];
    } catch (e) {
        throw e;
    }

}



module.exports = {
    createUser,
    getStudents,
    suspendUser,
    getNotificationStudents
}