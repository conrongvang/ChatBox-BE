import { isValidObjectId } from 'mongoose';
import { IData } from '../../socket-services/socket-data-model';
import { User, Group } from '../schemas/chat-model';
import { IResultType } from './service-result-type';

export const userReceiveMessage = async (userId: string, content?: string, color?: string, groupId?: string): Promise<IResultType> => {
    try {
        if (!isValidObjectId(userId)) return { err: true, notification: "Invalid user id" };
        if (!groupId)
            await User.updateOne(
                { _id: userId },
                { $push: {
                    messages: { content: content, color: color }
                }},
                { timestamps: true }
            );
        else {
            if (!isValidObjectId(groupId)) return { err: true, notification: "Invalid group id" };
            await Group.updateOne(
                { _id: groupId, 'members._id': userId },
                { $push: { 'members.$.messages': { content: content, color: color }}},
                { timestamps: true }
            );
        }
        return { err: false, notification: "Receive message successful." };
    }
    catch (err) {
        return { err: true, notification: err.notification };
    }
};

export const userForwardMessage = async (userId: string, content: string, color: string, groupId?: string, createAt?: Date): Promise<IData> => {
    try {
        if (!isValidObjectId(userId)) console.log("Invalid user id");
        if (!groupId) {
            
        }
        return { userId: userId, message: content, colorMessage: color, groupId: groupId, createAt: createAt }
    }
    catch (err) {
        throw err;
    }
}