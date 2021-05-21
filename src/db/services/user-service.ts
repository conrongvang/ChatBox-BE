import { User, IUser, Group } from '../schemas/chat-model';
import { IResultType } from '../services/service-result-type';

export const register = async (userInfo: IUser): Promise<IResultType> => {
    try {
        const { username, password } = userInfo;
        const user = new User();
        user.username = username;
        user.password = password;
        user.nickname = username;
        await user.save();
        return { err: false, notification: 'Create user successful.' }
    }
    catch (err) {
        return { err: true, notification: err.notification };
    }
};

export async function login (username: string, password: string): Promise<IResultType> {
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return { err: true, notification: 'User is not exist !' };
        }
        return { err: false, notification: 'Login successful.', data: user._id };
    }
    catch (err) {
        return { err: true, notification: err.notification };
    }
}

export async function updateUserInfo (userId: string, avatar?: string, email?: string, birthday?: Date, phone?: number, nickname?: string, friends?: string[]): Promise<IResultType> {
    try {
        const userInfo = await User.findById(userId);
        if (!userInfo) return { err: true, notification: 'User is not exist !' };
        avatar ? (userInfo.avatar = avatar) : userInfo.avatar;
        email ? (userInfo.email = email) : userInfo.email;
        birthday ? (userInfo.birthday = birthday) : userInfo.birthday;
        phone ? (userInfo.phone = phone) : userInfo.phone;
        nickname ? (userInfo.nickname = nickname) : userInfo.nickname;
        friends ? (userInfo.friends = friends) : userInfo.friends;
        console.log(userInfo.id);
        console.log(userInfo.friends)
        await userInfo.save();
        return { err: false, notification: 'Update user info sucessful.' };
    }
    catch (err) {
        return { err: true, notification: err.notification };
    }
}

export async function getUserInfo (userId: string): Promise<IResultType> {
    try {
        const userInfo = await User.findById(userId).lean();
        const { avatar, email, birthday, phone, nickname, friends, messages } = userInfo;
        if (!userInfo) 
            return { err: true, notification: 'User is not exist !' };
        return { err: false, notification: 'Get user info successful.', data: { avatar, email, birthday, phone, nickname, friends, messages }};
    }
    catch (err) {
        return { err: true, notification: err.notification };
    }
}

export async function findUser (q: string): Promise<IResultType> {
    let users: IUser[] = [];
    try {
        if (Number(q) === NaN) {
            users = await User.find({phone: Number(q)});
        }
        else {
            users = await User.find({
                $or: [
                    {username: q, nickname: q, email: q},
                    {username: q, nickname: q},
                    {username: q, email: q},
                    {nickname: q, email: q},
                    {username: q},
                    {nickname: q},
                    {email: q}
                ]
            });
        }
        if(!users) return { err: true, notification: "Not found user." };
        return { err: false, notification: "Found user successful.", data: { users: users }}
    }
    catch (err) {
        return { err: true, notification: err.notification }
    }
}