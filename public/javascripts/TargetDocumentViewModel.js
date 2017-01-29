TargetDocumentViewModel = function(settings){
    console.log("Loading new target doc vm");
    console.log(settings);
    var self = this;

    self.docNo = ko.observable(settings.docNo);
    self.title = ko.observable("");
    self.date = ko.observable("");
    self.keywords = ko.observable("");
    self.body = ko.observable("");

    ko.computed( function(){
        settings.DocumentService.GetTargetDoc(settings.docNo)
            .done( function(data){
                self.title(data.title);
                self.date(data.date);
                self.keywords(data.keywords);
                self.body(data.body);
            });
    });

    self.relevance = ko.observable();

    self.relevant = function(){
        self.relevance(true);
        self.sendQrel();
    };

    self.notRelevant = function(){
        self.relevance(false);
        self.sendQrel();
    };

    self.sendQrel = function(){
        settings.DocumentService.WriteQrel({ topic: settings.TopicNum(), docNo: self.docNo(), relevant: self.relevance()})
            .done( function(data){
                // Do Something
            });
    };
};