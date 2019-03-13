const merge = require('webpack-merge');

const { getBuildConfig } = require('../webpack.build.utils');
const { MINIFY: minify } = require('../constants');

const reactConfig = require('./webpack.config');

const UMDConfig = {};

module.exports = getBuildConfig({
    config: merge.smartStrategy({
        entry: 'append',
        'module.rules': 'append',
        plugins: 'replace',
    })(reactConfig, UMDConfig),
    tech: 'react',
    moduleType: 'umd',
    minify,
});
