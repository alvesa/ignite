import { Request, Response } from 'express';

export interface IBaseController {
  handle(request: Request, response: Response);
}
