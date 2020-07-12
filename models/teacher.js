
module.exports = (sequelize, type) => {
    return sequelize.define('teachers', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,

        }, createdAt: {
            type: type.DATE,
        },
        updatedAt: {
            type: type.DATE,
        }

    })
}