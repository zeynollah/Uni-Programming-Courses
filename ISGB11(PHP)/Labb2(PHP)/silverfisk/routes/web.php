<?php

// Kod tagen / inspirerad av föreläsningar

use Illuminate\Support\Facades\Route;
use App\Model\Car;
use App\Http\Controllers\CarsController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$router->get('/', 'App\Http\Controllers\MoviesController@index');

$router->get('/test', 'App\Http\Controllers\MoviesController@test');

$router->get('/movies', 'App\Http\Controllers\MoviesController@sort');

$router->get('/movies/{id}', 'App\Http\Controllers\MoviesController@show');

$router->post('/movies', 'App\Http\Controllers\MoviesController@create');   // OBS Skriver man "public/movies/" så funkar ej denna metod

$router->put('/movies/{id}', 'App\Http\Controllers\MoviesController@update');

$router->delete('/movies/{id}', 'App\Http\Controllers\MoviesController@delete');

