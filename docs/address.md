# Adress API Spec

## Create address API
Endpoint : POST /api/contacts/:contactId/addresses 

Headers :
- authorization : token

Request Body
```json
{
  "street" : "jlxxx",
  "city" : "xxx",
  "province" : "jawa barat",
  "country" : "indo",
  "postal_code" : 16640
}
```

Respond Body Success :
```json
{
  "data" : {
      "id" : 1,
      "street" : "jlxxx",
      "city" : "xxx",
      "province" : "jawa barat",
      "country" : "indo",
      "postal_code" : 16640
  }
}
```

Respond Body Error :
```json
{
  "errors" : "country is required"
}
```

## Update address API
Endpoint : PUT /api/contacts/:contactId/addresses/:addressId 

Headers :
- authorization : token

Request Body
```json
{
  "street" : "jlxxx",
  "city" : "xxx",
  "province" : "jawa barat",
  "country" : "indo",
  "postal_code" : 16640
}
```

Respond Body Success :
```json
{ "data" : {
    "id" : 1,
    "street" : "jlxxx",
    "city" : "xxx",
    "province" : "jawa barat",
    "country" : "indo",
    "postal_code" : 16640
}
}
```


Respond Body Error :
```json
  {
    "errors" : "country is required"
  }
```


## GET address API
Endpoint : GET /api/contacts/:CONTACTid/addresses/:addressId

Headers :
- authorization : token



Respond Body Success :
```json
{ "data" : {
    "id" : 1,
    "street" : "jlxxx",
    "city" : "xxx",
    "province" : "jawa barat",
    "country" : "indo",
    "postal_code" : 16640
}
}
```
Respond Body Error :
```json
{
  "errors" : "contact doesnt found"
}
```

## List Address Api
  Endpoint : GET /api/contacts/:contactId/addresses
  
  Headers :
  - autharization : token

 Respond body success
 ```json
 {
  "data" : [
    {

    }
  ]
 }
 ```
 Respond Body error
 ```json
 {
  "errors" : "Contact doesnt found"
 }
 ```

 ## Remove address API
 Endpoint : DELETE /api/contacts/:contactId/adresses/:adressId

 Headers :
 - authorization : token

 Respond body success 
 ```json
 {
  "data" : "OK"
 }
 ```
  Respond Body error
 ```json
 {
  "errors" : "ADRESS doesnt found"
 }
 ```

