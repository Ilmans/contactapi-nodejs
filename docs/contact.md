# Contact API SPec

## Create Contact API

Endpoint : POST /api/contacts

Headers :
- Authorization  : token

Request Body
```json
{
  "first_name" : "Ilman",
  "last_name" : "Sunanuddin",
  "email" : "mnz@o",
  "phone" : "xx"
}
```
Respond Body Success
```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Ilman",
  "last_name" : "Sunanuddin",
  "email" : "mnz@o",
  "phone" : "xx"
  }
}
```

Respond Body error
```json
{
  "errors" : "email used by others contact"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :
- Authorization  : token

Request Body
```json
{
  "first_name" : "Ilman",
  "last_name" : "Sunanuddin",
  "email" : "mnz@o",
  "phone" : "xx"
}
```
Respond Body Success
```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Ilman",
    "last_name" : "Sunanuddin",
    "email" : "mnz@o",
    "phone" : "xx"
  }
}
```

Respond Body error
```json
{
  "errors" : "email used by others contact"
}
```

## get Contact API

Endpoint : GET /api/contacts/:id

Headers :
- Authorization  : token


Respond Body Success
```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Ilman",
    "last_name" : "Sunanuddin",
    "email" : "mnz@o",
    "phone" : "xx"
  }
}
```

Respond Body error
```json
{
  "errors" : "Contact does not found"
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :
- Authorization  : token

Respond Body Success
```json
{
  "data" : "ok"
}
```

Respond Body error
```json
{
  "errors" : "Contact does not found."
}
```


## Search Contact API

Endpoint : GET /api/contacts

Headers :
- Authorization  : token

QUery Params
- name : Search to first_name or last_name
- email : search by email using like,optional
- phone : search by phone using like,optional
- page : number of page,default 1
- size : size per page, default 10
Respond Body Success
```json
{
  "data" : [
    {

    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_items" : 30
  },

}
