import { getModelForClass } from '@typegoose/typegoose';
import Role from '../Schemas/Role';

const RoleModel = getModelForClass(Role, {
  schemaOptions: { timestamps: true },
});

export default RoleModel;
