import { Module, OnModuleInit } from '@nestjs/common';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import * as express from 'express';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../types/user';

@Module({})
export class AppModule implements OnModuleInit {
  private gateway: ApolloGateway;
  private server: ApolloServer;

  constructor() {
    this.gateway = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'auth', url: 'http://localhost:3000/graphql' },
          { name: 'shipment', url: 'http://localhost:8000/graphql' },
        ],
      }),
      buildService: ({ url }) =>
        new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }) {
            const token = context?.req?.headers?.authorization;
            if (token) {
              request.http.headers.set('Authorization', `Bearer ${token}`);
              console.log('Forwarding token:', token);
            }
          },
        }),
    });

    this.server = new ApolloServer({
      gateway: this.gateway,
      introspection: true,
    });
  }

  async startServer() {
    const app = express();

    // Session configuration
    app.use(
      session({
        secret: 'enockdev01', // Replace with a real secret key
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: false, maxAge: 1000 * 60 * 60 }, // 1 hour
      })
    );

    // Passport initialization
    app.use(passport.initialize());
    app.use(passport.session());

    // Local strategy for authentication
    passport.use(
      new LocalStrategy((username, password, done) => {
        if (username === 'admin' && password === 'password') {
          return done(null, { id: 1, username: 'admin' });
        } else {
          return done(null, false, { message: 'Incorrect username or password' });
        }
      })
    );

    passport.serializeUser((user: User, done) => {
      done(null, user);
    });

    passport.deserializeUser((user: User, done) => {
      done(null, user);
    });

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Serve login page
    app.get('/login', (req, res) => {
      res.send(`
        <html>
        <head>
          <title>Login</title>
        </head>
        <body>
          <h2>Login</h2>
          <form action="/login" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Login</button>
          </form>
        </body>
        </html>
      `);
    });

    // Handle login
    app.post('/login', (req, res, next) => {
      passport.authenticate('local', (err, user: User, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).send('Authentication failed');

        req.logIn(user, (err) => {
          if (err) return next(err);
          res.redirect('/graphql'); // Redirect to GraphQL playground on success
        });
      })(req, res, next);
    });

    // Protect the GraphQL endpoint
    app.use('/graphql', (req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect('/login');
      }
    });

    await this.server.start();
    app.use(
      '/graphql',
      expressMiddleware(this.server, {
        context: async ({ req }) => ({ req }),
      })
    );

    const port = 4000;
    app.listen(port, () => {
      console.log(`🚀 Gateway ready at http://localhost:${port}/graphql`);
    });
  }

  async onModuleInit() {
    try {
      await this.startServer();
    } catch (error) {
      console.error('Error starting Apollo Gateway:', error);
    }
  }
}
