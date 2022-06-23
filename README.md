## What Is Web-Based Editor for PASS?

The web-based editor for PASS enables device-independent modeling with PASS (Parallel Activity Specification Schema) without installing any software, just by visiting the website. The currently supported methods are still very rudimentary, but already allow the modeling of standard processes.

## History of Web-Based Editor for PASS

The editor has been created in the context of the seminar Information Engineering in the summer semester 2022.

## System Overview

The system utilizes the frontend framework Vue.js and is mainly based on the component [flowchart-vue](https://github.com/joyceworks/flowchart-vue). In addition, Vuex is used as central state management and Vue router for dynamic routing.

## Getting started

### Requirements

Developing the project requires that Vue.js and Node.js are installed. A basic understanding of JavaScript/TypeScript, HTML and CSS is also necessary.

### Node.js

Node.js is a requirement for developing and needs to be installed first. If not done yet, please visit the official page [Node.js](https://nodejs.org/en/) and follow the instructions.

### Vue.js

Vue.js is an open source JavaScript framework (similar to React) that is becoming increasingly popular. If you are new to frontend development, the official documentation of [Vue.js](https://vuejs.org) gives a good overview.

### Project setup

```plaintext
npm install
```

After cloning the git repository, cd into the directory and run npm install.

### Compiling for development

```plaintext
npm run serve
```

After all dependencies are installed, run npm run serve. Vue will then run in development mode on localhost (typically port 8080).

### Compiling for production

```plaintext
npm run build
```
