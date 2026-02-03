<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Calidation\Rule;

class MoviesController extends Controller {

    public function index() {
        return "satfläsk";
    }

    public function sort() {

        $posts = Movie::all()->sortBy(function($movie) {  
            return $movie->title; 
        });

        return $posts;
    }

    public function show($id) {     
        $movie = Movie::where('id','=',$id)->firstOrFail();
        return $movie;
    }

    public function test() {
        return ['works' => 'true'];
    }

    public function create(Request $request){
        $this->validate($request, [
            'title'     =>  'required',
            'year'      =>  'filled|integer',
            'genre'     =>  'filled',
            'rating'    =>  'filled|integer'
        ]);

        Movie::create($request->all());
        return ['success' => 'true'];
    }

    public function update(Request $request, $id){

        $post = Movie::findOrFail($id);

        $data = $this->validate($request, [
            'title'     =>  'filled',
            'year'      =>  'filled|integer',
            'genre'     =>  'filled',
            'rating'    =>  'filled|integer'
        ]);

        $post->fill($data);
        $post->save();

        return ['success' => 'true'];
    }

    public function delete($id){

        $post = Movie::findOrFail($id);
        $post->delete();

        return ['success' => 'true'];
    }

}