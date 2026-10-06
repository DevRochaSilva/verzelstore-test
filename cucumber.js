module.exports = {
    default: {
        paths: [
            'features/**/*.feature'
        ],

        require: [
            'step_definitions/**/*.js',
            'support/**/*.js'
        ],

        format: [
            'progress-bar',
            'summary',

            'json:logs/cucumber-report.json',

            'html:logs/cucumber-report.html'
        ],

        publishQuiet: true
    }
};