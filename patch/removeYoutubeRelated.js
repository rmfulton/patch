// Checking page title
if (document.title.indexOf("YouTube") != -1) {
    //Creating Elements
    let delaySeconds = 10;
    setTimeout(function() {
        var related = document.getElementById('related');
        related.remove();
    }, (delaySeconds* 1000));
}