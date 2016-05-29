import {createServer} from '../../../server/server';
import PrimusServer from 'primus';
import {port} from './utils';

module.exports = function(){
  this.Before(function(scenario, done){
    const server = createServer();
    this.server = server;
    server.listen(port, err => {
      // console.log('Test server up on port ' + port);
      done(err);
    });
  });

  this.World(function(){
    this.supportSocket = PrimusServer.createSocket({ transformer: 'engine.io'});
    this.userSocket = PrimusServer.createSocket({ transformer: 'engine.io'});
    this.port = port;
  });
};
