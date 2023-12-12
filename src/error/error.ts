import { Application, Response, Request, NextFunction, ErrorRequestHandler } from "express";

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

export function initErrorHandling(app: Application) {
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // format error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
}
