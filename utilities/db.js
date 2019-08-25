const pgp=require('pg-promise');
const props=require('./properties');
const db=pgp(props.dbUrl);

module.exports=db;