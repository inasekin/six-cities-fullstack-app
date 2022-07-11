import {NextFunction, Request, Response} from 'express';
import multer, {diskStorage, FileFilterCallback} from 'multer';
import mime from 'mime';
import {nanoid} from 'nanoid';

import {MiddlewareInterface} from '../../types/middleware.interface.js';

const REQUIRED_FILES = ['.jpg', '.png'];

class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fileName: string
  ) {}

  private fileFilter(_req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
    const extension = mime.extension(file.mimetype);

    callback(null, REQUIRED_FILES.some((value) => value === extension));
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const fileName = nanoid();

        callback(null, `${fileName}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({
      storage,
      fileFilter: this.fileFilter,
    }).single(this.fileName);

    uploadSingleFileMiddleware(req, res, next);
  }
}

export default UploadFileMiddleware;
