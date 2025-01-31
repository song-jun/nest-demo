import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { LoginDTO, RegisterInfoDTO } from './user.dto';
import { ApiTags, ApiBearerAuth, ApiBody, ApiExtension, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('测试user') // 添加 接口标签 装饰器
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}
  @ApiExtension('x-author', '君陌离')
  @ApiOperation({ summary: '登录', description: '测试login' })
  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  @ApiBody({ description: '用户登录', type: LoginDTO })
  async login(@Body() loginParmas: LoginDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: '账号或密码不正确',
        };
      default:
        return {
          code: 600,
          msg: '查无此人',
        };
    }
  }
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('register')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async register(@Body() body: RegisterInfoDTO) {
    return await this.usersService.register(body);
  }
}
