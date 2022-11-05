export type Status = 'Solicitado' | 'Em produção' | 'Finalizado';

export interface StatusType {
  id: number;
  type: Status;
}
