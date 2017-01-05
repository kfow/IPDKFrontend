TargetDocumentViewModel = function(settings){
    var self = this;

    // TODO: place holders, need actual data
    self.title = ko.observable("");
    self.content = ko.observable("");
    self.source = ko.observable("");

    ko.computed( function(){
        settings.DocumentService.GetTargetDoc(settings.DocNo)
            .done( function(data){
                self.title(data.title);
                self.content(data.content);
                self.source(data.source);
            });
    });
};