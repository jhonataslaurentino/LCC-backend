import { getModelForClass } from '@typegoose/typegoose';
import Contact from '../Schemas/Contact';

const ContactModel = getModelForClass(Contact, {
  schemaOptions: { timestamps: true },
});

export default ContactModel;
