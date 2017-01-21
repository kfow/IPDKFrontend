TargetDocumentViewModel = function(settings){
    var self = this;

    self.docno = ko.observable(settings.DocNo);
    self.title = ko.observable("");
    self.date = ko.observable("");
    self.keywords = ko.observable("");
    self.body = ko.observable("");

    ko.computed( function(){
        settings.DocumentService.GetTargetDoc(settings.DocNo)
            .done( function(data){
                self.title(data.title);
                self.date(data.date);
                self.keywords(data.keywords);
                self.body(data.body);
            });
    });

    self.relevance = ko.computed();

    self.relevant = function(){
        self.relevance(true);
        self.sendQrel();
    };

    self.notRelevant = function(){
        self.relevance(false);
        self.sendQrel();
    };

    self.sendQrel = function(){
        settings.DocumentService.WriteQrel({ topic: 1, docno: self.docno(), relevant: self.relevance()})
            .done( function(data){
                // Do Something
            });
    };
};