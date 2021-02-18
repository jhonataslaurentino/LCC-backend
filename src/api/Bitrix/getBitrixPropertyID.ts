interface Request {
  propertyType:
    | 'Terreno'
    | 'Apartamento'
    | 'Sala comercial'
    | 'Casa'
    | 'Galpão'
    | string;
}

const getBitrixPropertyID = ({ propertyType }: Request): string => {
  switch (propertyType) {
    case 'Terreno':
      return '49';

    case 'Apartamento':
      return '51';

    case 'Sala comercial':
      return '53';

    case 'Casa':
      return '55';

    case 'Galpão':
      return '57';

    default:
      return '59';
  }
};

export default getBitrixPropertyID;
