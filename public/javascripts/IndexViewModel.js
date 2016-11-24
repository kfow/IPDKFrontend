IndexViewModel = function(settings){

    var self = this;

    // Observables
    self.sourceDoc = {
        created : ko.observable("Loading..."),
        released : ko.observable("Loading..."),
        classification : ko.observable("Loading..."),
        origin : ko.observable("Loading..."),
        from : ko.observable("Loading..."),
        to : ko.observable("Loading..."),
        subject : ko.observable("Loading..."),
        subject : ko.observable("Loading..."),
        body : ko.observable("Loading...")
    }
    self.showAdmin = ko.observable(false);

    self.currentSourceDocument = ko.observable();

    self.indexPath = ko.observable();

    ko.computed(function() {
        settings.DocumentService.GetSourceDoc(self.currentSourceDocument())
            .done( function(data) {
                self.sourceDoc.created(data.created);
                self.sourceDoc.released(data.released);
                self.sourceDoc.classification(data.classification);
                self.sourceDoc.origin(data.origin);
                self.sourceDoc.from(data.from);
                self.sourceDoc.to(data.to);
                self.sourceDoc.subject(data.subject);
                self.sourceDoc.subject(data.subject);
                self.sourceDoc.body(data.body);
            });
    });

    self.toggleShowAdmin = function() {
        if (self.showAdmin() === false) {
            self.showAdmin(true);
        } else {
            self.showAdmin(false);
        }
    }

    self.beginIndexing = function() {
        settings.DocumentService.IndexSourceFiles(self.indexPath())
            .done( function(data) {

            });
    }

};