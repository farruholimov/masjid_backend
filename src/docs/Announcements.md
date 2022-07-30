## Announcements 

### Create Endpoint

##### Request

* `SERVER_URL/api/ads`

Method
* `POST`

Headers:
* `Content-Type: "application/json"`
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`
* `Mosque admin`

Request body:
| Name | Description | Type | Required |
| ----------- | ----------- | ---- | --- |
| name | -- | String (100) | true |
| text | additional info | String | false |
| amount | Needed help amount | Number | true |
| amount_type | Needed help amount type | String (ect. kg) | true |
| priority | -- | String (default: "low" valid: ["low", "medium", "high"]) | false |
| mosque_id | id of mosque | Number | true |
| category_id | id of category | Number | true |

##### Response status codes

* `201 - Success`
* `400 - Bad request (incorrect values)`
* `500 - Internal Server Error`

### Get All Endpoint

##### Request

* `SERVER_URL/api/ads`

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

* `SERVER_URL/api/ads/:ad_id`

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

### Update Endpoint

##### Request

* `SERVER_URL/api/ads/:ad_id`

Method
* `PUT`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`
* `Mosque admin`

Body:
| Name | Description | Type | Required |
| ----------- | ----------- | ---- | --- |
| name | -- | String (100) | false |
| text | additional info | String | false |
| amount | Needed help amount | Number | false |
| amount_type | Needed help amount type | String (ect. kg) | false |
| priority | -- | String (default: "low" valid: ["low", "medium", "high"]) | false |
| category_id | id of category | Number | false |

##### Response status codes

* `200 - OK`  
* `400 - Failed`  
* `500 - Internal Server Error`

### Delete Endpoint

##### Request

* `SERVER_URL/api/ads/:ad_id`

Method
* `DELETE`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`
* `Mosque admin`

##### Response status codes

* `200 - OK`
* `500 - Internal Server Error`