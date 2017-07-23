# ZURB Express Template
This is an unofficial ZURB Template for use with [Express](http://expressjs.com/en/4x/api.html) and [Building BLocks](foundation.zurb.com/building-blocks/). It is intended to be incorporated into [Zurb Foundation's CLI](https://github.com/zurb/foundation-cli) as an alternitive to static site prototypes.


## Features
- [Build Blocks Compatable !](http://foundation.zurb.com/building-blocks/)
- [Templates !](http://foundation.zurb.com/templates.html)
- Handlebars HTML templates with Express
- Sass compilation and prefixing
- JavaScript module bundling with webpack
- Built-in BrowserSync/Nodemon server 
  - run nodemon ./server.js localhost 8080
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression
- Optional database (javascript object prototypes by default)

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)
- [Zurb Foundation's CLI](https://github.com/zurb/foundation-cli)


## USE
### Using through git
```bash
git clone https://github.com/HansUXdev/zurb-express
```

### Using the CLI
This template can be MANUALLY installed on the Foundation CLI.

To install it manually on the Foundation CLI you will need change the following files:

foundation-cli/lib/util/questions.js should look like this:

```javascript
	//...
    name: 'template',
    message: 'Which template would you like to use?',
    default: 'basic',
    choices: [{
      name: 'Basic Template: includes a Sass compiler',
      value: 'basic'
    }, {
      name: 'ZURB Template: includes Handlebars templates and Sass/JS compilers',
      value: 'zurb'
    },{
      name: 'Express Template: a basic express server compatible with building blocks',
      value: 'express'
    }]
```
foundation-cli/lib/commands/new.js should look like this:

```javascript
	//...
var repositories = {
  sites: {
    basic: 'https://github.com/zurb/foundation-sites-template.git',
    zurb: 'https://github.com/zurb/foundation-zurb-template.git',
    express: 'https://github.com/HansUXdev/zurb-express'
  },
  apps: 'https://github.com/zurb/foundation-apps-template.git',
  emails: 'https://github.com/zurb/foundation-emails-template.git'
}
```

```bash
npm install foundation-cli --global
```

Use this command to set up a blank Foundation for Sites project with this template:

```bash
foundation new --framework sites --template zurb
```

The CLI will prompt you to give your project a name. The template will be downloaded into a folder with this name.

Now `cd` to your project name and to start your project run 

```bash
foundation watch
```

**Please if you like it star this repo and tell Zurb to add it to the CLI [Zurb Foundation's CLI](https://github.com/zurb/foundation-cli/issues).**