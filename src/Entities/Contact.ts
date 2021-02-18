import { getModelForClass } from '@typegoose/typegoose';
import Contact from '../Schemas/Contact';

const ContactModel = getModelForClass(Contact);

export default ContactModel;
