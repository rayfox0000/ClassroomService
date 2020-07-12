module.exports = (sequelize, type) => {
    return sequelize.define('classrooms', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentId: {
            //FK belongs to Student Table
            type: type.INTEGER,
            allowNull: false
        },
        teacherId: {
            //FK  belongs to Teacher Table
            type: type.INTEGER,
            allowNull: false
        }
    })
}