import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
        await app.init();
    });

    const email = `test-${Date.now()}@example.com`;
    const password = 'password123';
    const firstName = 'John';
    const lastName = 'Doe';
    const role = '507f1f77bcf86cd799439011'; // Mock ObjectId

    it('/auth/signup (POST) - Valid', () => {
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email, password, firstName, lastName, role })
            .expect(201);
    });

    it('/auth/signup (POST) - Duplicate Email', async () => {
        // First create user
        const emailDuplicates = `dup-${Date.now()}@example.com`;
        await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: emailDuplicates, password, firstName, lastName, role })
            .expect(201);

        // Try again
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: emailDuplicates, password, firstName, lastName, role })
            .expect(409);
    });

    it('/auth/login (POST) - Valid', async () => {
        // Create use first ensures we have one
        const loginEmail = `login-${Date.now()}@example.com`;
        await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: loginEmail, password, firstName, lastName, role });

        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: loginEmail, password })
            .expect(201)
            .expect((res) => {
                if (!res.body.access_token) throw new Error('Missing access_token');
            });
    });

    it('/auth/login (POST) - Invalid Password', async () => {
        const loginEmail = `login-fail-${Date.now()}@example.com`;
        await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: loginEmail, password, firstName, lastName, role });

        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: loginEmail, password: 'wrongpassword' })
            .expect(401);
    });
});
