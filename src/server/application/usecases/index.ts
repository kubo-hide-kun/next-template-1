import { Context } from '~/server/application/context';

export class Usecase<Name extends string, OutPutData, InputData = undefined> {
  constructor(
    public name: Name,
    private isIncludePrivacyData: boolean,
    private readonly __invoke: InputData extends undefined
      ? () => Promise<OutPutData>
      : (payload: InputData) => Promise<OutPutData>,
    private readonly __logger?: { error: (...args: unknown[]) => void }
  ) {}

  /**
   * @description
   * このメソッドは、usecaseを生成するためのファクトリメソッドです。
   */
  static create<Name extends string, OutPutData, InputData = undefined>(
    ...params: ConstructorParameters<
      typeof Usecase<Name, OutPutData, InputData>
    >
  ) {
    return new Usecase<Name, OutPutData, InputData>(...params);
  }

  /**
   * @description
   * このメソッドは、usecase内でエラーを発生させるためのメソッドです。
   */
  static throwException(message: string, referenceInfo?: unknown): never {
    const error = new Error(
      JSON.stringify({
        message,
        referenceInfo,
      })
    );
    throw error;
  }

  public async invoke(inputData: InputData): Promise<OutPutData> {
    try {
      return await this.__invoke(inputData);
    } catch (error) {
      this.__logger.error(
        JSON.stringify({
          error,
          where: `usecase.${this.name}`,
          inputData: this.isIncludePrivacyData
            ? 'display personal information is disabled'
            : inputData,
        })
      );
      throw error;
    }
  }
}

export namespace Usecase {
  export type Creator<
    Name extends string,
    OutPutData,
    InputData = undefined
  > = (context: Readonly<Context>) => Usecase<Name, OutPutData, InputData>;
}
