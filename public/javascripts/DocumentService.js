/**
 * Created by kelvin on 19/10/2016.
 * Responsible for ajax requests to RESTful API to retrieve documents to view.
 */


DocumentService = function(){
    var self = this;

    self.GetSourceDoc = function(currentDoc, workingCorpora){
        var url;
        if (currentDoc != null){
            url = "http://localhost:8080/ipdk/api/sourcedoc?current=" + currentDoc
                + "&workingCorpora=" + workingCorpora;
        } else {
            url = "http://localhost:8080/ipdk/api/sourcedoc?workingCorpora=" + workingCorpora;
        }
        return $.ajax({
            type: "GET",
            url: url,
            dataType: "json"
        });
    };

    self.IndexSourceFiles = function(path){
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/indexsourcefiles?path=" + path,
            dataType: "json"
        });
    };

    self.GetIndexes = function(){
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/indexedcorpora",
            dataType: "json"
        });
    };

    self.GetQueryResults = function(query){
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/results?query=" + query,
            dataType: "json"
        });
    };

    self.GetTargetDoc = function(docno) {
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/targetdoc/" + docno,
            dataType: "json"
        });
    }
};