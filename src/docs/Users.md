## User Route Requests

### User Sign In Post Endpoint

##### Request

* `SERVER_URL/api/users/login`

Method
* `POST`

Headers:
* `Content-Type: "application/json"`

Permissions:
* `Super admin`
* `Mosque admin`

Request body:
| Name | Description | Type | Required |
| ----------- | ----------- | ---- | --- |
| username | User's username (4, 64, unique) | String | true |
| password | User's password (6, 64) | String | true |

##### Response status codes

* `201 - Logged in`
* `400 - Username || Password is incorrect`
* `500 - Internal Server Error`

### User Get All Endpoint

##### Request

* `SERVER_URL/api/users/`

Method
* `GET`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`

Query body:
| Name | Default | Type | Required |
| ----------- | ----------- | ---- | --- |
| limit | 20 | Number | false |
| offset | 0 | Number | false |

##### Response status codes

* `200 - OK`  
* `500 - Internal Server Error`

### User Get One Endpoint

##### Request

* `SERVER_URL/api/users/:user_id`

Method
* `GET`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`
* `Mosque admin`
* `User`

##### Response status codes

* `200 - OK`  
* `400 - Not found`  
* `500 - Internal Server Error`

### User Update Endpoint

##### Request

* `SERVER_URL/api/users/:user_id`

Method
* `PUT`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`
* `Mosque admin`
* `User`

Body:
| Name | Type | Required |
| ----------- | ---- | --- |
| full_name | String | false |
| phone_number | String (+998) | false |

##### Response status codes

* `200 - OK`  
* `400 - Failed`  
* `500 - Internal Server Error`

### User Delete Endpoint

##### Request

* `SERVER_URL/api/users/:user_id`

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