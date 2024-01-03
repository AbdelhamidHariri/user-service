import { Application, Response, Request, NextFunction } from "express";
import { API_ERROR } from "../lib/api.error";

export function errorMiddleware(app: Application) {
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof API_ERROR) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
        code: err.code,
      });
    } else if (err.status) {
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    } else {
      req.log.error(err, err.message);
      res.status(500).json({
        message: err.message,
        code: "internal_server_error",
      });
    }
  });
}
