module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 37.5,
        // *表示转换所有属性
        propList: ['*']
      }
    }
  }