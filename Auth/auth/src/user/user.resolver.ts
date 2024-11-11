import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterDto } from 'src/dto/register.dto';
import { TokenResponse } from 'src/dto/token-response.dto';
import { LoginDto } from 'src/dto/login.dto';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Mutation(() => TokenResponse)
  async register(@Args('registerDto') registerDto: RegisterDto): Promise<TokenResponse> {
    const { token } = await this.userService.register(registerDto);
    return { token };
  }


  @Mutation(() => TokenResponse)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<TokenResponse> {
    const { token } = await this.userService.login(loginDto);
    console.log('user successfully logged in')
    return { token };
  }
    

}
