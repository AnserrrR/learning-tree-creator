import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from './config/config.module';
import { BackModule } from './back/back.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      playground: true,
      context: ({ req, res }: any) => ({ req, res }),
      autoSchemaFile: './dist/schema.gql',
    }),
    ConfigModule,
    BackModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
