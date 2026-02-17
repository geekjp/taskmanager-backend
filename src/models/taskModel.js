import mongoose from "mongoose";

/*
|--------------------------------------------------------------------------
| Task Schema
|--------------------------------------------------------------------------
| This schema defines the structure of a Task document
| stored in the MongoDB "tasks" collection.
|
| Each task:
| - belongs to a specific user
| - has a status
| - tracks creation and update timestamps
*/

const taskSchema = new mongoose.Schema(
  {
    /*
    | Task title
    | - Required field
    | - trim removes extra spaces
    */
    title: {
      type: String,
      required: true,
      trim: true
    },

    /*
    | Task status
    | - enum restricts values to allowed options
    | - default value is "pending"
    */
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },

    /*
    | Task owner (Relationship with User model)
    | - Stores User's ObjectId
    | - ref tells Mongoose which model this ID belongs to
    | - Used later with populate()
    */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This ObjectId references the User model
      required: true
    }
  },
  {
    /*
    | Automatically adds:
    | - createdAt
    | - updatedAt
    */
    timestamps: true
  }
);

/*
|--------------------------------------------------------------------------
| Task Model
|--------------------------------------------------------------------------
| mongoose.model():
| - Creates a model named "Task"
| - Connects taskSchema to the "tasks" collection
|
| This model provides built-in CRUD methods:
| Task.create()
| Task.find()
| Task.findById()
| Task.findByIdAndUpdate()
| Task.findByIdAndDelete()
*/
const Task = mongoose.model("Task", taskSchema);

// Export model to be used in controllers
export default Task;
