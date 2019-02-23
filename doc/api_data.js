define({ "api": [
  {
    "type": "post",
    "url": "v1/products",
    "title": "Create Product",
    "name": "Create_Product",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Product description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of the user who created the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "quantity",
            "description": "<p>Product quantity</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "price",
            "description": "<p>Product's price</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/productController.js",
    "groupTitle": "Products"
  },
  {
    "type": "post",
    "url": "v1/products/:id",
    "title": "Update Product",
    "name": "Delete_Product",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the product</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/productController.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "v1/products/:id",
    "title": "Request Specific Product information",
    "name": "Get_Product",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the product</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/productController.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "v1/products",
    "title": "Request Product information",
    "name": "Get_Product",
    "group": "Products",
    "version": "0.0.0",
    "filename": "controllers/productController.js",
    "groupTitle": "Products"
  },
  {
    "type": "post",
    "url": "v1/products/:id",
    "title": "Update Product",
    "name": "Update_Product",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Product description</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": true,
            "field": "quantity",
            "description": "<p>Product quantity</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": true,
            "field": "price",
            "description": "<p>Product's price</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/productController.js",
    "groupTitle": "Products"
  },
  {
    "type": "post",
    "url": "v1/roles",
    "title": "Create Roles",
    "name": "Create_Role",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the role</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/roleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "get",
    "url": "v1/roles",
    "title": "Fetch Roles",
    "name": "Fetch_Role",
    "group": "Roles",
    "version": "0.0.0",
    "filename": "controllers/roleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "v1/users",
    "title": "Create User",
    "name": "Create_User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>Confirm user's Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "v1/delete-user/:id",
    "title": "Delete User",
    "name": "Delete_User",
    "group": "Users",
    "version": "0.0.0",
    "filename": "controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "v1/users/:id",
    "title": "Request Specific User information",
    "name": "Get_User_By_Id",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "v1/users",
    "title": "Request User information",
    "name": "Get_Users",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "v1/users/login",
    "title": "Login User information",
    "name": "Login_User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "v1/users/logout",
    "title": "Logout User",
    "name": "Logout_User",
    "group": "Users",
    "version": "0.0.0",
    "filename": "controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "v1/users/:id",
    "title": "Update User information",
    "name": "Update_User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Address of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/userController.js",
    "groupTitle": "Users"
  }
] });
