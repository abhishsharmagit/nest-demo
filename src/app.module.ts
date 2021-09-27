import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://Abhishek:loLHeLbn4Izap3Da@backend.g53cz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
