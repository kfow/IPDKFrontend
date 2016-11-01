/**
 * Created by kelvin on 19/10/2016.
 */


DocumentService = function(){
    console.log("Loaded document service");
    var self = this;

    self.TestApiConsume = function(){
        var data = {documentContent: "This is a test document"};
        return $.ajax({
            type: "POST",
            url: "localhost:8080/ipdk/api/testconsume",
            contentType: "application/json",
            dataType: "jsonp",
            data: data
        });
    }
};