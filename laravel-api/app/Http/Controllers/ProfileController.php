<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use PDO;
use PDOException;
use Exception;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $profile = Profile::all();
        return $profile;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $profile = new Profile();
        $profile->apellido = $request->lastName;
        $profile->nombre = $request->name;
        $profile->email = $request->email;
        $profile->pwd =  md5($request->pwd);
        // $profile->img = $request->img;
        $profile->tipo = $request->type;
        $profile->ultima_vez = now();
        if($profile->save())
            return response()->json([ "status" => "success", "message" => "Datos creados correctamente","data"=>$profile ]);
        else 
            return response()->json(["status" => "failed", "message" => "Ocurrio un error al crear los datos", "data"=> [] ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $profile = Profile::find($id);
        if($profile)
            return response()->json([ "status" => "success", "message" => "Datos procesados","data"=>$profile ]);
        else 
            return response()->json(["status" => "failed", "message" => "No se encontro Los datos", "data"=> [] ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try{
            $profile = Profile::findOrFail($request->id);
            $profile->apellido = $request->lastName;
            $profile->nombre = $request->name;
            if($request->email !="default")
                $profile->email = $request->email;
            $profile->pwd = $request->pwd;
            if($request->img !="default")   
                $profile->img = $request->img;
            $profile->ultima_vez = now();
            
            if($profile->save())
                return response()->json([ "status" => "success", "message" => "Datos Actualizados","data"=>$profile ]);
            else 
                return response()->json(["status" => "failed", "message" => "Ocurrio un error al actualizar", "data"=> [] ]);
        }catch(Exception $e){
            return response()->json(["status" => "failed", "message" => $e->getMessage(), "data"=> [] ]);
        }
        
    }

    public function getImgUsers($url=null){
        return response()->json([
            ["url"=>"http://localhost:8000/img/female.jpg","name"=>"female"], 
            ["url"=>"http://localhost:8000/img/male.png","name"=>"male"]
        ]);
    }

    public function updateImg(Request $request){
        //header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: POST'); 
        // header('Access-Control-Allow-Headers: Origin, X-Requested-With,Authorization,  Content-Type, Accept');
        // if($request->hasFile("profile-img"));
        // return true;
        return response()->json("200");
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $profile = Profile::destroy($id);
        if($profile)
            return response()->json([ "status" => "success", "message" => "Datos eliminados","data"=>$profile ]);
        else 
            return response()->json(["status" => "failed", "message" => "Ocurrio un error al eliminar", "data"=> [] ]);
    }
}
