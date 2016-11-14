/**
 * Created by kelvin on 19/10/2016.
 * Responsible for ajax requests to RESTful API to retrieve documents to view.
 */


DocumentService = function(){
    console.log("Loaded document service");
    var self = this;

    self.GetSourceDoc = function(currentDoc){
        var url;
        if (currentDoc != null){
            url = "http://localhost:8080/ipdk/api/sourcedoc?current=" + currentDoc;
        } else {
            url = "http://localhost:8080/ipdk/api/sourcedoc";
        }
        return $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
        });
    }
};