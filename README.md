Reality Filter
========

A demo showing how to use HTML5, JavaScript, WebGL ~~and Google Cardboard~~ to create a manipulated view of the world around you via your phone's front camera.

# Adding new filters

Each new filter needs to be pushed in the global `fitlers` array. Each filter has a name, an author and a draw(canvas,context) function. See `/js/filters/example-inverse.js` for a basic filter.

* copy `/js/filters/example-inverse.js` and make your changes
* add the script in index.html


# Testing your code

Browsers impose restrictions on using the camera from file:// protocols, so you can't just open index.html in your browser, you have to serve it on a server.  
_You can use any server to serve the root of this project_.  
Here are a few options to get you started fast.

## http-server (node/npm)

[http-server](https://www.npmjs.com/package/http-server) is a simple zero-configuration command-line http server

Install it using:
```
npm install http-server -g
```

Run it using:
```
cd RealityFilter
http-server
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Github pages

This repo is configured to use the special `gh-pages` branch instead of master. This creates a github pages site for your project.

To test your code simply push it to github, and access it at `https://<your-username>.github.io/RealityFilter/`. ex: https://danmana.github.io/RealityFilter/


---

If you make something brilliant from this code, please do let me know! I'm on Twitter at @thatpatrickguy, or you can find me at http://www.patrickcatanzariti.com.

PatCat
