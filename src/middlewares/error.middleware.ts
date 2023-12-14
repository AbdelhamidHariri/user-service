import { Application, Response, Request, NextFunction } from "express";

export function errorMiddleware(app: Application) {
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
}
