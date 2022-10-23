const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registrationContent="";

fs.readFile("home.html", (er, home) => {
  if (er) {
    throw er;
  }
  homeContent = home;
});

fs.readFile("project.html", (er, project) => {
  if (er) {
    throw er;
  }
  projectContent = project;
});

fs.readFile("registration.html",(er,reg) => {
  if (er){
    throw er;
  }
  registrationContent=reg;
});

let args=require("minimist")(process.argv.slice(2));

http.createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
        case "/project":
          response.write(projectContent);
          response.end();
          break;
        case "/registration":
          response.write(registrationContent);
          response.end();
          break;

        default:
          response.write(homeContent);
          response.end();
          break;
    }
  })
  .listen(args["port"]);
