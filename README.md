# Hacker news clone frontend

## Development

**Node.js:** Before you can start develop in this project, you will need to install node.js. You can get it [here](https://nodejs.org/en/).

1. Expecting you to already have installed Node (and npm - included in node) type `npm install gulp -g` or shortcut `npm i gulp -g`. The `-g` tag means it will be installed "globally". 
2. Clone project `git clone git@github.com:gode-ting/hackerNews-clone-project-frontend.git` or `git clone https://github.com/gode-ting/hackerNews-clone-project-frontend.git` if you haven't made a SSH-key. 
3. Type `cd hackerNews-clone-project-frontend`.
4. Run/type `npm install` or shortcut `npm i` - installs all dependencies, and can take a while.
5. Run/type `gulp`. This will build the website locally and start a server watching for changes.
6. You can start develop! 

## Structure and functionality. 

Everything you change, update or add will update automatically. 

Everything related to the actual webpage will be updated in the **src** folder. 

### _Images_ folder.

Should hold all images.

### _js_ folder.

Should hold all script files.

### _Pug_ folder.

Should hold all "html" files - pug is compiled into html files. 

Ignore folders **partials and regions**. 

**Mixins** is responsible for mixins. 

**Pages** is responsible for all html pages. All pages should be made in it's own folder, with the name being converted to the url (in production), like this: 

* **pages** folder: one index.pug file will be accessible at the root url, ex: `http://gode-ting.surge.sh/`.
* **pages/foo** folder: one index.pug file will be accessible at `http://gode-ting.surge.sh/foo/`. 
* **pages/bar** foldeR: one index.pug file will be accessible at `http://gode-ting.surge.sh/bar/`.

In development all pages will be accessible like 

* **pages/foo:** `localhost:3000/foo/index.html`
* **pages/bar:** `localhost:3000/bar/index.html`

The structure of a pug file will be like this: 

```
1 extends ../template.pug
2 
3 block title
4	- title = "Gode ting"
5 
6 block description
7	- description: "Gode ting Cphbusiness Denmark school project";
8
9 block content
10	h1 GODE TING
```

Line 1: A template file that defines the structure of the page. This will also add the navigation menus to the page. 
Line 3: Meta title of the page, defined in the variable. 

line 6: Meta description of the page, defined in the variable.

line 9: The actual content of that page. 

You can read about pug [here](https://pugjs.org/api/getting-started.html).

### _sass_ folder.

Responsible for all stylings. Will be transpiled to `css`. 

