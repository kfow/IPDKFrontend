/**
 * Created by kelvin on 19/10/2016.
 * Responsible for ajax requests to RESTful API to communicate with backend.
 */


DocumentService = function(){
    var self = this;

    self.GetSourceDoc = function(docId, workingCorpora){
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/document/" + workingCorpora + "/" + docId,
            dataType: "json"
        });
    };

    self.GetTargetDoc = function(docno) {
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/document/" + docno,
            dataType: "json"
        });
    };

    self.IndexSourceFiles = function(path){
        return $.ajax({
            type: "POST",
            url: "http://localhost:8080/ipdk/api/index",
            data: JSON.stringify({path: path})
        });
    };

    self.GetQueryResults = function(query){
        return $.ajax({
            type: "POST",
            url: "http://localhost:8080/ipdk/api/query",
            dataType: "json",
            data: JSON.stringify(query)
        });
    };

    self.GetIndexes = function(){
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/index",
            dataType: "json"
        });
    };

    self.WriteTopic = function(topicInformation){
        return $.ajax({
            type: "POST",
            url: "http://localhost:8080/ipdk/api/topic/",
            dataType: "json",
            data: JSON.stringify(topicInformation)
        });
    };

    self.WriteQrel = function(qrelInformation){
        return $.ajax({
            type: "POST",
            url: "http://localhost:8080/ipdk/api/qrel/",
            dataType: "json",
            data: JSON.stringify(qrelInformation)
        });
    };

    self.JudgedDocuments = function(topicNum){
        console.log("Getting Judged Documents");
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/ipdk/api/qrel/" + topicNum,
            dataType: "json"
        });
    };
};