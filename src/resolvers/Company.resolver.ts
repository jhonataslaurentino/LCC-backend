import {
  Arg,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import Login from '../Schemas/Login';
import RequestRecoverPasswordResponse from '../Schemas/RequestRecoverPasswordResponse';
import AuthenticationCompanyInput from './types/Company/AuthenticationCompanyInput';
import CreateCompanyInput from './types/Company/CreateCompanyInput';
import RecoverPasswordInput from './types/Company/RecoverPasswordInput';
import RequestRecoverPasswordInput from './types/Company/RequestRecoverPasswordInput';
import GetCompanyInfoInput from './types/Company/GetCompanyInfoInput';
import GetCompanyInfoService from '../Services/GetCompanyInfoService';
import FileInput from './types/Global/FileInput';
import ChangeCompanyProfileAvatarService from '../Services/ChangeCompanyProfileAvatarService';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import UpdateCompanyProfileInput from './types/Company/UpdateCompanyProfileInput';
import UpdateProfileService from '../Services/UpdateProfileService';
import RequestCreateCompanyInput from './types/Company/RequestCreateCompanyInput';
import ConfirmTutorialHasBeenViewedService from '../Services/ConfirmTutorialHasBeenViewedService';
import VerifyIfCompanySawTutorialService from '../Services/VerifyIfCompanySawTutorialService';
import { ContextData } from '../Context/context';
import ChangeCompanyRoleInput from './types/Company/ChangeCompanyRoleInput';
import ChangeCompanyRoleService from '../Services/ChangeCompanyRoleService';
import PermissionRequired from '../middlewares/PermissionRequired';
import permissions from '../config/permissions';
import Company from '../modules/company/schemas/Company';
import { removeCompanyAvatarUseCase } from '../modules/company/useCases/RemoveCompanyAvatar';
import { authenticateCompanyUseCase } from '../modules/company/useCases/AuthenticateCompany';
import { requestRecoverPasswordUseCase } from '../modules/company/useCases/RecoverPassword/RequestRecoverPassword';
import { recoverPasswordUseCase } from '../modules/company/useCases/RecoverPassword/RecoverPassword';
import { updateAllBitrixCompaniesCPFCNPJSUseCase } from '../modules/Bitrix/useCases/UpdateAllBitrixCompaniesCPFCNPJ';
import { CreateCompanyInputType } from '../modules/company/useCases/CreateCompany/CreateCompanyInput';
import { createCompanyUseCase } from '../modules/company/useCases/CreateCompany';
import { sendMailToCreateCompanyUseCase } from '../modules/company/useCases/CreateCompanyUsingEmail/SendMailToCreateCompany';
import { createCompanyUsingEmailUseCase } from '../modules/company/useCases/CreateCompanyUsingEmail/CreateCompanyUsingToken';

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

  @Query(() => Boolean)
  @UseMiddleware(AuthenticatedChecker)
  async verifyIfCompanySawTutorial(
    @Ctx()
    ctx: ContextData,
  ): Promise<boolean> {
    const { id: companyID } = ctx;
    const verifyIfCompanySawTutorialService = new VerifyIfCompanySawTutorialService();
    const didCompanySawTutorial = await verifyIfCompanySawTutorialService.execute(
      {
        companyID,
      },
    );
    return didCompanySawTutorial;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(PermissionRequired([permissions.admin]))
  async requestCreateCompany(
    @Arg('data')
    {
      name,
      email,
      expiresIn,
      eduzzBillID,
      recurrence_code,
      haveLifetimeAccess,
    }: RequestCreateCompanyInput,
  ): Promise<boolean> {
    const wasMailSent = await sendMailToCreateCompanyUseCase.execute({
      eduzzBillID,
      email,
      name,
      timeToExpireToken: expiresIn,
      recurrence_code,
      haveLifetimeAccess,
    });
    return wasMailSent;
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
      phone,
      token,
    }: CreateCompanyInput,
  ): Promise<Company> {
    const emailInLowerCase = email.toLowerCase();

    const registeredCompany = await createCompanyUsingEmailUseCase.execute({
      accessToken: token,
      cpf_cnpj,
      email: emailInLowerCase,
      name,
      phone,
      password,
      personName,
    });

    registeredCompany.password = '';
    return registeredCompany;
  }

  @Mutation(() => Login)
  async login(
    @Arg('data')
    { email, password }: AuthenticationCompanyInput,
  ): Promise<Login> {
    const emailInLowerCase = email.toLowerCase();

    const data = await authenticateCompanyUseCase.execute({
      email: emailInLowerCase,
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
    const emailInLowerCase = email.toLowerCase();
    await requestRecoverPasswordUseCase.execute(emailInLowerCase);
    return { wasMailSent: true } as RequestRecoverPasswordResponse;
  }

  @Mutation(() => Company)
  async recoverPassword(
    @Arg('data')
    { password, token }: RecoverPasswordInput,
  ): Promise<Company> {
    const company = await recoverPasswordUseCase.execute({
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
    const company = await removeCompanyAvatarUseCase.execute(companyID);
    delete company.password;
    return company;
  }

  @Mutation(() => Company)
  @UseMiddleware(AuthenticatedChecker)
  async confirmTutorialHasBeenViewed(
    @Ctx()
    ctx: ContextData,
  ): Promise<Company> {
    const { id: companyID } = ctx;
    const confirmTutorialHasBeenViewed = new ConfirmTutorialHasBeenViewedService();
    const company = await confirmTutorialHasBeenViewed.execute({
      companyID,
    });
    delete company.password;
    return company;
  }

  @Mutation(() => Company)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async changeCompanyRole(
    @Ctx()
    contextData: ContextData,
    @Arg('data')
    { roleID }: ChangeCompanyRoleInput,
  ): Promise<Company> {
    const { id: companyID } = contextData;
    const changeCompanyRoleService = new ChangeCompanyRoleService();
    const company = await changeCompanyRoleService.execute({
      companyID,
      roleID,
    });
    delete company.password;
    return company;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async updateLeftingCompanyFields(): Promise<boolean> {
    await updateAllBitrixCompaniesCPFCNPJSUseCase.execute();
    return true;
  }

  @Mutation(() => Company)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async addCompany(
    @Arg('data')
    {
      cpf_cnpj,
      eduzzBillID,
      email,
      name,
      personName,
      phone,
      recurrence_code,
      timeToExpireToken,
    }: CreateCompanyInputType,
  ): Promise<Company> {
    const company = await createCompanyUseCase.execute({
      cpf_cnpj,
      eduzzBillID,
      email,
      name,
      phone,
      recurrence_code,
      timeToExpireToken,
      sendMail: true,
      personName,
    });
    return company;
  }
}

export default CompaniesResolver;
