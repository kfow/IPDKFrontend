IndexViewModel = function(settings){

    var self = this;

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
        allTermsQuery: ko.observable("Loading...")
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

    // Three Target Document ViewModels
    self.targetDocVM1 = ko.observable();
    self.targetDocVM2 = ko.observable();
    self.targetDocVM3 = ko.observable();

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


    // Tab control
    self.targetDoc1Free = ko.observable(true);
    self.targetDoc2Free = ko.observable(true);
    self.targetDoc3Free = ko.observable(true);

    self.showTargetDoc1 = ko.observable(false);
    self.showTargetDoc2 = ko.observable(false);
    self.showTargetDoc3 = ko.observable(false);

    self.showRetryDialogue = ko.observable(false);

    self.closeTargetDoc1 = function(){
        self.targetDoc1Free(true);
        self.showTargetDoc1(false);
    };

    self.closeTargetDoc2 = function(){
        self.targetDoc2Free(true);
        self.showTargetDoc2(false);
    };

    self.closeTargetDoc3 = function(){
        self.targetDoc3Free(true);
        self.showTargetDoc3(false);
    };

    self.loadTargetDocument = function(doc){
        if (self.targetDoc1Free()){
            console.log("opening tab 1");
            self.targetDocVM1(new TargetDocumentViewModel({
                DocNo: doc.docno,
                DocumentService: settings.DocumentService
            }));
            self.targetDoc1Free(false);
            self.showTargetDoc1(true);
        } else if (self.targetDoc2Free()){
            console.log("opening tab 2");
            self.targetDocVM2(new TargetDocumentViewModel({
                DocNo: doc.docno,
                DocumentService: settings.DocumentService
            }));
            self.targetDoc2Free(false);
            self.showTargetDoc2(true);
        } else if (self.targetDoc3Free()){
            console.log("opening tab 3");
            self.targetDocVM3(new TargetDocumentViewModel({
                DocNo: doc.docno,
                DocumentService: settings.DocumentService
            }));
            self.targetDoc3Free(false);
            self.showTargetDoc3(true);
        } else {
            self.showRetryDialogue(true);
        }
    };
};