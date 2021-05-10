import permissions from '../../config/permissions';

interface Request {
  permissionName: string;
}

interface Response {
  value: number;
  name: string;
}

class GetPermissionByNameService {
  public execute({ permissionName }: Request): Response {
    try {
      const permissionFiltered = Object.entries(permissions).filter(
        ([key]) => permissionName === key,
      );
      const [
        permissionFilteredName,
        permissionFilteredValue,
      ] = permissionFiltered[0];
      return {
        value: permissionFilteredValue,
        name: permissionFilteredName,
      };
    } catch (error) {
      throw new Error('Permission not found');
    }
  }
}

export default GetPermissionByNameService;
