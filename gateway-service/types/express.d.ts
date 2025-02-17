// types/express.d.ts
import 'express-session';
import { User } from './user'; // Define your User type (see Step 2)

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    logIn: (user: User, callback: (err: any) => void) => void;
    isAuthenticated: () => boolean;
  }
}