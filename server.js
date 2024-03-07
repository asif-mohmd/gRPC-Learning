const PROTO_PATH = "./proto/user.proto"

import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"


async function main(){


const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

var userProto = grpc.loadPackageDefinition(packageDefinition);

var server = new grpc.Server()

let users = [{
    name : "Jay",
    address : "asif Address",
    age : 12
}]

server.addService(userProto.UserService.service, {
    getUser: (_, callback) => {
        callback(null, { users });
    },
    addUser: (call, callback) => {

        const user = call.request;
        users.push(user)

        callback(null, user );
    }

});





server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(),()=>{
    server.start();
});

console.log("Server running at http://127.0.0.1:30043");
}

main()