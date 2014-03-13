(function(){


// constructor
// give it the element to insert html into
// html that should be inserted
// method - html, prepend or append
// returns a promise that is resolved after insertion
function InsertHTML(el, html, method){

    this.rAF = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    
    var promise = this.insert(el, html, method);
    
    return promise;
    
}


// set up the inserting
// return a promise
InsertHTML.prototype.insert = function(el, html, method){
    var $el = $(el);
    var insertMethod = method || 'html';
    var promise = $.Deferred();
    var observer = new WebKitMutationObserver(function(mutations){
        observer.disconnect();
        this.requestAnimationFrame(
            function(){
                promise.resolve()
            }
        )
    }.bind(this));
    observer.observe(
        $el[0],
        { 
            'childList': true 
        }
    );
    this.requestAnimationFrame(
        function(){
            $el[insertMethod](html);
        }
    );
    return promise;
}

// use requestAnimation to do 
// the actual insertion
InsertHTML.prototype.requestAnimationFrame = function(fn){
    var r = this.rAF;
    r(fn.bind(this));   
}

// check if we've got require
if(typeof module !== "undefined"){
    module.exports = InsertHTML;
}
else{
    window.InsertHTML = InsertHTML;
}

}()); // end wrapper