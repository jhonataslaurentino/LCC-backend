import {
  Arg,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-express';
import Company from '../Schemas/Company';
import Login from '../Schemas/Login';
import RequestRecoverPasswordResponse from '../Schemas/RequestRecoverPasswordResponse';
import AuthenticateCompanyService from '../Services/AuthenticateCompanyService';
import CreateCompanyAtBitrixService from '../Services/CreateCompanyAtBitrixService';
import CreateCompanyService from '../Services/CreateCompanyService';
import RecoverPasswordService from '../Services/RecoverPasswordService';
import RequestRecoverPasswordService from '../Services/RequestRecoverPasswordService';
import UpdateBitrixIdService from '../Services/UpdateBitrixIdService';
import AuthenticationCompanyInput from './types/Company/AuthenticationCompanyInput';
import CreateCompanyInput from './types/Company/CreateCompanyInput';
import RecoverPasswordInput from './types/Company/RecoverPasswordInput';
import RequestRecoverPasswordInput from './types/Company/RequestRecoverPasswordInput';
import GetCompanyInfoInput from './types/Company/GetCompanyInfoInput';
import GetCompanyInfoService from '../Services/GetCompanyInfoService';
import FileType from './types/Global/FileInput';
import ChangeUserProfileAvatarService from '../Services/ChangeUserProfileAvatarService';
import AuthenticatedChecker, {
  ContextData,
} from '../middlewares/AuthenticatedChecker';

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

  @Mutation(() => Boolean)
  @UseMiddleware(AuthenticatedChecker)
  async addProfilePicture(
    @Ctx()
    ctx: ContextData,
    @Arg('picture', () => GraphQLUpload)
    { filename, createReadStream }: FileType,
  ): Promise<boolean> {
    const { id: companyID } = ctx;
    const changeUserProfileAvatarService = new ChangeUserProfileAvatarService();
    const wasProfilePhotoUpdated = await changeUserProfileAvatarService.execute(
      {
        companyID,
        filename,
        createReadStream,
      },
    );
    return wasProfilePhotoUpdated;
  }
}

export default CompaniesResolver;
