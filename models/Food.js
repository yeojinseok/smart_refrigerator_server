module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Food', {
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
    calorie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    protein: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carbs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  })
}
