import mongoose from "mongoose";

/*
|--------------------------------------------------------------------------
| User Schema
|--------------------------------------------------------------------------
| This schema defines the structure of a User document
| in the MongoDB "users" collection.
|
| Think of schema as a blueprint that enforces rules
| on how user data should look.
*/

const userSchema = new mongoose.Schema(
  {
    /*
    | User's full name
    */
    name: {
      type: String,     // must be a string
      required: true,   // field is mandatory
      trim: true        // removes extra spaces from start & end
    },

    /*
    | User's email address
    */
    email: {
      type: String,
      required: true,
      unique: true,     // ensures no duplicate emails
      lowercase: true   // automatically converts email to lowercase
    },

    /*
    | Hashed password
    | NEVER store plain-text passwords
    */
    password: {
      type: String,
      required: true
    }
  },
  {
    /*
    | Automatically adds:
    | createdAt → when user is created
    | updatedAt → when user is updated
    */
    timestamps: true
  }
);

/*
|--------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------
| mongoose.model():
| - Creates a model using the schema
| - Connects it to the "users" collection
|
| This model is used to:
| - create users
| - find users
| - update users
*/
const User = mongoose.model("User", userSchema);

// Export model so controllers can use it
export default User;
