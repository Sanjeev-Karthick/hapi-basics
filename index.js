'use strict'
const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.Server({
        host : 'localhost',
        port : 4000
    })

    server.route({
        method : 'GET',
        path : '/',
        handler : (request, h)  => {  
            return `<h1> Hapi Server </h1>`
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
