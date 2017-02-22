IndexViewModel = function(settings){

    var self = this;
    self.settings = settings;

    // -------------------- Observables --------------------

    self.sourceDoc = {
        docNo: ko.observable("Loading..."),
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
        tfIdfNeQuery: ko.observable("Loading...")
    };

    self.indexedNew = ko.observable(false);

    // Available Indexes (Initial Setup Also)
    self.availableIndexes = ko.observableArray([]);

    self.showAdmin = ko.observable(false);

    self.currentSourceDocument = ko.observable(0);

    // Path to find source docs to index
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

    self.targetDocs = ko.observableArray([]);
    self.judgedTargetDocs = ko.observableArray([]);

    self.evalMode = ko.observable(false);

    self.searchTabVisible = ko.observable(true);

    self.documentProgressCounter = ko.computed(function(){
        return parseInt(self.currentSourceDocument())+1 + "/" + (parseInt(self.workingCorporaSize()) +1);
    });

    ko.computed(function() {
        //Retrieving available indexes
        if (self.indexedNew()) self.indexedNew(false);
        settings.DocumentService.GetIndexes()
            .done ( function(data) {
                self.availableIndexes(data.indexPaths);
            });
    });

    ko.computed(function() {
        if (self.workingCorpora()) {
            // Clear Query Results as soon as source doc changes.
            self.queryResults([]);
            settings.DocumentService.GetSourceDoc(self.currentSourceDocument(), self.workingCorpora())
                .done(function (data) {
                    self.sourceDoc.docNo(data.docNo),
                    self.sourceDoc.created(data.created);
                    self.sourceDoc.released(data.released);
                    self.sourceDoc.classification(data.classification);
                    self.sourceDoc.origin(data.origin);
                    self.sourceDoc.from(data.from);
                    self.sourceDoc.to(data.to);
                    self.sourceDoc.subject(data.subject);
                    self.sourceDoc.body(data.body.replace(/¶(\d)\./gi, "<br /><br />"));
                    self.sourceDoc.NEQuery(data.NEQuery);
                    self.sourceDoc.allTermsQuery(data.allTermsQuery);
                    self.sourceDoc.tfIdfNeQuery(data.tfIdfNeQuery);
                    self.workingCorporaSize(data.amountInCorpora);
                    self.evalMode(false);

                    // Automatic Query on Doc Load - Sending NEQuery atm, could change after evaluation phase.
                    self.neQuery();
                });

        }
    });

    // ------------------ Functions to Trigger API Calls -------------------

    self.beginIndexing = function() {
        settings.DocumentService.IndexSourceFiles(self.indexPath())
            .done( function(data) {
                self.indexedNew(true);
                console.log("Indexed Source Documents: " + data);
                // TODO: Do something with data
            });
    };

    self.query = function() {
        settings.DocumentService.GetQueryResults(self.chosenQuery())
            .done(function (data) {
                self.queryResults(data.results);
            });
    };

    self.addToTopics = function(){
        var topicInformation = {
            subjectQuery: self.sourceDoc.subject().toLowerCase(),
            allTermsQuery : self.sourceDoc.allTermsQuery(),
            neQuery: self.sourceDoc.NEQuery(),
            tfIdfNeQuery: self.sourceDoc.tfIdfNeQuery(),
            source : self.sourceDoc.docNo(),
            topicNum : self.sourceDoc.docNo()
        };
        // TODO: Some way of identifying success here.
        settings.DocumentService.WriteTopic(topicInformation);
        settings.DocumentService.JudgedDocuments(topicInformation.topicNum)
            .done(function (data) {
                self.judgedTargetDocs(data.docNos);
            });


        self.evalMode(true);
    };

    // ------------------ Utility Functions ------------------

    self.neQuery = function() {
        self.queryResults([]);
        self.chosenQuery(self.sourceDoc.NEQuery());
        self.query();
    };

    self.allTermsQuery = function() {
        self.chosenQuery(self.sourceDoc.allTermsQuery());
        self.query();
    };

    self.subjectQuery = function() {
        self.chosenQuery(self.sourceDoc.subject().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"]/g,""));
        self.query();
    };

    self.tfIdfNeQuery = function(){
        self.chosenQuery(self.sourceDoc.tfIdfNeQuery());
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
        self.evalMode(false);
        self.judgedTargetDocs([]);
        if (self.currentSourceDocument() < self.workingCorporaSize()){
            self.currentSourceDocument(self.currentSourceDocument() + 1);
        }
    };

    self.previousSourceDocument = function(){
        self.evalMode(false);
        self.judgedTargetDocs([]);
        if (self.currentSourceDocument() > 0) {
            self.currentSourceDocument(self.currentSourceDocument() - 1);
        }
    };

    self.addTargetDoc = function(object){
        self.targetDocs.push(object.docNo);
    };

    self.removeTargetDoc = function(docNo){
        self.searchTabVisible(true);
        self.targetDocs.remove(docNo);
    };

    self.showSearchTab = function(){
        self.searchTabVisible(true);
    };

    self.openOtherTab = function(){
        self.searchTabVisible(false);
    };

    self.inJudgedTargetDocuments = function(docNo){
        return (!(self.judgedTargetDocs.indexOf(docNo) === -1) && self.evalMode());
    }
};