<h3>A boilerplate using React with Redux on Google App Engine (Python).</h3>
This boilerplate uses Gulp for automated building. Following plugins are also being used for seamless development:
<ul>
    <li><b><a href="https://github.com/milankinen/livereactload">LiveReactLoad</a></b> - allows hot-reloading for React components; no need refreshing browser.</li>
    <li><b><a href="https://www.browsersync.io">BrowserSync</a></b> - allows hot-reloading for CSS files / page styles; no need refreshing the browser. </li>
</ul>
<br><br>
**BUILD INSTRUCTIONS**
<ol>
<li>Run `npm install` first to install the Node.js modules.</li>
<li>To build as PRODUCTION, either:</li>
    <ul>
    <li>Run `build-prod` task; OR</li>
    <li>Run `gulp --production` in terminal</li>
    </ul>
<li>To build as DEVELOPMENT, either:</li>
    <ul>
    <li>Run `build-dev` task; OR</li>
    <li>Run `gulp --development` in terminal</li>
    </ul>
<li>To WATCH for changes and build, either:</li>
    <ul>
    <li>Run `watch` task; OR</li>
    <li>Run `gulp --watch` in terminal</li>
    </ul>
<li>For BrowserSync:</li>
    <ul>
    <li>Run `gulp --watch --proxy_host=<HOST:localhost> --proxy_port=<PORT:8080>`</li>
    <li>Open http://localhost:3000</li>
    </ul>
<ol>