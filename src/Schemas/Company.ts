import mongoose, { Schema, Document, Model, model } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  personName: string;
  email: string;
  password: string;
  bitrix_id: number;
  cpf_cnpj: string;
}

const CompanySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  personName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  bitrix_id: {
    type: Number,
  },

  cpf_cnpj: {
    type: String,
    required: true,
  },
});

const Company: Model<ICompany> = model('Company', CompanySchema);

export default Company;
