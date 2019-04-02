const _ = require('lodash')
const {stylesheet, ruleset, atrule} = require('./stylesheetutils');
const textTokens = require('../dist/index.common');

const SCALE = ['heading-lg', 'heading-md', 'heading-sm', 'base-lg', 'base-md', 'base-sm'];

const capitalize = str => {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1, str.length)}`;
}

const typeTokenList = () => {
  const tokenCssVarName = (tokenName) => `--${_.kebabCase(tokenName)}`
  return _.map(textTokens, (tokenValue, tokenName) => [tokenCssVarName(tokenName), tokenValue]);
}

function typeStyleSheet() {
  const typeCssClasses = SCALE.map(scale => {
    let cssClassName = `.fontSize${scale.split('-').map(capitalize).join('')}`
    let rules = ruleset(cssClassName, [
      ['font-size', `var(--fontsize-${scale})`],
      ['line-height', `var(--lineheight-${scale})`],
      ['letter-spacing', `var(--letterspacing-${scale})`]
    ])
    return rules
  })

  console.log(
    stylesheet(
      null,
      [
        ruleset(':root', typeTokenList()),
        ...typeCssClasses
      ]
    )
  );
}

typeStyleSheet()