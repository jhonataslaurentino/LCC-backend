import getBitrixPropertyID from './getBitrixPropertyID';

interface Request {
  propertyType:
    | 'Terreno'
    | 'Apartamento'
    | 'Sala comercial'
    | 'Casa'
    | 'Galpão'
    | string;
}

interface Response {
  type: string;
  ID: string;
}

const getBitrixProperty = ({ propertyType }: Request): Response => {
  const propertyID = getBitrixPropertyID({ propertyType });
  const property = { type: propertyType, ID: propertyID };
  return property;
};

export default getBitrixProperty;
