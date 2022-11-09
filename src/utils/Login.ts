import type { UserType } from '@/types';
import { KJUR } from 'jsrsasign';
import { DBInMemory } from './DBInMemory';

const algorithm = 'HS256';
const secret = 'umaSenhaMuitoSecreta';

const jwt = KJUR.jws.JWS;

export class Login {
  static login({ email, password }: UserType) {
    const data = DBInMemory.getUser(email);
    if (!data) return { error: 'Usuário não encontrado' };
    if (data.password !== password) return { error: 'Senha inválida' };
    const token = this._createToken(data.id!, data.email);
    return { token };
  }

  static tokenValidate(token: string) {
    const data = this._verifyToken(token);
    if (!data) return { error: 'token inválido.' };
    return {
      message: 'token válido.',
    };
  }

  private static _createToken(id: number, email: string) {
    return jwt.sign(algorithm, { alg: algorithm }, { id, email }, secret);
  }

  private static _verifyToken(token: string) {
    return jwt.verify(token, secret);
  }
}
