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
        body : ko.observable("Loading..."),
        NEQuery : ko.observable("Loading..."),
        allTermsQuery: ko.observable("Loading...")
    };

    self.indexedNew = ko.observable(false);

    // Available Indexes (Initial Setup Also)
    self.availableIndexes = ko.observableArray([]);
    ko.computed(function() {
        //Retrieving available indexes
        console.log("Retrieving available indexes");
        if (self.indexedNew()) self.indexedNew(false);
        settings.DocumentService.GetIndexes()
            .done ( function(data) {
                self.availableIndexes(data.indexPaths);
            });
    });

    self.showAdmin = ko.observable(false);

    self.currentSourceDocument = ko.observable(0);

    // TODO: what is this for?
    self.indexPath = ko.observable();

    self.workingCorpora = ko.observable();
    self.workingCorporaSize = ko.observable(0);

    // Navigation Observables and Logic
    self.showCorporaChoice = ko.observable(true);
    self.showIndexingMenu = ko.observable(false);
    self.showMainApp = ko.observable(false);

    self.documentProgressCounter = ko.computed(function(){
        return parseInt(self.currentSourceDocument())+1 + "/" + (parseInt(self.workingCorporaSize()) +1);
    });

    ko.computed(function() {
        if (self.workingCorpora()) {
            console.log("Retrieving Source Document");
            settings.DocumentService.GetSourceDoc(self.currentSourceDocument(), self.workingCorpora())
                .done(function (data) {
                    self.sourceDoc.created(data.created);
                    self.sourceDoc.released(data.released);
                    self.sourceDoc.classification(data.classification);
                    self.sourceDoc.origin(data.origin);
                    self.sourceDoc.from(data.from);
                    self.sourceDoc.to(data.to);
                    self.sourceDoc.subject(data.subject);
                    self.sourceDoc.body(data.body);
                    self.sourceDoc.NEQuery(data.NEQuery);
                    self.sourceDoc.allTermsQuery(data.allTermsQuery);
                    self.workingCorporaSize(data.amountInCorpora);
                    console.log(self.sourceDoc.allTermsQuery());
                });
        }
    });

    self.beginIndexing = function() {
        settings.DocumentService.IndexSourceFiles(self.indexPath())
            .done( function(data) {
                self.indexedNew(true);
            }); // TODO
    };

    self.appearIndexingMenu = function() {
        self.showIndexingMenu(true);
        self.showCorporaChoice(false);
        self.showMainApp(false);
    };

    self.appearCorporaChoice = function() {
        self.showIndexingMenu(false);
        self.showCorporaChoice(true);
        self.showMainApp(false);
    };

    self.appearMainApp = function() {
        self.showIndexingMenu(false);
        self.showCorporaChoice(false);
        self.showMainApp(true);
    };

    self.nextSourceDocument = function(){
        if (self.currentSourceDocument() < self.workingCorporaSize()){
            self.currentSourceDocument(self.currentSourceDocument() + 1);
        }
    };

    self.previousSourceDocument = function(){
        if (self.currentSourceDocument() > 0) {
            self.currentSourceDocument(self.currentSourceDocument() - 1);
        }
    };

};