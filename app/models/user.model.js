const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessRn: { type: String, required: true, unique: true },
    businessAddress: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("User", UserSchema);
