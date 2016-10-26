/**
 * Created by kelvin on 19/10/2016.
 */


DocumentService = function(){
    var self = this;

    self.GetNamedEntities = function(){
        return $.ajax({
            type: "GET",
            url: "localhost:8080/ipdk/api/namedentities",
            contentType: "application/json"
        });
    }
};