import { Context } from '~/server/application/context';
import { UserRepository } from '~/server/application/repositories/user';

export const build = (context: Readonly<Context>) => {
  const userRepository = UserRepository.create(context);
  return {
    userRepository,
  };
};
