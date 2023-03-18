'use strict'
const Hapi = require('@hapi/hapi');
console.dir(Hapi.server)
const init = async () => {
    const server = Hapi.Server({
        host : 'localhost',
        port : 4000
    })

    server.route({
        method : 'GET',
        path : '/',
        handler : (request, h)  => {  
            const data = {name : "sanjeev" , server : "Hapi"}
            return JSON.stringify(data);
        }
    })

    await server.start()
    console.log(`Server started on ${server.info.url}`)
}



process.on('unhandledRejection', (err) =>{
    console.log(err);
    process.exit(1);
})

init();
