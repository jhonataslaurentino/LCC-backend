import path from 'path';

const filesSource = path.resolve(__dirname, '..', '..', 'files');

export default {
  src: filesSource,
  companiesProfile: path.resolve(filesSource, 'images', 'companies', 'profile'),
};
