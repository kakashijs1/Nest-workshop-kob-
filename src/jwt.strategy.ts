import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service'; // Adjust the path

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(private readonly authService: AuthService) {
   super({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: 'your-secret-key',
   });
 }

 async validate(payload: any) {
   const user = await this.authService.validateUserById(payload.sub);
   if (!user) {
     throw new UnauthorizedException();
   }
   return user;
 }
}
