import { Request, Response } from 'express';
import { CreateRealEstateDealUseCase } from './CreateRealEstateDealUseCase';

interface IFiles {
  [key: string]: Express.Multer.File[];
}

class CreateRealEstateDealController{
  constructor(private CreateRealEstateDealUseCase: CreateRealEstateDealUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as IFiles;

}
