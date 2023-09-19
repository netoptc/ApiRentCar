import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensReposito";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErros";

interface IPaylod {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string): Promise<string> {
    const { email, sub } = verify(
      refresh_token,
      auth.secret_refresh_token
    ) as IPaylod;

    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token
      );
    if (!userToken) {
      throw new AppError("Refresh token does not exist!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });
    return new_refresh_token;
  }
}

export { RefreshTokenUseCase };
