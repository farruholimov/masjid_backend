## Mosques 

### Create Endpoint

##### Request

* `SERVER_URL/api/mosques`

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
| location | maps link | String | true |
| longitude | -- | String | true |
| latitude | -- | String | true |
| phone | Mosque's contact phone number | String (+998) | true |
| username | Mosque username for admins (4, 64, unique) | String | true |
| password | Mosque password for admins (6, 64) | String | true |

Files: 
| Name | Description | Type | Required |
| ----------- | ----------- | ---- | --- |
| image | -- | file | true |

##### Response status codes

* `201 - Success`
* `400 - Bad request (incorrect values)`
* `500 - Internal Server Error`

### Get All Endpoint

##### Request

* `SERVER_URL/api/mosques`

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

* `SERVER_URL/api/mosques/:moque_id`

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