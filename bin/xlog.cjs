
/**
 * 
 * @param { keyof import("chalk").ChalkInstance } method 
 */
const chalk = async( method ) => await import("chalk").then(fn=>fn.default[method])

/**
 * 
 * @param { string } value 
 * @param {import("boxen").Options} options 
 * @returns 
 */
const boxen = async( value, options = null ) => await import("boxen").then(fn=>fn.default(value, options || {}))

const method = async (method, ...argument) => (await method).apply(undefined, argument)

const write = (...content) => console.info.apply(undefined, content )

const headling = async (...content) => {

  write(

    await boxen(

      await method( chalk('blue'), content),

      {

        padding: 1, 
        
        margin: 1, 
        
        borderStyle: 'round'
        
      }
      
    ),
    
    
    
  )

}


const xLog = {

  headling,

  method,

  write,

  boxen,

  async info(title, ...content) {

    write(

      await method( chalk('bgGrey'), `  ${ title }  `),

      await method( chalk('grey'), content.join(' ')),
      
    )

  },

  async success(title, ...content) {

    write(

      await method( chalk('bgGreenBright'), `  ${ title }  `),

      await method( chalk('greenBright'), content.join(' ')),
      
    )

  },

  async error(title, ...content) {

    write(

      await method( chalk('bgRedBright'), `  ${ title }  `),

      await method( chalk('redBright'), content.join(' ')),
      
    )

  },

  async warning(title, ...content) {

    write(

      await method( chalk('bgYellowBright'), `  ${ title }  `),

      await method( chalk('yellowBright'), content.join(' ')),
      
    )

  },

}

exports.default = xLog;