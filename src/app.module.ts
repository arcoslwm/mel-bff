import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }), LoggerModule.forRoot({
    pinoHttp: {
      customProps: (req, res) => ({
        context: 'HTTP',
      }),
    }
  }), ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
