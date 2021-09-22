const User = require('./user')

const getUserById = (id) => {
  return User.findById(id).exec()
}

const getAllUsers = () => {
  return User.find({}).exec()
}

const createUser = (userDetails) => {
  return User.create(userDetails)
}
const removeUserById = (id) => {
  return User.findByIdAndRemove(id).exec()
}

const updateUserById = (id, update) => {
  return User.findByIdAndUpdate(id, update, {new: true})
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}



// Note: always use .exec() to the end of the query foravoiding unwanted bugs
//       when you find and update, don't forget to add one more object which returns updated object which is {new: true}
