import { IBillStatus } from '../dtos/IEduzz';

const BillsStatus = [
  {
    id: 1,
    status: 'Aberta',
    description: 'Fatura Aberta',
  },
  {
    id: 3,
    status: 'Paga',
    description: 'Compra Efetuada',
  },
  {
    id: 4,
    status: 'Cancelada',
    description: 'Compra Cancelada',
  },
  {
    id: 6,
    status: 'Aguardando Reembolso',
    description: 'Reembolso solicitado',
  },
  {
    id: 7,
    status: 'Reembolsado',
    description: 'Reembolso efetuada pela Eduzz',
  },
  {
    id: 9,
    status: 'Duplicada',
    description:
      'O cliente tentou comprar mais de uma vez o mesmo produto, a segunda fatura fica como duplicada e não é cobrada',
  },
  {
    id: 10,
    status: 'Expirada',
    description:
      'A fatura que fica mais de 15 dias aberta é alterada para expirada',
  },
  {
    id: 11,
    status: 'Em recuperação',
    description: 'Fatura entrou para o processo de recuperação',
  },
  {
    id: 15,
    status: 'Aguardando Pagamento',
    description:
      'Faturas de recorrência após o vencimento ficam com o status aguardando pagamento',
  },
] as IBillStatus[];

export default BillsStatus;
