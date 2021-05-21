import { userForwardMessage, userReceiveMessage } from '../db/services/message-service';
import { IData } from './socket-data-model'

export const receiveMessage = async (data: IData) => {
    const result = await userReceiveMessage(data.userId, data.message, data.colorMessage, data.groupId);
    console.log(result.notification);
}

export const forwardMessage = (data: IData) => {
    userForwardMessage(data.userId, data.message, data.colorMessage, data.groupId, data.createAt);
}