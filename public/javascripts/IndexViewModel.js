IndexViewModel = function(settings){

    var self = this;
    console.log(settings);
    self.settings = settings;
    // Observables

    // Source Document
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
        allTermsQuery: ko.observable("Loading..."),
        // Should this be 0
        topicNum: ko.observable(0)
    };

    self.indexedNew = ko.observable(false);

    // Available Indexes (Initial Setup Also)
    self.availableIndexes = ko.observableArray([]);
    ko.computed(function() {
        //Retrieving available indexes
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

    // Querying
    self.chosenQuery = ko.observable("");
    self.queryResults = ko.observableArray([]);

    // Navigation Observables and Logic
    self.showCorporaChoice = ko.observable(true);
    self.showIndexingMenu = ko.observable(false);
    self.showMainApp = ko.observable(false);

    self.documentProgressCounter = ko.computed(function(){
        return parseInt(self.currentSourceDocument())+1 + "/" + (parseInt(self.workingCorporaSize()) +1);
    });

    ko.computed(function() {
        if (self.workingCorpora()) {
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
                });
        }
    });

    self.beginIndexing = function() {
        settings.DocumentService.IndexSourceFiles(self.indexPath())
            .done( function(data) {
                self.indexedNew(true);
            }); // TODO
    };

    self.query = function() {
        settings.DocumentService.GetQueryResults(self.chosenQuery())
            .done(function (data) {
                self.queryResults(data.results);
            });
        var topicInformation = {
          title : self.chosenQuery(),
          source : self.sourceDoc.origin()
        };
        settings.DocumentService.WriteTopic(topicInformation)
            .done(function (data){
                console.log(data.num);
                self.sourceDoc.topicNum(data.num);
            });
    };

    self.neQuery = function() {
        self.chosenQuery(self.sourceDoc.NEQuery());
        self.query();
    };

    self.allTermsQuery = function() {
        self.chosenQuery(self.sourceDoc.allTermsQuery());
        self.query();
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

    self.targetDocs = ko.observableArray([]);

    self.addTargetDoc = function(object){
        self.targetDocs.push(object.docNo);
    };

    // TODO: Check this logic
    self.removeTargetDoc = function(docNo){
        console.log("Removing Target Doc");
        self.targetDocs.remove(docNo);
        console.log(self.targetDocs());
    };
};