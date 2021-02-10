import { compare } from "bcryptjs";
import CompanyModel from "../Entities/Company";
import Company from "../Schemas/Company";
import { sign } from "jsonwebtoken";
import Authentication from "../config/Authentication";

interface Request{
  email: string;
  password: string;
}

interface Response {
  company: Company
  token: string
}

class AuthenticateCompanyService {
  public async execute({email, password}:Request):Promise<Response>{
    const company = await CompanyModel.findOne({
      email,
    }).exec();
    if(!company){
      throw new Error("Company does not exists");
    }
    const isPasswordMatched = await compare(password, company.password)
    if(!isPasswordMatched){
      throw new Error("Incorrect email/password combination");
    }

    const {secret, expiresIn} = Authentication.jwt

    const token = sign({}, secret, {
      subject: company.id,
      expiresIn
    })
    return {company, token}
  }
}

export default AuthenticateCompanyService
