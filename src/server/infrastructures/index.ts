import { LineBotInfrastructure } from '~/server/infrastructures/line-bot';
import { PrimaInfrastructure } from '~/server/infrastructures/prisma';

type Config = {
  isDebug: boolean;
  line: {
    channelSecret: string;
    channelAccessToken: string;
  };
};

export const buildInfrastructures = (config: Config) => {
  const lineBot = LineBotInfrastructure.create(config);
  const prisma = PrimaInfrastructure.create(config);
  return {
    lineBot,
    prisma,
  };
};
