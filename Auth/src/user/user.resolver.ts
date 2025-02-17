import { Resolver, Mutation, Args, ResolveReference, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterDto } from '../dto/register.dto';
import { TokenResponse } from '../dto/token-response.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from './user.schema';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ResolveReference()
  resolveReference(reference: {__typename: string; id: string}) {
    return this.userService.findById(reference.id)
  }

  @Query(() => User)
async getUser(@Args('id') id: string) {
  return this.userService.findById(id);
}

@Query(() => [User])
async getUsers() {
  return this.userService.findAll();
}

  @Mutation(() => TokenResponse)
  async register(@Args('registerDto') registerDto: RegisterDto): Promise<TokenResponse> {
    const { token } = await this.userService.register(registerDto);
    return {token };
  }


  @Mutation(() => TokenResponse)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<TokenResponse> {
    const { token } = await this.userService.login(loginDto);
    console.log('User successfully logged in')
    return { token };
  }
    

}
