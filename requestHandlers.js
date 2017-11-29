    var querystring = require("querystring");
    //var Sequelize = require('sequelize');
    const db = require('./db')
    

    function start(response, postData) {  
        
        var content = "aaa";/*
        var sequelize = new Sequelize('postgres', 'postgres', 'strelok', {
          host: 'localhost',
          dialect: 'postgres',
        
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
          
        });
        */
        response.writeHead(200, {"Content-Type": "text/html"});
        db.sequelize
        .authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
        content = "Connection has been established successfully.";
        response.write(content);
        response.end();
        })
        .catch(err => {
        console.error('Unable to connect to the database:', err);
        content = "Unable to connect to the database";
        response.write(content);
        response.end();

        });

        // Or you can simply use a connection uri
        //var sequelize = new Sequelize('postgres://user:pass@localhost:5432/postgres');

    }
  
function post(response, postData){
  //var sequelize = new Sequelize('postgres://postgres:strelok@localhost:5432/postgres');
  var datas = querystring.parse(postData);
  if("theme" in datas && "text" in datas){
    var post_theme = datas["theme"];
    var post_text = datas["text"];

  const table_post = db.sequelize.define('post', {
    theme: {
      type: db.Sequelize.STRING
    },
    text: {
      type: db.Sequelize.STRING
    }
  });
  
  // force: true will drop the table if it already exists
  table_post.sync({force: false}).then(() => {
    // Table created
    return table_post.create({
      theme: post_theme,
      text: post_text
    });
  });
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: "+querystring.parse(postData).text);
    response.end();
  }
  else
  {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("ERR");
    response.end();
  }
}

function get(response, postData){
  //var sequelize = new Sequelize('postgres://postgres:strelok@localhost:5432/postgres');
  const table_post = db.sequelize.define('post', {
    theme: {
      type: db.Sequelize.STRING
    },
    text: {
      type: db.Sequelize.STRING
    }
  });

  var datas = querystring.parse(postData);

  if(postData=="all"){
    table_post.findAll().then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      //console.log(posts);
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+"\n");
      }
      response.end();
    })
  }
  else if("theme" in datas)
  {
    var get_theme = datas["theme"];
    table_post.findAll({
      where: {
        theme: get_theme,
      }
    }).then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+"\n");
      }
      response.end();
    })
  }
  else if("text" in datas)
  {
    var get_text = datas["text"];
    table_post.findAll({
      where: {
        text: get_text,
      }
    }).then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+"\n");
      }
      response.end();
    })
  }
}

function del(response, postData){
  //var sequelize = new Sequelize('postgres://postgres:strelok@localhost:5432/postgres');
  const table_post = db.sequelize.define('post', {
    theme: {
      type: db.Sequelize.STRING
    },
    text: {
      type: db.Sequelize.STRING
    }
  });

  var datas = querystring.parse(postData);

  if(postData=="all"){
    table_post.findAll().then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      //console.log(posts);
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+": deleted\n");
      }
      response.end();
      table_post.destroy({
        where: {
            // criteria
        }
      }) 
    }) 
  }
  else if("theme" in datas)
  {
    var get_theme = datas["theme"];
    table_post.findAll({
      where: {
        theme: get_theme,
      }
    }).then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+": deleted\n");
      }
      response.end();
      table_post.destroy({
        where: {
          theme: get_theme,
        }
      });
    })
  }
  else if("text" in datas)
  {
    var get_text = datas["text"];
    table_post.findAll({
      where: {
        text: get_text,
      }
    }).then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+": deleted\n");
      }
      response.end();
      table_post.destroy({
        where: {
          text: get_text,
        }
      });
    })
  }
}

function upd(response, postData){
  //var sequelize = new Sequelize('postgres://postgres:strelok@localhost:5432/postgres');
  const table_post = db.sequelize.define('post', {
    theme: {
      type: db.Sequelize.STRING
    },
    text: {
      type: db.Sequelize.STRING
    }
  });

  var datas = querystring.parse(postData);
  if(("n_theme" in datas)==false && ("n_text" in datas)==false){
    return;
  }
  
  if("theme" in datas)
  {
    var get_theme = datas["theme"];
    table_post.findAll({
      where: {
        theme: get_theme,
      }
    }).then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+": update\n");
      }
      response.end();
      if(("n_theme" in datas) && ("n_text" in datas)){
        var n_theme = datas["n_theme"];
        var n_text = datas["n_text"];
        table_post.update({
          theme: n_theme,
          text: n_text
        }, {
          where: {
            theme: get_theme
          }
        });
      }else if("n_theme" in datas){
        var n_theme = datas["n_theme"];
        table_post.update({
          theme: n_theme,
        }, {
          where: {
            theme: get_theme
          }
        });
      }else if("n_text" in datas){
        var n_text = datas["n_text"];
        table_post.update({
          text: n_text
        }, {
          where: {
            theme: get_theme
          }
        });
      }
    })
  }
  else if("text" in datas)
  {
    var get_text = datas["text"];
    table_post.findAll({
      where: {
        text: get_text,
      }
    }).then(posts => {
      response.writeHead(200, {"Content-Type": "text/plain"});
      var anyth = "";
      for(var i=0;i<posts.length;i++){
      anyth = posts[i].theme;
      response.write(anyth+" - ");
      anyth = posts[i].text;
      response.write(anyth+": update\n");
      }
      response.end();

      if(("n_theme" in datas) && ("n_text" in datas)){
        var n_theme = datas["n_theme"];
        var n_text = datas["n_text"];
        table_post.update({
          theme: n_theme,
          text: n_text
        }, {
          where: {
            text: get_text
          }
        });
      }else if("n_theme" in datas){
        var n_theme = datas["n_theme"];
        table_post.update({
          theme: n_theme,
        }, {
          where: {
            text: get_text
          }
        });
      }else if("n_text" in datas){
        var n_text = datas["n_text"];
        table_post.update({
          text: n_text
        }, {
          where: {
            text: get_text
          }
        });
      }

    })
  }
}

  function upload(response, postData) {
    //console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});


    response.write("You've sent the text: "+querystring.parse(postData).text);
    response.end();
  }

  
  exports.start = start;
  exports.post = post;
  exports.get = get;
  exports.del = del;
  exports.upd = upd;
  exports.upload = upload;