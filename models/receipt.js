module.exports = (sequelize, DataTypes) => {
    return sequelize.define('receipt', {
        // 열 (Column) 정의

        money: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sendUserCredit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiveUserCredit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });
}