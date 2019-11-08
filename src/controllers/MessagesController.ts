import {Express, Request, Response} from "express";
import {io} from "../server";
import {Messages} from "../models/Messages";
import {Users} from "../models/Users";

export class MessagesController {
    public registerRoutes(app: Express) {
        app.get("/api/v1/messages", this.listMessageHandler);
        app.post("/api/v1/messages", this.newMessageHandler);
    }

    private async listMessageHandler(req: Request, res: Response) {
        let messages = await Messages.find();
        let results: any = [];
        for (let m of messages) {
            let username = (await Users.findById(m.userId)).username;
            let result: any = {
                username: username,
                content: m.content,
                timestamp: m.timestamp,
                latitude: m.latitude,
                longitude: m.longitude,
                species: m.species,
                abundance: m.abundance,
                temperature: m.temperature,
                image: m.image
            };
            results.push(result);
        }

        res.send(results);
    };

    private async newMessageHandler(req: Request, res: Response) {
        let username = req.body.username;

        let user = await Users.findOne({username: username});

        let message = {
            userId: user.id,
            username: req.body.username,
            content: req.body.content,
            timestamp: new Date(),
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            species: req.body.species,
            abundance: req.body.abundance,
            temperature: req.body.temperature,
            image: req.body.image
        };

        await Messages.create(message);

        io.emit('new-message', message);
        res.send({success: true});
    }
}
