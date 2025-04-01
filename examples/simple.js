var ejs = require('../');

// 1. ejs.render(str, data, options);
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});

console.log("ejs.render(str, data, options); " + html);

// 2. ejs.compile(str, options);
// TODO: add example
/*let template = ejs.compile(str, options);
template(data);*/


// 3. ejs.renderFile(filename, data, options, function(err, str){}
// TODO: add example
/*
ejs.renderFile("simple.ejs", data, options, function(err, str){
    //
});*/
