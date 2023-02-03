<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

/*
    public_path(); // Path of public/
    base_path(); // Path of application root
    storage_path(); // Path of storage/
    app_path(); // Path of app/
*/
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('mvc:create {name?} {r?}', function () {
    $name = $this->argument('name');
    $r = $this->argument('r');
    $path_c = base_path()."/app/Http/Controllers/".$name."Controller.php";
    $path_v = base_path()."/resources/views/".$name.".blade.php";
    if(file_exists($path_c))
        $this->comment("The ".$name." in MVC already exists");
    else{
        try{
            Artisan::call('make:controller '.$name.'Controller '.$r);
            Artisan::call('make:model '.$name.'Model '.$r);
            fopen($path_v,"w+"); 
            $this->comment("MVC $name was created successfully");
        }catch(Exception $e){
            $this->comment("An error occurred while creating MVC $name");
        }
    }
})->purpose('create MVC');

Artisan::command('mvc:delete {name?}', function () {
    $name = $this->argument('name');
    $path_c = base_path()."/app/Http/Controllers/".$name."Controller.php";
    $path_m = base_path()."/app/Models/".$name."Model.php";
    $path_v = base_path()."/resources/views/".$name.".blade.php";
    if(!file_exists($path_c))
        $this->comment("The ".$name." in MVC does not exist");
    else{
        try{
            unlink($path_c);
            unlink($path_m);
            unlink($path_v);
            $this->comment("The MVC $name was removed successfully"); 
        }catch(Exception $e){
            $this->comment("An error occurred while removing MVC $name"); 
        }
    }
})->purpose('Delete MVC');