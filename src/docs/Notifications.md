## Feedbacks 

### Get User's notifications Endpoint

##### Request

* `SERVER_URL/api/notifications/:user_id`

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


### Watch Endpoint

##### Request

* `SERVER_URL/api/notifications/:notification_id`

Method
* `PUT`

Headers:
* `Content-Type: "application/json"`  
* `Authorization: "Bearer TOKEN"`

Permissions:
* `Super admin`
* `Mosque admin`
* `User`

##### Response status codes

* `200 - OK`
* `500 - Internal Server Error`