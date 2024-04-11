import { UserEntity } from '~/domains/models/User';
import { Usecase } from '~/server/application/usecases';

const name = 'FindUserByLineUidUsecase' as const;

export namespace FindUserByLineUidUsecase {
  export const create: Usecase.Creator<typeof name, UserEntity, string> = ({
    resources: ctx,
  }) => {
    const { userRepository } = ctx;

    const usecase = Usecase.create<typeof name, UserEntity, string>(
      name,
      false,
      async (lineUid) => {
        const user = await userRepository.getOne({ lineUid });
        if (!user) {
          Usecase.throwException('user not found', { lineUid });
        }
        return user;
      }
    );

    return usecase;
  };
}
