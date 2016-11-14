IndexViewModel = function(settings){

    var self = this;

    // Observables
    self.sourceSubject = ko.observable("Loading...");
    self.sourceTags = ko.observable("Loading...");
    self.sourceBody = ko.observable("Loading...");

    self.currentSourceDocument = ko.observable();

    ko.computed(function() {
        settings.DocumentService.GetSourceDoc(self.currentSourceDocument())
            .done( function(data) {
                self.sourceSubject(data.subject);
                self.sourceTags(data.tags);
                self.sourceBody(data.body);
            });
    });

};