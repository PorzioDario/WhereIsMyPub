var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var config = require('./helpers/desiredCapabilities').options;
var client = webdriverio.remote(config);

describe('WhereIsMyPub E2E Tests', () => {

    before(function () {
        this.timeout(50000);
        return client.init();
    });

    // Suite #1
    describe("TestGroup", () => {

        it('should display details modal on click of an element', () => {
            // ---------- ARANGE ------------
            // ------------------------------

            // ------------ ACT -------------
            // select first element of the list
            let el1 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[1]");
            // tap on this element
            el1.click();
            // ------------------------------

            // --------- ASSERT -------------
            let elModal = client.element('android=new UiSelector().resourceId("1e8962d4-f2e3-4e96-8f4e-74bc5e68f664")');
            let title


            // ------------------------------
        });

    });

});