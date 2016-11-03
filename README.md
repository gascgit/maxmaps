# Max Condos Amenities Map


## Instructions ##

### CSS ###

**Link stylesheet in order after Bootstrap**

* css/hero.css


### SCRIPTS ###

**Link scripts in order after jQuery**

* js/jquery.rwdImageMaps.js
* js/hero.js
* js/flowtype.js


### CODE ###

**Place the following where you want the map**

```html

<div id="map1" style="position:relative; overflow:hidden;">
                  <img class="heroleft" src="img/arrow_left.png" style="z-index: 99;"/>
                  <img class="heroright" src="img/arrow_right.png" style="z-index: 99;" />
                  <!-- POINTS 1 -->
                  <img id="mainmap" src="img/map.jpg" usemap="#image-map" style="max-width:100%; width:100%" />
                  <map class="mappoints" name="image-map">
                     <area target="" alt="" title="" href="" coords="195,460" shape="poly">
                     <area target="" alt="" title="" href="" coords="430,530" shape="poly">
                     <area target="" alt="" title="" href="" coords="520,340" shape="poly">
                     <area target="" alt="" title="" href="" coords="666,518" shape="poly">
                     <area target="" alt="" title="" href="" coords="841,479" shape="poly">
                     <area target="" alt="" title="" href="" coords="856,321" shape="poly">
                     <area target="" alt="" title="" href="" coords="953,538" shape="poly">
                     <area target="" alt="" title="" href="" coords="980,406" shape="poly">
                     <area target="" alt="" title="" href="" coords="1065,643" shape="poly">
                     <area target="" alt="" title="" href="" coords="1249,802" shape="poly">
                  </map>
                  <!-- POINTS 2 -->
                  <img src="img/map.jpg" usemap="#image-map2" style="max-width:100%; width:100%; display:none" class="maphide" />
                  <map class="mappoints" name="image-map2">
                     <area target="" alt="" title="" href="" coords="193,410" shape="poly">
                     <area target="" alt="" title="" href="" coords="430,530" shape="poly">
                     <area target="" alt="" title="" href="" coords="460,342" shape="poly">
                     <area target="" alt="" title="" href="" coords="590,320" shape="poly">
                     <area target="" alt="" title="" href="" coords="730,485" shape="poly">
                     <area target="" alt="" title="" href="" coords="860,455" shape="poly">
                     <area target="" alt="" title="" href="" coords="885,245" shape="poly">
                     <area target="" alt="" title="" href="" coords="975,310" shape="poly">
                     <area target="" alt="" title="" href="" coords="940,490" shape="poly">
                     <area target="" alt="" title="" href="" coords="1160,715" shape="poly">
                  </map>
                  <!-- POINTS 3 -->
                  <img src="img/map.jpg" usemap="#image-map3" style="max-width:100%; width:100%; display:none" class="maphide" />
                  <map class="mappoints" name="image-map3">
                     <area target="" alt="" title="" href="" coords="314,209" shape="poly">
                     <area target="" alt="" title="" href="" coords="430,530" shape="poly">
                     <area target="" alt="" title="" href="" coords="586,769" shape="poly">
                     <area target="" alt="" title="" href="" coords="648,593" shape="poly">
                     <area target="" alt="" title="" href="" coords="784,486" shape="poly">
                     <area target="" alt="" title="" href="" coords="881,510" shape="poly">
                     <area target="" alt="" title="" href="" coords="1022,514" shape="poly">
                     <area target="" alt="" title="" href="" coords="1098,702" shape="poly">
                     <area target="" alt="" title="" href="" coords="1390,585" shape="poly">
                  </map>
               </div>
               <div class="herocontrols text-center"></div>
               ```
