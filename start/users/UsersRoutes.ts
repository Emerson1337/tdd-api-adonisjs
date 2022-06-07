import Route from '@ioc:Adonis/Core/Route';

import UsersController from 'App/Controllers/Http/Users/UsersController';

const usersController = new UsersController();

Route.post('/users', usersController.store);
Route.put(`/users/:secure_id`, usersController.update);
