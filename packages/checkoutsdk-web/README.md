#  CheckoutSDK-Web

*Caution: It's an experimental package not ready for production.*

## Get started
### With npm
    npm install @anwerar/checkoutsdk-web --save
or
    yarn add @anwerar/checkoutsdk-web
#### Import
    import CheckoutSDK from "@anwerar/checkoutsdk-web";
    import  "@anwerar/checkoutsdk-web/dist/esm/checkoutsdk-web.css";
#### Initialise
    const instance = new CheckoutSDK({
     	listUrl:  'List URL goes here,
     	element:  html ID or element, // eg elRef.current
     	theme:  "boxedBlue",
    });
#### Render
    _instance.render() // accepts optional `element` param

### UMD build from CDN
    <script  src="{PATH}/checkoutsdk-web.js"></script>
    <style>
	    @import  url("{PATH}/checkoutsdk-web.css");
    </style>
#### html markup
    <div  id="web-sdk"></div>
#### Initialise
    <script>
	    if (CheckoutSDK) {
	    var  urlSearchParams = new  URLSearchParams(window.location.search);
	    var  params = Object.fromEntries(urlSearchParams.entries());
	    var  instance = new  CheckoutSDK({
		    element:  "web-sdk",
		    listUrl:  params.listUrl,
		    theme:  "boxedOrange"
		});
    </script>
 #### Render
     instance.render("web-sdk");
 OR

     // shadow DOM render
     instance.shadowRender("web-sdk");
## Event Listening
    instance.on("global-error", (error) => {
	    // Do something with the error.
    }

    // Multiple event listeners
	instance.on("instance-init,instance-destroyed", (msg) => {
		console.log(msg);
	});

### Lifecycle events
 1. `instance-init`
 2. `instance-destroyed`
 3. `list-loading`
 4. `list-loaded`
 5. `global-error`
 6. `charge-response`
 7. `network-selection`
 8. `open-popup`
