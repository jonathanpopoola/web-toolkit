function popupSpec(popup) {

    var describeSpec = 'Popup in new window';

    describe(describeSpec, function () {

        popup.init();

        var args = {
            url:"http://www.google.com",
            width:400,
            height:100,
            top:600,
            left:137,
            title:'test title'
        };

        it('clicking share link should open the popup', function () {
            window.open = function (url, title, options) {
                return { url:url, title:title, options:options};
            };

            var windowOpened = popup.open(args);
            expect(windowOpened.url).to.equal("http://www.google.com");
            expect(windowOpened.title).to.equal("test title");
            expect(windowOpened.options).to.equal("top=600,left=137,width=400,height=100");
        });

        it('clicking share link without arguments uses defaults', function () {
            window.open = function (url, title, options) {
                return { url:url, title:title, options:options};
            };

            var windowOpened = popup.open({});
            var expectedOptions = "top=" + (screen.height / 2 - 200 ) + ",left=" + (screen.width / 2 - 200) + ",width=400,height=400";
            expect(windowOpened.url).to.equal(undefined);
            expect(windowOpened.title).to.equal("Sky");
            expect(windowOpened.options).to.equal(expectedOptions);
        });

    });

    return describeSpec;
}

if (window.define) {
    define('specs/popupSpec', ['utils/popup'], function (popup) {
            return popupSpec(popup);
        }
    );
}