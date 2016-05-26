module.exports = function(){
  this.After(function(){
    this.server.close();
  });
};
