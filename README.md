# API Documentation
## CSS
### Fetching CSS By IDs
```http request
GET /css?id=1&id=2&id=3...&id=n
```
Due to the length limitation of URL, do not retrieve more than 200 object at once.   
The response will be in the form of a json array of objects containing every information regarding the requested CSS objects.   