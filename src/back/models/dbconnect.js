const mongoose = require('mongoose')
const { MONGODB_URI } = require('../config')

function getMongoose() {
  // eslint-disable-next-line
  console.log('connecting to mongo..')
  mongoose.connect(MONGODB_URI)
    .then(() => {
      // eslint-disable-next-line
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log('error connecting to MongoDB:', error.message)
    })
  return mongoose
}

/*mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
    module.exports.Collection = names;
  })
})*/

const getModel = (mongoose, name) => {
  const data = require('./' + name.toLocaleLowerCase())
  const schema = new mongoose.Schema(data)
  schema.set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  return mongoose.model(name, schema)
}

module.exports = { getMongoose, getModel }