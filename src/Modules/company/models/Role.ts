import { getModelForClass } from '@typegoose/typegoose';
import Role from '../schemas/Role';

const RoleModel = getModelForClass(Role, {
  schemaOptions: { timestamps: true },
});

export default RoleModel;
