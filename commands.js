#!/usr/bin/env node
//import * as program from 'commander';
import {program} from 'commander';
import {listcustomer,addcustomer,findcustomer,updatecustomer,removecustomer} from './index.js';
import inquirer from 'inquirer';

const questions=[
  {
    type:'input',
  name:"firstname",
    message:"Customer First name"
  },
  {
    type:'input',
  name:"lastname",
    message:"Customer Last name"
  },
  {
    type:'input',
  name:"phone",
    message:"Customer phone"
  },
  {
    type:'input',
  name:"email",
    message:"Customer Email"
  },
  ]
//add
program
.command('add')
.alias('a')
.description('Add a customer')
.action(()=>{
      inquirer.prompt(questions).then(answers=>addcustomer(answers));

});
program
.version('1.0.0')
.description('Client Mangement System')
//find
 program
.command('find <name>')
.alias('f')
.description('Find a customer')
.action(name=>findcustomer(name));

//list
program
.command('list')
.alias('l').description('List a customer')
.action(()=>listcustomer());

//update customer
program
.command('update <_id>')
.alias('u')
.description('Update a customer')
.action((_id)=>{
    inquirer.prompt(questions).then(answers=>updatecustomer(_id,answers));
})

program
.command('remove <_id>')
.alias('r')
.description('Delete a customer data')
.action((_id)=>
removecustomer(_id));

program.parse(process.argv);

