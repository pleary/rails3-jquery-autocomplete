/*
* Unobtrusive autocomplete
*
* To use it, you just have to include the HTML attribute autocomplete
* with the autocomplete URL as the value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete">
*
* Optionally, you can use a jQuery selector to specify a field that can
* be updated with the element id whenever you find a matching value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete" data-id-element="#id_field">
*/
(function(b){var a=null;b.fn.railsAutocomplete=function(){var c=function(){if(!this.railsAutoCompleter){this.railsAutoCompleter=new b.railsAutocomplete(this);}};if(b.fn.on!==undefined){return $(document).on("focus",this.selector,c);}else{return this.live("focus",c);}};b.railsAutocomplete=function(c){_e=c;this.init(_e);};b.railsAutocomplete.fn=b.railsAutocomplete.prototype={railsAutocomplete:"0.0.1"};b.railsAutocomplete.fn.extend=b.railsAutocomplete.extend=b.extend;b.railsAutocomplete.fn.extend({init:function(d){d.delimiter=b(d).attr("data-delimiter")||null;d.min_length=b(d).data("min-length")||2;function c(e){return e.split(d.delimiter);}function f(e){return c(e).pop().replace(/^\s+/,"");}b(d).autocomplete({source:function(h,e){var g={term:f(h.term)};for(i in b(d).data()){if(i.substr(0,7)=="include"){parameter=i.substr(7).toLowerCase();g[parameter]=b(b(d).data(i)).val();}}b.getJSON(b(d).attr("data-autocomplete"),g,function(){if(arguments[0].length==0){arguments[0]=[];arguments[0][0]={id:"",label:"no existing match"};}b(arguments[0]).each(function(j,k){var l={};l[k.id]=k;b(d).data(l);});e.apply(null,arguments);});},change:function(g,j){if(b(b(this).attr("data-id-element")).val()==""){return;}b(b(this).attr("data-id-element")).val(j.item?j.item.id:"");var k=b.parseJSON(b(this).attr("data-update-elements"));var h=j.item?b(this).data(j.item.id.toString()):{};for(var e in k){b(k[e]).val(j.item?h[e]:"");}},search:function(){var e=f(this.value);if(e.length<d.min_length){return false;}},focus:function(){return false;},select:function(h,l){var g=c(this.value);g.pop();g.push(l.item.value);if(d.delimiter!=null){g.push("");this.value=g.join(d.delimiter);}else{this.value=g.join("");if(b(this).attr("data-id-element")){b(b(this).attr("data-id-element")).val(l.item.id);}if(b(this).attr("data-update-elements")){var k=b(this).data(l.item.id.toString());var m=b.parseJSON(b(this).attr("data-update-elements"));for(var e in m){b(m[e]).val(k[e]);}}}var j=this.value;b(this).bind("keyup.clearId",function(){if(b(this).val().trim()!=j.trim()){b(b(this).attr("data-id-element")).val("");b(this).unbind("keyup.clearId");}});b(d).trigger("railsAutocomplete.select",l);return false;}});}});b(document).ready(function(){b("input[data-autocomplete]").railsAutocomplete();});})(jQuery);