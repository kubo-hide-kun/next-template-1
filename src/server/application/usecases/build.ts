import { Context } from '~/server/application/context';
import { FindUserByLineUidUsecase } from '~/server/application/usecases/findUserByLineUid';

export const build = (context: Readonly<Context>) => {
  const findUserByLineUidUsecase = FindUserByLineUidUsecase.create(context);
  return {
    findUserByLineUidUsecase,
  };
};
