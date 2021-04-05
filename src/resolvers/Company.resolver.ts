import {
  Arg,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
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
import FileInput from './types/Global/FileInput';
import ChangeCompanyProfileAvatarService from '../Services/ChangeCompanyProfileAvatarService';
import AuthenticatedChecker, {
  ContextData,
} from '../middlewares/AuthenticatedChecker';
import UpdateCompanyProfileInput from './types/Company/UpdateCompanyProfileInput';
import UpdateProfileService from '../Services/UpdateProfileService';
import RequestCreateCompanyInput from './types/Company/RequestCreateCompanyInput';
import SendEmailToCreateCompanyService from '../Services/SendEmailToCreateCompanyService';
import RemoveCompanyProfileAvatarService from '../Services/RemoveCompanyProfileAvatarService';

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

  @Mutation(() => Boolean)
  async requestCreateCompany(
    @Arg('data') { name, email }: RequestCreateCompanyInput,
  ): Promise<boolean> {
    const emailInLoweCase = email.toLowerCase();

    const requestCreateCompany = new SendEmailToCreateCompanyService();
    const wasEmailSent = await requestCreateCompany.execute({
      name,
      email: emailInLoweCase,
    });
    return wasEmailSent;
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
      token,
    }: CreateCompanyInput,
  ): Promise<Company> {
    const emailInLoweCase = email.toLowerCase();

    const createCompanyService = new CreateCompanyService();
    const company = await createCompanyService.execute({
      name,
      personName,
      email: emailInLoweCase,
      password,
      cpf_cnpj,
      bitrix_id,
      token,
    });

    const createCompanyAtBitrixService = new CreateCompanyAtBitrixService();
    const companyAtBitrixID = await createCompanyAtBitrixService.execute({
      email: emailInLoweCase,
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
    const emailInLoweCase = email.toLowerCase();

    const authenticateCompanyService = new AuthenticateCompanyService();
    const data = await authenticateCompanyService.execute({
      email: emailInLoweCase,
      password,
    });
    data.company.password = '';
    return data;
  }

  @Mutation(() => RequestRecoverPasswordResponse)
  async requestRecoverPassword(
    @Arg('data')
    { email }: RequestRecoverPasswordInput,
  ): Promise<RequestRecoverPasswordResponse> {
    const emailInLoweCase = email.toLowerCase();

    const requestRecoverPasswordService = new RequestRecoverPasswordService();
    const wasMailSent = await requestRecoverPasswordService.execute({
      email: emailInLoweCase,
    });
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
  async setProfilePicture(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { file, fileName }: FileInput,
  ): Promise<boolean> {
    const { id: companyID } = ctx;
    const changeCompanyProfileAvatarService = new ChangeCompanyProfileAvatarService();
    await changeCompanyProfileAvatarService.execute({
      companyID,
      fileBase64Encoded: file,
      fileName,
    });
    const wasProfilePhotoUpdated = true;
    return wasProfilePhotoUpdated;
  }

  @Mutation(() => Company)
  @UseMiddleware(AuthenticatedChecker)
  async updateProfile(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { name, personName, password, phone }: UpdateCompanyProfileInput,
  ): Promise<Company> {
    const { id: companyID } = ctx;
    const updateProfileService = new UpdateProfileService();
    const company = await updateProfileService.execute({
      companyID,
      name,
      phone,
      password,
      personName,
    });
    delete company.password;
    return company;
  }

  @Mutation(() => Company)
  @UseMiddleware(AuthenticatedChecker)
  async removeProfilePicture(
    @Ctx()
    ctx: ContextData,
  ): Promise<Company> {
    const { id: companyID } = ctx;
    const removeCompanyProfileAvatarService = new RemoveCompanyProfileAvatarService();
    const company = await removeCompanyProfileAvatarService.execute({
      companyID,
    });
    return company;
  }
}

export default CompaniesResolver;
