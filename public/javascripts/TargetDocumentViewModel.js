// ViewModel for TargetDocument component of system
TargetDocumentViewModel = function(settings){
    // Begin recording time at instantiation
    var openTime = Date.now();
    var self = this;

    self.document = {
        docNo : ko.observable(settings.docNo),
        title : ko.observable(""),
        date : ko.observable(""),
        keywords : ko.observable(""),
        body : ko.observable("")
    };

    self.comment = ko.observable("");
    self.evalMode = ko.observable(settings.EvalMode());

    ko.computed( function(){
        settings.DocumentService.GetTargetDoc(settings.docNo)
            .done( function(data){
                self.document.title(data.title);
                self.document.date(data.date);
                self.document.keywords(data.keywords);
                self.document.body(self.cleanBody(data.body));
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
        var qrelInfo = {
            topic: settings.TopicNum(),
            docNo: self.document.docNo(),
            relevant: self.relevance(),
            reviewTime: (Date.now() - openTime),
            comment: self.comment()
        };
        settings.DocumentService.WriteQrel(qrelInfo)
            .done( function(data){
                // Do Something
            });
        settings.JudgedDocs.push(qrelInfo.docNo);
    };

    self.cleanBody = function(input){
        // Clean out reuters tagging (angle and square brackets -- uses lazy matching .*?)
        var output = input.replace(/(<(.*?)>)|(\[(.*?)\])/gi, "");
        output = output.replace(/\s{5,}/gi, "<br /><br />");
        output = output.replace(/\t/gi, "<br /><br />");
        return output;
    }
};