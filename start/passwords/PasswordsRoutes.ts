import Route from '@ioc:Adonis/Core/Route';

import PasswordsController from 'App/Controllers/Http/Passwords/PasswordsController';

const passwordsController = new PasswordsController();

Route.post('/forgot-password', passwordsController.forgotPassword);
