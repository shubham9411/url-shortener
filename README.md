URL Shortener Microservice
=========================

User stories:
* User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* User Story: When I visit that shortened URL, it will redirect me to my original link.
* User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

### Example usage:

`https://delicate-scene.glitch.me/new/https://www.google.com`
`https://delicate-scene.glitch.me/new/https://shubhampandey.in`

### Example output:
```
{
  "original_url": "http://shubhampandey.in",
  "short_url": "https://delicate-scene.glitch.me/BJv9fmViZ"
}
```
