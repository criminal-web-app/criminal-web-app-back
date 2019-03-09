'use strict';

const bcrypt            = require('bcryptjs');
const mysql             = require('anytv-node-mysql');
const util              = require('./../helpers/util');
const uuidv4            = require('uuid/v4');
const jwt               = require('jsonwebtoken');
const err_response      = require('./../libraries/response').err_response;
                          require('./../config/err_config');
                          require('./../config/config');


const user  = {
    first_name   : '',
    last_name    : '',
    username    : '',
    email       : '',
    password    : '',
    phone_number : '',
    _role_id      : '',
    address : ''
}

const opt_user = {
    _first_name   : '',
    _last_name    : '',
    _username    : '',
    _email       : '',
    _password    : '',
    _phone_number : '',
    _role_id      : '',
    _address : ''
}

const user_login = {
    username : '',
    password : ''
}


/**
 * @api {get} v1/users                      Request User information
 * @apiName Get Users
 * @apiGroup Users
 *
 * @apiParam   {String}     [search]        Search matching first name,last name,username
 * 
 * @apiSuccess {String}     first_name      First name of the user
 * @apiSuccess {String}     last_name       Last name of the user
 * @apiSuccess {String}     username        Username of the user
 * @apiSuccess {String}     email           Email address of the user
 * @apiSuccess {String}     phone_number    Phone number of the user
 * @apiSuccess {String}     role_id         Role id of the user
 * @apiSuccess {String}     address         Address of the user
 */



const getUsers = (req,res,next)=>{
    res.setHeader('Content-Type', 'application/json');
    const {
        username,
        first_name,
        last_name,
        search
    } = req.query;

    let where = ' WHERE user.deleted IS null '

    if(search){
        where += `
            AND first_name LIKE '%${search}%' \
            OR last_name LIKE '%${search}%' \
            OR username LIKE '%${search}%' \
        `;
    }

    function start(){
        mysql.use('master')
        .query(
            `SELECT \
            user.id AS id, \ 
            first_name,\
            last_name, \
            username, \
            email, \
            phone_number, \
            address, \
            name AS role, \
            user.created, \
            user.updated, \
            user.deleted \
            FROM users user\
            LEFT JOIN roles role \ 
            ON role.id = user.role_id \
            ${where}`,
            send_response
        )
        .end();
    }
    function send_response(err,result,args,last_query){
        if(err){
            console.log(err);

            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }

        return res.json({
            message : 'Success!',
            data : result
        })
        .status(200)
        // .send();
    }

    start();
}
/**
 * @api {get} v1/users/:id                  Request Specific User information
 * @apiName Get User By Id
 * @apiGroup Users
 * 
 * @apiParam   {String}     id              Id of the user
 * 
 * @apiSuccess {String}     first_name      First name of the user
 * @apiSuccess {String}     last_name       Last name of the user
 * @apiSuccess {String}     username        Username of the user
 * @apiSuccess {String}     email           Email address of the user
 * @apiSuccess {String}     phone_number    Phone number of the user
 * @apiSuccess {String}     role_id         Role id of the user
 * @apiSuccess {String}     address         Address of the user

 */

const getUserById = (req,res,next)=>{
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    function start(){

        mysql.use('master')
        .query(
            `SELECT * FROM users WHERE id = ?`,
            [req.params.id],
            send_response
        )
        .end();
    }
    function send_response(err,result,args,last_query){
        if(err){
            console.log(err);

            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }

        return res.status(200).json({
            message : 'Success!',
            data : result
        })
        // .send();
    }

    start();
}

/**
 * @api {post} v1/users                     Create User 
 * @apiName Create User
 * @apiGroup Users
 * 
 * 
 * @apiParam {String}       first_name      First name of the user
 * @apiParam {String}       last_name       Last name of the user
 * @apiParam {String}       username        Username of the user
 * @apiParam {String}       password        Password of the user
 * @apiParam {String}       confirm_password Confirm user's Password 
 * @apiParam {String}       email           Email address of the user
 * @apiParam {String}       phone_number    Phone number of the user
 * @apiParam {String}       role_id         Role id of the user
 * @apiParam {String}       address         Address of the user
 */

async function getRole(res,data){
    let query = `
        SELECT id FROM roles WHERE name = '${data}'
    `;

    let err,role;

    [err,role] = await to(mysql.build(query).promise());

    if(err) return err_response(res,err,BAD_REQ,500);

    return role[0];
}

const createUser = (req,res,next)=>{
    res.setHeader('Content-Type', 'application/json');
    const data = util._get
    .form_data(user)
    .from(req.body);
    let password = '';

    let {
        role
    } = req.query;
    
    let error,roles;

    async function start(){
        if(data instanceof Error){
            return err_response(res,data.message,INC_DATA,500);
        }

        role = role?role:'customer';
        if(role){
            [error,roles] = await to(getRole(res,role))
            console.log(roles);
            if(error) return err_response(res,err,BAD_REQ,500);

            data.role_id = roles.id; 
        }

        mysql.use('master')
            .query(`SELECT * FROM users where username = '${data.username}'`,create_user)
            .end();
    }

    function create_user(err,result,args,last_query){
        
        if(err){
            console.log(err);

            return err_response(res,BAD_REQ,err,500);
        }

        if(result.length){
            return err_response(res,INVALID_USER,INVALID_USER,404);
        }
        
        data.id = uuidv4();
        data.created = new Date();
        data.updated = null;
        data.role_id = data.role_id? data.role_id : null;

        bcrypt.hash(data.password, 10, function(err, hash) {
            if(err) err_response(res,err,BAD_REQ,500);
            data.password = hash;
            mysql.use('master')
            .query(`INSERT INTO users SET ?`,
                data,
                send_response
            )
            .end();
        });


    }

    function send_response(err,result,args,last_query){

        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.affectedRows){
            return err_response(res,ERR_CREATING,NO_RECORD_CREATED,402)
        }

        return res.status(200).json({
            data : {
                firstName : data.first_name,
                lastName : data.last_name,
                username : data.username,
                email : data.email
            },
            message : 'Success'
        })
        // .send();
    }

    start();
}

/**
 * @api {put}  v1/users/:id                 Update User information 
 * @apiName  Update User
 * @apiGroup Users
 * 
 * @apiParam {String}       [first_name]    First name of the user
 * @apiParam {String}       [last_name]     Last name of the user
 * @apiParam {String}       [username]      Username of the user
 * @apiParam {String}       [password]      Password of the user
 * @apiParam {String}       [email]         Email address of the user
 * @apiParam {String}       [phone_number]  Phone number of the user
 * @apiParam {String}       [role_id]       Role id of the user
 * @apiParam {String}       [address]       Address of the user
 */

const updateUser = (req,res,next)=>{
    res.setHeader('Content-Type', 'application/json');
    const data = util._get
    .form_data(opt_user)
    .from(req.body);
    let id = req.params.id;

    let {
        role
    } = req.query;


    function start(){
    
        if(data instanceof Error){
            return err_response(res,data.message,INC_DATA,500);
        }
    
        mysql.use('master')
            .query(`SELECT * FROM users WHERE id='${id}'`,update_user)
            .end();
    
    }

    async function update_user(err,result,args,last_query){

        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }

        if(role){

        [error,roles] = await to(getRole(res,role));

        if(error) return err_response(res,err,BAD_REQ,500);

            data.role_id = roles.id; 
        }


            data.updated = new Date();

        mysql.use('master')
            .query(`UPDATE users SET ?`,
            [data],
            send_response
            )
            .end();
    }

    function send_response(err,result,args,last_query){
        if(err){
            console.log(err);

            return err_response(res,BAD_REQ,err,500);
        }
        if(!result.affectedRows){
            return err_response(res,ERR_UPDATING,NO_RECORD_UPDATED,402)
        }

        return res.status(200).json({
            data : data,
            message : 'User updated successfully',
            context : 'Data updated successfully'
        })
        // .send();
    }

    start();
}
/**
 * @api {post} v1/users/login               Login User information
 * @apiName  Login User
 * @apiGroup Users
 * 
 * @apiParam {String}       [username]      Username of the user
 * @apiParam {String}       [password]      Password of the user
 */

const login = (req,res,next)=>{
res.setHeader('Content-Type', 'application/json');
    const data = util._get
    .form_data(user_login)
    .from(req.body);
    let userData = {};
    function start(){
        if(data instanceof Error){
            return err_response(res,data.message,INC_DATA,500);
        }
        mysql.use('master')
            .query(`SELECT user.*,role.name AS role FROM users user
                    LEFT JOIN roles role
                    ON role.id = user.role_id
                    WHERE user.username = ?`,
                data.username,
                validate_password
                )
                .end();
    }

    function validate_password(err,result,args,last_query){
        console.log(result);
        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }

        let userData = {  
                id          : result[0].id,                  
                first_name  : result[0].first_name,
                last_name   : result[0].last_name,
                username    : result[0].username,
                email       : result[0].email,
                phone_number: result[0].phone_number,
                role        : result[0].role

            };
        

        bcrypt.compare(data.password,result[0].password,(err,resp)=>{

            if(err){
                console.log(err);

                return err_response(res,LOG_FAIL,err,500);
            }
    
            if(!resp){
                return err_response(res,`${INV_USER}/${INV_PASS}`,LOG_FAIL,404);
            }
            if(resp){
                const token = jwt.sign({
                    id          : result[0].id,
                    first_name  : result[0].first_name,
                    last_name   : result[0].last_name,
                    username    : result[0].username,
                    email       : result[0].email,
                    phone_number: result[0].phone_number,
                    role        : result[0].role
                },JWT_TOKEN);

                if(saveToken(res,token)===false){
                    return err_response(res,NO_TOKEN_CREATED,err,500);
                }
                userData.token = `Bearer ${token}`;
                return res.status(200).json({
                    message     : 'Success',
                    data        : userData,
                    //token       : `Bearer ${token}`,
                    success     : true
                })
                // .send();
            }
            
        });
    }

    start();
}


/**
 * @api {post}  v1/users/logout                 Logout User 
 * @apiName  Logout User
 * @apiGroup Users
*/

const logout = (req,res,next)=>{
    res.setHeader('Content-Type', 'application/json');

    let token = req.user.token;

    function start(){
        mysql.use('master')
        .query(`
            DELETE FROM tokens WHERE token = ?
        `,
        token,
        send_response
        )
        .end();
    }


    function send_response(err,result,args,last_query){


        return res.status(200).json({
            message : 'Sucessfully logged out',
            context : "Token deleted successfully"
        });
   
    }

    start();
}


function saveToken(res,token){
    let data = {};

    data.id = uuidv4();
    data.token = token;
    data.created = new Date();
    function start(){
        mysql.use('master')
            .query(
                `
                    INSERT INTO tokens SET ?
                `,
                data,
                validate_token
            )
            .end();
    }

    function validate_token(err,result,args,last_query){
        if(err){
            return false
        }

        if(!result.affectedRows){
            return false
        }

        return true;
    }

    start();
}

/**
 * @api {put}  v1/delete-user/:id                 Delete User 
 * @apiName  Delete User
 * @apiGroup Users
*/

const deleteUser = (req,res,next)=>{

    const id = req.params.id;
    let old_data = {};

    function start(){
        mysql.use('master')
            .query(`SELECT 
                id, \ 
                first_name,\
                last_name, \
                username, \
                email, \
                phone_number, \
                address \
                FROM users WHERE id = '${id}' \
                AND deleted IS null
                `,delete_info)
            .end();
    }

    function delete_info(err,result,args,last_query){
        if(err){
            return err_response(res,err,BAD_REQ,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }

        old_data = result[0];

        mysql.use('master')
            .query(`UPDATE users SET deleted = NOW() WHERE id = '${result[0].id}'`,send_response)
            .end();
    }

    function send_response(err,result,args,last_query){
        if(err){
            return err_response(res,err,BAD_REQ,500);
        }

        if(!result.affectedRows){
            return err_response(res,NO_RECORD_UPDATED,NO_RECORD_UPDATED,404);
        }

        return res.json({
            deleted_data : old_data,
            message : 'Sucessfully deleted user',
            context : 'Deleted successfully'
        })
        // .send(); 
    }

    start();
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout
}