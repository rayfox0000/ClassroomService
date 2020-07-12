function generateCreateStudentSchema(rawStudents) {
    var students = [];
    for (var i in rawStudents) {
        students.push({ email: rawStudents[i] });
    }

    return students;
}

function generateTeacherSchema(rawTeacher) {

}

function generateCreateClassroomSchema(rawStudents, rawTeachers) {
    var schema = []
    for (var i in rawStudents) {
        var obj = {
            "studentId": rawStudents[i].id,
            "teacherId":
                rawTeachers.id,
        }
        schema.push(obj);
    }

    return schema;
}

function generateDeleteStudent(student) {
    return {
        "email": student
    }
}

function extractEmails(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}
module.exports = {
    generateCreateStudentSchema,
    generateDeleteStudent,
    generateCreateClassroomSchema,
    extractEmails
}