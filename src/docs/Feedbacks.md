## Feedbacks 

### Create Endpoint

##### Request

* `SERVER_URL/api/feedbacks`

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
| user_id | id of user | String (UUID) | true |
| text | -- | String | true |

##### Response status codes

* `201 - Success`
* `400 - Bad request (incorrect values)`
* `500 - Internal Server Error`

### Get All Endpoint

##### Request

* `SERVER_URL/api/feedbacks`

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

### Get One Endpoint

##### Request

* `SERVER_URL/api/feedbacks/:feedback_id`

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

### Delete Endpoint

##### Request

* `SERVER_URL/api/feedbacks/:feedback_id`

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