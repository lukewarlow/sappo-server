import { Response, Request, Express } from "express";
import {Users} from "../models/Users";
import {io} from "../server";
import {compare, hash} from "../PasswordHash";

export class AccountController {
    public registerRoutes(app: Express) {
        app.post("/api/v1/account/login", this.loginHandler);
        app.post("/api/v1/account/logout", this.logoutHandler);
        app.post("/api/v1/account/register", this.registerHandler);
    }

    private async loginHandler(req: Request, res: Response) {
        let username = req.body.username;
        let password = req.body.password;

        let user = await Users.findOne({username: username});
        if (user)
        {
            compare(password, user.hash)
                .then(result => {
                    if (result) {
                        io.emit('user-connected', username);
                        res.status(200).send({success: true});
                    } else {
                        res.status(401).send({success: false});
                    }
                })
                .catch(_ => {
                    res.status(500).send({success: false});
                });
        }
        else
        {
            res.status(404).send({success: false});
        }
    }

    private logoutHandler(req: Request, res: Response) {
        let username = req.body.username;
        io.emit("user-disconnected", username);
        res.status(204).end();
    }

    private async registerHandler(req: Request, res: Response) {
        let username = req.body.username;
        let password = req.body.password;
        let user = await Users.findOne({username: username});
        if (user)
        {
            res.status(409).send({success: false});
        }
        else
        {
            await hash(password)
                .then(async hash => {
                    await Users.create({username: username, hash: hash});
                    io.emit('user-connected', username);
                    res.status(201).send({success: true});
                })
                .catch(err => {
                    res.status(500).send({success: false});
                });
        }
    }
}
