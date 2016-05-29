import {createServer} from './server';

const server = createServer();
const port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
