import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    created_on: Date;
    updated_on: Date;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    },
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
    id: false
});

userSchema.index({ name: 1, email: 1 }, { unique: true });

const User = (conn: mongoose.Connection): mongoose.Model<IUser> => 
    conn.model("User", userSchema);
export default User;
//export default mongoose.model<IUser>("User", userSchema);
