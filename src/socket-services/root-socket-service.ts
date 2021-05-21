import { Socket } from 'socket.io';

import { IData } from './socket-data-model';
import { receiveMessage } from './socket-service';

export default (socket: Socket) => {
    socket.on('disconnect', () => {
        console.log(socket.id + ': disconnected');
    });
    socket.on('newMessage', (data: IData) => {
        console.log(`User ${data.userId} connected: ${socket.connected}`);
        receiveMessage(data);
        // forwardMessage(data);
        socket.emit('newMessage', data);
        socket.broadcast.emit('newMessage', data);
    });
};