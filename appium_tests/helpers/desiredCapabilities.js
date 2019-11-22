exports.options = {
    desiredCapabilities: {
        platformName: 'android',
        platformVersion: '9.0',
        appPackage: 'io.ionic.starter',
        appActivity: 'io.ionic.starter.MainActivity',
        automationName: 'uiautomator2',
        avdReadyTimeout: 2000,
        deviceName: 'emulator-5554'
        // app: "C:\\Projects\\Ionic\\WhereIsMyPub\\platforms\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk",
        // fullReset: false
    },
    host: 'localhost',
    port: 4723
}