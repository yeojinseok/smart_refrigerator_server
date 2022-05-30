module.exports = (sequelize, DataTypes) => {
  return sequelize.define('RefrigeratorLog', {
    // 열 (Column) 정의
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    food: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    // receiveUserCredit: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // }
  })
}
