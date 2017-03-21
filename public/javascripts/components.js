// register the target document component
// ViewModel can be found in TargetDocumentViewModel.js
// Template can be seen below
ko.components.register('targetdocument', {
    viewModel: TargetDocumentViewModel,
    template: '<h6 class="bold small" > DocNo: <span data-bind="text: document.docNo"></span></h6>' +
              '<h6 class="bold small" > Title: <span data-bind="text: document.title"></span></h6>' +
              '<h6 class="bold small" > Date: <span data-bind="text: document.date"></span></h6>' +
              '<h6 class="bold small" > Keywords: <span data-bind="text: document.keywords"></span></h6>' +
              '<p data-bind="html: document.body"></p>' +
              '<a class="btn btn-default" data-bind="click: relevant, visible: evalMode">Relevant</a>' +
              '<a class="btn btn-default" data-bind="click: notRelevant, visible: evalMode">Not Relevant</a>' +
              '<textarea data-bind="textInput: comment, visible: evalMode">'
});

