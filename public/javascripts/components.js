console.log("Loaded components.js");

ko.components.register('targetdocument', {
    viewModel: TargetDocumentViewModel,
    template:   '<h6 class="bold small" > DocNo: <span data-bind="text: docNo"></span></h6>' +
                '<h6 class="bold small" > Title: <span data-bind="text: title"></span></h6>' +
                '<h6 class="bold small" > Date: <span data-bind="text: date"></span></h6>' +
                '<h6 class="bold small" > Keywords: <span data-bind="text: keywords"></span></h6>' +
                '<h6 class="bold small" > Body: <span data-bind="text: body"></span></h6>' +
                '<a class="btn btn-default" data-bind="click: relevant">Relevant</a>' +
                '<a class="btn btn-default" data-bind="click: notRelevant">Not Relevant</a>'
});

