import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

/**
 * Recebimento das informacoes
 * Tratativa de Erros/excessoes
 * Acesso ao repositorio
 */

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    // se quiser invalidar o cache.
    //users = null;

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      console.log('query no banco foi feita!', users);

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users)
      );
    }

    return users;
  }
}

export default ListProvidersService;
