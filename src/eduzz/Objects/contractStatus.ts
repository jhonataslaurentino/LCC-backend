import { IContractStatus } from '../dtos/IEduzz';

const ContractStatus: IContractStatus[] = [
  {
    id: 1,
    status: 'Em dia',
    description: 'Contrato com pagamento em dia',
  },
  {
    id: 2,
    status: 'Aguardando Pagamento',
    description:
      'Esse status é acionado após o vencimento da fatura. Permanece por 3 dias',
  },
  {
    id: 3,
    status: 'Suspenso',
    description: 'O contrato não gera novas cobranças. Pode ser reativado',
  },
  {
    id: 4,
    status: 'Cancelado',
    description: 'O contrato do cliente foi cancelado',
  },
  {
    id: 7,
    status: 'Atrasado',
    description: 'Contrato sem pagamento há mais de 3 dias após o vencimento',
  },
  {
    id: 9,
    status: 'Finalizado',
    description:
      'Todos os pagamentos foram realizados. Não gera novas cobranças',
  },
  {
    id: 10,
    status: 'Trial',
    description: 'Contrato em período trial.',
  },
];

export default ContractStatus;
