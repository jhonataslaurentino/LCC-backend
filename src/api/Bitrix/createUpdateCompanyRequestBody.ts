interface ICreateUpdateCompanyRequestBody {
  name: string;
  phone: string;
  bitrix_id: number;
}

const createUpdateCompanyRequestBody = ({
  bitrix_id,
  phone,
  name,
}: // eslint-disable-next-line @typescript-eslint/ban-types
ICreateUpdateCompanyRequestBody): Object => ({
  id: bitrix_id,
  fields: {
    TITLE: name,
    PHONE: [phone],
  },
});

export default createUpdateCompanyRequestBody;
