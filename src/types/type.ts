import { NextFunction, Request, Response } from 'express';

export interface NewUserRequestBody {
  fullName: string;
  email: string;
  password: string;
}
