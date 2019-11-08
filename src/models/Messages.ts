import mongoose, {Schema} from "mongoose";

export type MessageDocument = mongoose.Document & {
    userId: string,
    content: string,
    timestamp: Date,
    latitude: number,
    longitude: number,
    species: string,
    abundance: number,
    temperature: number,
    image: string
}

export const messageSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: true},
    timestamp: {type: Date, required: true},
    latitude: {type: Number},
    longitude: {type: Number},
    species: {type: String},
    temperature: {type: Number},
    abundance: {type: Number},
    image: {type: String}
});

export const Messages = mongoose.model<MessageDocument>('Messages', messageSchema);
