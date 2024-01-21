import { Application, Response, Request, NextFunction } from "express";
import { UNAUTHENTICATED } from "../schema/http-errors";
import axios from "axios";

export function authenticate(app: Application) {
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.status(401).send(UNAUTHENTICATED);
      return;
    }

    const response = await axios({
      url: `${process.env.AUTHENTICATION_SERVICE_URL}/validate`,
      method: "GET",
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    if (response.status !== 200) {
      res.status(401).json(response.data);
      return;
    }
    next();
  });
}
