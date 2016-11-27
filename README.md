Site module
===========

In the development phase go to the console an run `mvn jetty:run` inside the module's folder.
For deployment to a standalone jetty-server copy the module *resources* in a folder named *static*.
Also copy the file site.xml in the $jetty.base/webapps.