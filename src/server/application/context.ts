import { build as buildRepositories } from '~/server/application/repositories/build';
import { build as buildUsecases } from '~/server/application/usecases/build';
import { buildInfrastructures } from '~/server/infrastructures';
import { Cross } from '~/types/common';
import { dayjs } from '~/utils/dayjs';

type Config = {
  ipAddress?: string;
  authorization?: {
    userId: string;
  };
};

const infrastructureConfig: Parameters<typeof buildInfrastructures>[0] = {
  isDebug: process.env.NODE_ENV !== 'production',
  line: {
    channelSecret: process.env.LINE_CHANNEL_SECRET ?? '',
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN ?? '',
  },
};

export class Context {
  private _config!: Config;
  private _logger!: unknown;

  private _now!: dayjs.Dayjs;

  private _infrastructures!: ReturnType<typeof buildInfrastructures>;
  private _usecases!: ReturnType<typeof buildUsecases>;

  private _repositories!: ReturnType<typeof buildRepositories>;

  constructor(config: Config) {
    this._config = config;
  }

  static create(...params: ConstructorParameters<typeof Context>): Context {
    const context = new Context(...params);
    context.init();
    return context;
  }

  public init(): void {
    this._logger = null;
    this._now = dayjs().tz();
    this._infrastructures = buildInfrastructures(infrastructureConfig);
    this._repositories = buildRepositories(this);
    this._usecases = buildUsecases(this);
  }

  get resources(): Cross<
    [
      { config: Config },
      { logger: unknown },
      { now: dayjs.Dayjs },
      ReturnType<typeof buildInfrastructures>,
      ReturnType<typeof buildUsecases>,
      ReturnType<typeof buildRepositories>
    ]
  > {
    return {
      config: this._config,
      logger: this._logger,
      now: this._now,
      ...this._infrastructures,
      ...this._usecases,
      ...this._repositories,
    };
  }
}
