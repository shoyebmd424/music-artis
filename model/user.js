const { DataTypes } = require('sequelize');
const sequelize = require("../config/dBConnect");
const bcrypt = require('bcryptjs');

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
    defaultValue: 'USER',
  },
  spotifyUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instagramUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  profile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // country: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  forget: {
    type: DataTypes.JSON,  
    allowNull: true,
  }
}, {
  timestamps: true,
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      }
    }
  }
});

User.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch(err => {
    console.error('Error creating User table:', err);
  });

module.exports = User;
