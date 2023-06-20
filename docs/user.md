# User API Spec

## Register User

Endpoint : POST /api/users
Request Body :
```json
{
  "username" : "mnzcreate",
  "password" : "rahasia",
  "name" : "Ilman S"
}
```
Respon Body Success
```json
{
  "data" : {
    "username" : "mnzcreate",
    "name" : "Ilman S"
  },

}
```
Respon Body Error
``` json
{
  "errors" : "Username already registered"
}
```

## Login User API
Endpoint : POST /api/users/login
Request Body : 
```json
{
  "username" : "mnzcreate",
  "password" : "rahasia"
}
```
Respon body success
```json
 {
  "data" : {
    "token" : "unique-token"
  }
 }
```
Respond Body error
```json
{
  "errors" : "Invalid credentials!"
}
```

## Update User API
Endpoint : PATCH /api/users/current

Headers : autharization

Request Body 
``` json
 {
   "name" : "Ilman s", // optional
   "password" : "111111", // optional
 }
```
Respond body success
```json
{
  "data" : {
    "username" : "mnzcreate",
    "name" : "Ilman s"
  }
}
```
Respond body failed
```json
{
  "errors" : "name length max 100"
}
```

## Get User API
Endpoint : GET /api/user/current

Headers :
- Autharization : token

Respond body success 
```json
{
  "data" : {
    "username" : "...",
    "name" : "..."
  }
}
```
Respond body error
```json
{
  "errors" : "unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Respond body success
```json
{
  "data" : "ok"
}
```
Respond body error 
```json
{
  "errors" : "Unauthorized"
}
```