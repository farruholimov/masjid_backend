## Categories 

### Create Endpoint

##### Request

* `SERVER_URL/api/categories`

Method
* `POST`

Headers:
* `Content-Type: "application/json"`
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`

Request body:
| Name | Description | Type | Required |
| ----------- | ----------- | ---- | --- |
| name | -- | String | true |
| text | description of category | String | false |
| parent_id | if category is children | Number (id of category) | false |

##### Response status codes

* `201 - Success`
* `400 - Bad request (incorrect values)`
* `500 - Internal Server Error`

### Get All Endpoint

##### Request

* `SERVER_URL/api/categories`

Method
* `GET`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`
* `Mosque admin`
* `User`

Query body:
| Name | Default | Type | Required |
| ----------- | ----------- | ---- | --- |
| limit | 20 | Number | false |
| offset | 0 | Number | false |

##### Response status codes

* `200 - OK`  
* `500 - Internal Server Error`

### Get One Endpoint

##### Request

* `SERVER_URL/api/categories/:category_id`

Method
* `GET`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`

##### Response status codes

* `200 - OK`  
* `400 - Not found`  
* `500 - Internal Server Error`

### Update Endpoint

##### Request

* `SERVER_URL/api/categories/:category_id`

Method
* `PUT`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`

Body:
| Name | Description | Type | Required |
| ----------- | ----------- | ---- | --- |
| name | -- | String | false |
| text | description of category | String | false |
| parent_id | if category is children | Number (id of category) | false |

##### Response status codes

* `200 - OK`  
* `400 - Failed`  
* `500 - Internal Server Error`

### Delete Endpoint

##### Request

* `SERVER_URL/api/categories/:category_id`

Method
* `DELETE`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`

##### Response status codes

* `200 - OK`
* `500 - Internal Server Error`