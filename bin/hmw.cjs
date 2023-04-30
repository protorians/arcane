#!/usr/bin/env node

const esbuild = require('esbuild');
const {globSync} = require("glob");
const path = require('path');
const { cwd } = require('process');
const nodemon = require('nodemon');
const { spawn } = require('child_process');
const { existsSync, readFileSync, watch } = require('fs');
const { default : xLog} = require('./xlog.cjs')

const UiD = path.basename(process.argv[1] || 'hmw');

const Name = "Protorians Hybrid Module Workspace";

/**
 * 
 * @param { typeof nodemon.config } config 
 * @param { string } _dir 
 * @returns { typeof nodemon.config }  
 */
const mergeConfigs = (config, _dir) => Object.assign({}, {
    
  ext: ".ts",

  ignore: [

    `${ _dir }${ path.sep }node_modules${ path.sep }*`,
    
  ],

  exec: `${ UiD } --build ${ _dir }`

}, config);


switch(process.argv[2]){

  case '--watch':

  case '-w':

    const _dir = process.argv[3] || cwd();

    const configFile = path.resolve(_dir, '.hmw.json')
    
    const config = existsSync(configFile) ? JSON.parse(readFileSync(configFile)) : {}
    
    
    // xLog.headling( Name )

    // console.info('Config used', JSON.stringify(config, null, 2))

    spawn('tsc', ['--watch', `-p`, `${ path.resolve(_dir, 'tsconfig.json') }`])

    watch( configFile, ()=>{

      ndm.config = mergeConfigs(

        existsSync(configFile) ? JSON.parse(readFileSync(configFile)) : {},

        _dir
        
      );
    
      console.log(Name, 'Updated')
      
    })

    const ndm = nodemon( mergeConfigs(

      config,

      _dir
      
    ) );

    ndm.on('start', ()=>{
      
      xLog.success(Name, 'started...')
      
    })

    ndm.on('crash', ()=>{
      
      xLog.error(Name, 'crash detected...')
      
      xLog.info(Name, 'restart...')
      
    })

    ndm.on('quit', ()=>{
      
      xLog.error(Name, 'Do you want to quit ?')
      
      xLog.info('Ctrl + C', 'to quit')
    })

    ndm.on('restart', ()=>{
      
      xLog.info(Name, 'Generate...')

    })

  break;





  case '--build':

  case '-b':

    const dir = process.argv[3] || cwd();

    const entryPoints = Array.from( globSync( path.resolve( dir, "**/*.ts") ) );

    esbuild.build({
  
      entryPoints,
  
      bundle: false,
  
      outdir: "./",
  
      outExtension: { 
  
        '.js': '.mjs',
  
      },
  
      format: 'esm',
  
    }).then(data => {

      if(data.errors.length) console.error('Error', data.errors)
      
      if(data.warnings.length) console.warn('Error', data.warnings)

    })


  break;

}



