'use strict'
const Hapi = require('@hapi/hapi');
console.dir(Hapi.server)
const init = async () => {
    const server = Hapi.Server({
        host : 'localhost',
        port : 4000
    })

    //Simple route
    server.route([{
        method : 'GET',
        path : '/',
        handler : (request, h)  => {  
            const data = {name : "sanjeev" , server : "Hapi"}
            return JSON.stringify(data);
        }
    },
    {
        //Variable parameters and query parameters
        method : 'GET',
        path : '/users/{user?}',
        handler : (request , h) =>{
            let data = { user : request.params.user , message : `Welcome ${request.params.user}` };
            if(request.query.preference){
                data.preference = request.query.preference
            }
            return JSON.stringify(data);
        }
    },
    {
        //Wildcard parameter
        method: 'GET',
        path : '/{version*}',
        handler : (request , h) =>{
            let data = JSON.stringify({version : request.params.version})
            return data
        }
    }]);
    


    await server.start()
    console.log(`Server started on ${server.info.uri}`)
}



process.on('unhandledRejection', (err) =>{
    console.log(err);
    process.exit(1);
})

init();
