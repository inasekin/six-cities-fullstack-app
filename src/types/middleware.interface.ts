import {NextFunction, Request, Response} from 'express';

interface MiddlewareInterface {
  execute(req: Request, res: Response, next: NextFunction): void;
}

export {MiddlewareInterface};
