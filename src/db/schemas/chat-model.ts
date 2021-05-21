import { Schema, Document, Model, model } from 'mongoose';

export interface IMessage extends Document {
    content?: string;
    color?: string;
}

export interface IUser extends Document {
    username: string;
    password: string;
    messages?: IMessage[];
    friends: string[];
    avatar?: string;
    email?: string;
    birthday?: Date;
    phone?: number;
    nickname?: string;
}

export interface IGroup extends Document {
    groupname: string;
    members: [IUser];
}

const message = new Schema({
    content: { type: String },
    color: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const user = new Schema({
    username: { type: String, maxlength: 20, lowercase: true, unique: true, required: true },
    password: { type: String, maxlength: 10, required: true},
    messages: { type: [message] },
    friends: { type: [String] },
    avatar: { type: String },
    birthday: { type: Date },
    email: { type: String },
    phone: { type: Number, maxlength: 11 },
    nickname: { type: String },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const group = new Schema({
    groupname: { type: String, maxlength: 20 },
    members: { type: [user], require: true }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

export const Message: Model<IMessage> = model<IMessage>('Message', message, 'Messages');
export const User: Model<IUser> = model<IUser>('User', user, 'Users');
export const Group: Model<IGroup> = model<IGroup>('Group', group, 'Groups');