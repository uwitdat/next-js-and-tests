module.exports = {
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ]
};