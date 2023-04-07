

// 1 == testServerLocal, 2 == testLocal, 3 == testRemote
const testType:Number = 1;

export interface Json {
    homepage: string;
    baseRoute: string;
    baseUrl: string;
    baseUrlApi: string;
    baseUrlApiFile: string;
  }

const myJson: Json ={
    homepage: 
        testType===1?"http://localhost:8000/datacapt-cni/":
        testType===2?"http://localhost/datacapt-cni/":
        "https://proyecto-ti.com/datacapt-cni/",
    baseRoute:
        testType===1?"/datacapt-cni":
        testType===2?"/datacapt-cni":
        "/datacapt-cni", 
    baseUrl:
        testType===1?"http://localhost:8000/":
        testType===2?"http://localhost/datacapt-cni/":
        "https://proyecto-ti.com/datacapt-cni/",
    baseUrlApi:
        testType===1?"http://localhost:8000/api/":
        testType===2?"http://localhost/datacapt/api/":
        "https://proyecto-ti.com/datacapt/api/",
    baseUrlApiFile:
        testType===1?"http://localhost:8000":
        testType===2?"http://localhost/datacapt/laravel-api/public":
        "https://proyecto-ti.com/datacapt/laravel-api/public"
}

export default myJson;