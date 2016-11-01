var documentService = new DocumentService();

console.log("Loaded Index.js");

var results = documentService.TestApiConsume()
    .done(function(data){
        console.log(data);
        return data;
    });

console.log(results);