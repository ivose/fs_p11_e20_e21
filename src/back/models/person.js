module.exports = {
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /(\d{2}-\d+)|(\d{3}-\d+)/.test(v)
      },
      message: props => `${props.value} is not a valid phone number, it has to be e.g '09-1234556' or '040-22334455'!`
    },
    required: true
  },
}