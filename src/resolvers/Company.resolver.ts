import {
  Arg,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { createWriteStream } from 'fs';
import path from 'path';
import CompanyModel from '../Entities/Company';
import AuthenticatedChecker, {
  ContextData,
} from '../middlewares/AuthenticatedChecker';
import Company from '../Schemas/Company';
import Login from '../Schemas/Login';
import RequestRecoverPasswordResponse from '../Schemas/RequestRecoverPasswordResponse';
import AuthenticateCompanyService from '../Services/AuthenticateCompanyService';
import CreateCompanyAtBitrixService from '../Services/CreateCompanyAtBitrixService';
import CreateCompanyService from '../Services/CreateCompanyService';
import RecoverPasswordService from '../Services/RecoverPasswordService';
import RequestRecoverPasswordService from '../Services/RequestRecoverPasswordService';
import UpdateBitrixIdService from '../Services/UpdateBitrixIdService';
import UpdateBitrixIdInput from './types/Bitrix/UpdateBitrixIdInput';
import AuthenticationCompanyInput from './types/Company/AuthenticationCompanyInput';
import ChangeProfilePictureInput from './types/Company/ChangeProfilePictureInput';
import CreateCompanyInput from './types/Company/CreateCompanyInput';
import RecoverPasswordInput from './types/Company/RecoverPasswordInput';
import RequestRecoverPasswordInput from './types/Company/RequestRecoverPasswordInput';
import GetCompanyInfoInput from './types/Company/GetCompanyInfoInput';
import GetCompanyInfoService from '../Services/GetCompanyInfoService';

@Resolver()
class CompaniesResolver {
  @Query(() => Company)
  async getCompanyInfo(
    @Arg('data') { id }: GetCompanyInfoInput,
  ): Promise<Company> {
    const getCompanyInfoService = new GetCompanyInfoService();
    const company = await getCompanyInfoService.execute({ id });
    delete company.password;
    delete company.bitrix_id;
    delete company.cpf_cnpj;
    return company;
  }

  @Query(() => [Company])
  // @UseMiddleware(AuthenticatedChecker)
  async getCompanies(): // @Ctx()
  // ctx: ContextData,
  Promise<Company[]> {
    // console.log(ctx.id);
    const companies = await CompanyModel.find();
    companies.forEach(company => {
      // eslint-disable-next-line no-param-reassign
      company.password = '';
    });
    return companies;
  }

  @Mutation(() => Company)
  async createCompany(
    @Arg('data')
    {
      name,
      personName,
      email,
      password,
      cpf_cnpj,
      bitrix_id,
      phone,
    }: CreateCompanyInput,
  ): Promise<Company> {
    const createCompanyService = new CreateCompanyService();
    const company = await createCompanyService.execute({
      name,
      personName,
      email,
      password,
      cpf_cnpj,
      bitrix_id,
    });

    const createCompanyAtBitrixService = new CreateCompanyAtBitrixService();
    const companyAtBitrixID = await createCompanyAtBitrixService.execute({
      email,
      title: name,
      phone,
    });

    const updateBitrixIdService = new UpdateBitrixIdService();
    const registeredCompany = await updateBitrixIdService.execute({
      company_id: company.id,
      bitrix_id: companyAtBitrixID,
    });

    registeredCompany.password = '';
    return registeredCompany;
  }

  @Mutation(() => Company)
  async setBitrixId(
    @Arg('data')
    { company_id, bitrix_id }: UpdateBitrixIdInput,
  ): Promise<Company> {
    const updateBitrixIdService = new UpdateBitrixIdService();
    const company = await updateBitrixIdService.execute({
      bitrix_id,
      company_id,
    });
    company.password = '';
    return company;
  }

  @Mutation(() => Login)
  async login(
    @Arg('data')
    { email, password }: AuthenticationCompanyInput,
  ): Promise<Login> {
    const authenticateCompanyService = new AuthenticateCompanyService();
    const data = await authenticateCompanyService.execute({ email, password });
    data.company.password = '';
    return data;
  }

  @Mutation(() => RequestRecoverPasswordResponse)
  async requestRecoverPassword(
    @Arg('data')
    { email }: RequestRecoverPasswordInput,
  ): Promise<RequestRecoverPasswordResponse> {
    const requestRecoverPasswordService = new RequestRecoverPasswordService();
    const wasMailSent = await requestRecoverPasswordService.execute({ email });
    return { wasMailSent } as RequestRecoverPasswordResponse;
  }

  @Mutation(() => Company)
  async recoverPassword(
    @Arg('data')
    { password, token }: RecoverPasswordInput,
  ): Promise<Company> {
    const recoverPasswordService = new RecoverPasswordService();
    const company = await recoverPasswordService.execute({
      token,
      password,
    });
    company.password = '';
    return company;
  }
}

export default CompaniesResolver;
