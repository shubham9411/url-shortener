URL Shortener Microservice
=========================

User stories:
* User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* User Story: When I visit that shortened URL, it will redirect me to my original link.

### Example usage:

`https://delicate-scene.glitch.me/new/https://www.google.com`
`https://delicate-scene.glitch.me/new/https://shubhampandey.in`

### Example output:
```
{
  "original_url": "http://google.com",
  "short_url": "hhttps://delicate-scene.glitch.me/23"
}
```
