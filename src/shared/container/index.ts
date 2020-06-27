import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsReposityr from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersReposityr from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IAppointmentsReposityr>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersReposityr>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
