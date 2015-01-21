# twee-session-extension

![Twee.io Logo](https://s3.eu-central-1.amazonaws.com/meshin/public/twee.io.png)

Session Middleware Extension for Twee.io Framework - MVC Framework for Node.js and io.js based on Express.js.

Session depends of `twee-cookies-extension` and `twee-cache-extension/redis`. No need to store sessions in another places. First of all because if this is disk - it is not useful and you don't test your application in real environment. The second reason is that memory does not save your sessions after server restarts. And the last reason is that redis does not have these problems and it is used in production. So you work in the same environment as it is production.

To install it use this command:

```
npm install twee-session-extension --save
```
