import { UserEntity } from '~/domains/models/User';
import { Context } from '~/server/application/context';
import { Repository } from '~/server/application/repositories';

export class UserRepository extends Repository {
  constructor(ctx: Readonly<Context>) {
    super('MemberRepository', ctx);
  }

  static create(...params: ConstructorParameters<typeof UserRepository>) {
    const repository = new UserRepository(...params);
    return repository;
  }

  /**
   * @description ユーザーを 1 件取得する
   */
  public async getOne(
    conditions: Partial<Pick<UserEntity.Dto, 'id' | 'lineUid'>>
  ) {
    const { lineBot, prisma } = this.ctx.resources;

    const found = await prisma.client.user.findUnique({
      where: conditions,
    });

    if (!found) {
      return null;
    }

    const { displayName } = await lineBot.client.getProfile(found.lineUid);

    const user = UserEntity.create({
      id: found.id,
      lineUid: found.lineUid,
      lineDisplayName: displayName,
      ableToReceiveMessage: found.ableToReceiveMessage,
      approveUpdateTermsAt: found.approveUpdateTermsAt.toString(),
      createdAt: found.createdAt.toString(),
      updatedAt: found.updatedAt.toString(),
    });

    return user;
  }
}
