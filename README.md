Whisp
=============

Whisp is secure messenger that is purely web-based.

It is a work in progress.

For now, you can render some of UI with dummy data.

Installation and run
--------------------

1. Clone this repository locally.

  ```
  mkdir whisp
  cd whisp
  git clone https://github.com/alexeykomov/whisp.git
  ```
2. Update all git submodules.

  ```
  git submodule init
  git submodule update
  ```
3. Specifically update protobuf.  
  ```
  cd ./src/protobuf
  git pull origin json-serialization
  cd ./js
  npm install
  export PROTOC=protoc && gulp dist
  ```

4. Runtimes - Install [Java][jdk], [Python][python] and [Node.js][node.js]. Node.js must be at least of version 6.

5. Globally install following node modules - [Express][express], [Less][less], [Bunyan][bunyan].

  ```
  npm install express -g
  npm install less -g
  npm install grunt-cli -g
  npm install bunyan -g
  ```

6. Locally to project, install all needed node modules.

  ```
  cd whisp
  npm install
  ```

7. Compile from sources.

  ```
  npm run compile-ui
  npm run compile-worker
  npm run compile-less
  ```

8. Launch an application.

  ```
  npm run start-debug
  ```

9. Go to [http://localhost:3001/](http://localhost:3001/)

[jdk]: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
[python]: https://www.python.org/download/releases/2.7/
[node.js]: http://nodejs.org/download/
[express]: https://github.com/visionmedia/express
[less]: https://github.com/less/less
[bunyan]: https://github.com/trentm/node-bunyan
[devconsole]: https://console.developers.google.com/project?authuser=1
