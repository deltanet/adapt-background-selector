# adapt-background-selector

**Background selector** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension allows an image to be added to a page, menu, article, block or component as a background.

## Installation

This extension must be manually installed.

If **Background selector** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings Overview

**Background selector** is configured on four levels: page (*contentObjects.json*), article (*articles.json*), block (*blocks.json*) and component (*components.json*).

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-background-selector/blob/master/example.json).  

### Attributes

The Background selector attribute group contains values for **_isEnabled**, **_color**, **_image**, **_gradient**, **_video**, and **_parallax**.

>**_isEnabled** (boolean):  Turns on and off the **Background selector** extension. Can be set to disable **Background selector** when not required.  

>**_color** (string): Defines the CSS background color class.

>**_image** (object):  This `_image` attributes group stores the properties for the images. It contains values for **_isEnabled**, **_position**, **_size**, **_repeat**, **_attachment**, **_opacity**, **_largeSrc**, **largeAlt**, **_mediumSrc**, **mediumAlt**, **_smallSrc**, and **smallAlt**.  

>>**_isEnabled** (boolean): If set to `true`, the defined images will display.  

>>**_position** (string): Defines the CSS background position class.

>>**_size** (string): Defines the CSS background size class.

>>**_repeat** (string): Defines the CSS background repeat class.

>>**_attachment** (string): Defines the CSS background attachment class.

>>**_opacity** (string): Defines the opacity of the image.

>>**_largeSrc** (string): File name (including path) of the large image. Path should be relative to the *src* folder.  

>>**largeAlt** (string): This text becomes the large image’s `alt` attribute.  

>>**_mediumSrc** (string): File name (including path) of the medium image. Path should be relative to the *src* folder.  

>>**mediumAlt** (string): This text becomes the medium image’s `alt` attribute.  

>>**_smallSrc** (string): File name (including path) of the mobile image. Path should be relative to the *src* folder.  

>>**smallAlt** (string): This text becomes the mobile image’s `alt` attribute.  

>**_gradient** (object):  This `_gradient` attributes group stores the properties for the background gradient. It contains values for **_isEnabled**, **_type**, and **_colors**.  

>>**_type** (string): Defines the type of gradient used. Options are `Bottom Left to Top Right`, `Left to Right`, `Top Left to Bottom Right`, `Top to Bottom`, `Radial`, `Radial Top`, `Radial Bottom`, `Radial Left`, and `Radial Right`.  

>>**_colors** (string): Defines the colors used for the gradient. Format should be a comma separated list of Hex Color Codes.  

>**_video** (object):  This `_video` attributes group stores the properties for the video background. It contains values for **_isEnabled**, **_loopEnabled**, **_disableOnMobile**, and **_src**.  

>>**_isEnabled** (boolean): If set to `true`, the specified video will be shown as the background.  

>>**_loopEnabled** (boolean): If set to `true`, the video will play in a loop.  

>>**_disableOnMobile** (boolean): If set to `true`, the video will be hidden on mobile devices.  

>>**_src** (string): File name (including path) of the video. Path should be relative to the *src* folder.  

>**_parallax** (object):  This `_parallax` attributes group stores the properties for the parallax background. It contains values for **_isEnabled**, and **_items**.  

>>**_isEnabled** (boolean): If set to `true`, the specified video will be shown as the background.  

>>**_items** (array): This `_items` attributes group stores the properties for the background layers in the parallax scene. It contains values for **_src**, and **_offset**.  

>>>**_src** (string): File name (including path) of the image. Path should be relative to the *src* folder.  

>>>**_offset** (number): Defines the value that creates the parallax movement on the image.

## Limitations

No known limitations.

----------------------------
**Version number:**  4.2.0    
**Framework versions supported:**  5.8+    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-background-selector/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes  
**Authoring tool support:** yes
