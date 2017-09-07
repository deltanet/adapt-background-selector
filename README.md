# adapt-background-selector

**Background selector** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension allows an image to be added to an article, block or component background.

## Installation

This extension must be manually installed.

If **Background selector** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings Overview

**Background selector** is configured on three levels: article (*articles.json*), block (*blocks.json*) and component (*components.json*).

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-background-selector/blob/master/example.json).  

### Attributes

The Background selector attribute group contains values for **_isEnabled**, **_hideOnMobile**, **_src**, **_position**, **_size**, **_repeat**, **_attachment**, **_color**, and **_mobile**.

>**_isEnabled** (boolean):  Turns on and off the **Background selector** extension. Can be set to disable **Background selector** when not required.  

>**_hideOnMobile** (boolean):  If set to `true`, the image will be hidden on mobile.

>**_src** (string): File name (including path) of the image. Path should be relative to the *src* folder.  

>**alt** (string): This text becomes the image’s `alt` attribute.  

>**_position** (string): Defines the CSS background position class.

>**_size** (string): Defines the CSS background size class.

>**_repeat** (string): Defines the CSS background repeat class.

>**_attachment** (string): Defines the CSS background attachment class.

>**_color** (string): Defines the CSS background color class.

>**_mobile** (object):  This `_mobile` attributes group stores the properties for an image used at mobile size. It contains values for **_isEnabled**, and **_src**.  

>>**_isEnabled** (boolean): If set to `true`, an different image will be used at mobile size.

>>**_src** (string): File name (including path) of the mobile image. Path should be relative to the *src* folder.  

>>**alt** (string): This text becomes the image’s `alt` attribute.  

## Limitations

No known limitations.

----------------------------
**Version number:**  2.0.6    
**Framework versions supported:**  2.0.4    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-background-selector/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes  
**Authoring tool support:** yes
