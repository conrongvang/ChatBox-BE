import express, { Request, Response } from 'express';
import { register, login, getUserInfo, updateUserInfo, findUser } from '../db/services/user-service';
import { User, IUser } from '../db/schemas/chat-model';
import { responseData } from '../apis/response-type';
import { SUCCESSFUL, FAILURE } from '../constants/responese-code';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password }: IUser = req.body;
    let userAccount = new User();
    userAccount.username = username;
    userAccount.password = password;
    const result = await register(userAccount);
    if (result.err) res.status(200).json(responseData(FAILURE, result));
    res.status(200).json(responseData(SUCCESSFUL, result));
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password }: IUser = req.body;
    const result = await login(username, password);
    if (result.err) res.status(200).json(responseData(FAILURE, result));
    res.status(200).json(responseData(SUCCESSFUL, result));
});

router.put('/UpdateUserInfo', async (req: Request, res: Response) => {
    const { _id, avatar, email, birthday, phone, nickname, friends }: IUser = req.body;
    const result = await updateUserInfo(_id, avatar, email, birthday, phone, nickname, friends);
    if (result.err) res.status(200).json(responseData(FAILURE, result));
    res.status(200).json(responseData(SUCCESSFUL, result));
});

router.get('/GetUserInfo', async (req: Request, res: Response) => {
    const { userId } = req.query;
    console.log(req.query);
    if (typeof userId === 'string') {
        const result = await getUserInfo(userId);
        if (result.err) res.status(200).json(responseData(FAILURE, result));
        res.status(200).json(responseData(SUCCESSFUL, result));
    }
    else
        res.status(200).json(responseData(FAILURE, { err: true, notification: "Error: UserId must be a string!", data: null}));
});

router.get('/FindUser', async (req: Request, res: Response) => {
    const { q } = req.query;
    console.log(q);
    if (typeof q === 'string') {
        const result = await findUser(q);
        if (result.err) res.status(200).json(responseData(FAILURE, result));
        res.status(200).json(responseData(SUCCESSFUL, result));
    }
    else
        res.status(200).json(responseData(FAILURE, { err: true, notification: "Error: q must be a string!", data: null }));
});

export default router;