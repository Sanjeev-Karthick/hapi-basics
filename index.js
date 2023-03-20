'use strict'
const Hapi = require('@hapi/hapi');
const init = async () => {
    const server = Hapi.Server({
        host : 'localhost',
        port : 4000
    })

    await server.register(
        {
            plugin: require('hapi-geo-locate'),
            options: {
                enabledByDefault : true
            }
        }
    );
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
    },
    //inserting geo locate plugin
    {
        method : 'GET',
        path : "/location",
        handler : (request,h)=>{
            return JSON.stringify({location : request.location})
        }
 
    }
]);
    


    await server.start()
    console.log(`Server started on ${server.info.uri}`)
}



process.on('unhandledRejection', (err) =>{
    console.log(err);
    process.exit(1);
})

init();
