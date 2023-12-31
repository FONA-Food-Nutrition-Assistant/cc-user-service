import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config/global.config';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { UserModule } from './module/user/user.module';
import { UidCheckerMiddleware } from './common/middleware/uid-checker.middleware';

@Module({
	imports: [
		/** App Modules */
		UserModule,

		/** Configuration Modules  */
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: false,
		}),
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes('*');
		consumer.apply(UidCheckerMiddleware).forRoutes('user');
	}
}
