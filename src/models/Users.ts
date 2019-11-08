import mongoose, {Schema} from "mongoose";

export type UserDocument = mongoose.Document & {
    username: string;
    hash: string;
}

export const userSchema: Schema = new Schema({
    username: {type: String, required: true, index: true, unique: true},
    hash: {type: String, required: true}
});

export const Users = mongoose.model<UserDocument>('Users', userSchema);
