
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
     
        id: { 
            type: DataTypes.STRING(200), 
            primaryKey: true, 
 
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,       
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        credit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },

    });
}