var postgres = require('pg');

var Schema = postgres.schema;



var TaskSchema = new Schema({
    name: {
      type: String,
      required: 'Enter the name of the task'
    },
    Created_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }],
      default: ['pending']
    }
  });
  
  module.exports = postgres.model('Tasks', TaskSchema);