import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user.controller' 
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
 imports: [
   JwtModule.register({
     secret: 'your-secret-key',
     signOptions: { expiresIn: '1d' },

    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, JwtStrategy],
 })
 export class AppModule {}
 
