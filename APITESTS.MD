
# File Upload using `/uploadfile` Endpoint

This document describes the process of uploading a file to the server using the `/uploadfile` endpoint.

## Uploading a File

To upload a file, make a POST request to `http://localhost:3000/uploadfile` with the following payload:

```json
{
    "name": "shubham",
    "layer": -1,
    "parent": "null",
    "owner": "shubham21155102",
    "content": "/Users/shubham/Documents/1.uber.pdf"
}
```

```
File uploaded successfully. https://propacityy.s3.ap-south-1.amazonaws.com/42f74c9f-289c-4bb5-946f-45f51130ece8
42f74c9f-289c-4bb5-946f-45f51130ece8 shubham 0 null shubham21155102 https://propacityy.s3.ap-south-1.amazonaws.com/42f74c9f-289c-4bb5-946f-45f51130ece8

```
