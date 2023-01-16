'use strict';


/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
 if (typeof executor !== "function") {throw new TypeError(/executor.+function/i)};

 this._state = "pending";
 this._handlerGroups = [];  

 executor(this._internalResolve.bind(this),this._internalReject.bind(this))

}

$Promise.prototype._internalResolve = function(data){
    if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data; 

    this._callHandlers();
}};

$Promise.prototype._internalReject = function (error){
    if (this._state === "pending"){
    this._state = "rejected";
    this._value = error
    };
    this._callHandlers();
};

$Promise.prototype._callHandlers = function () {

    while(this._handlerGroups.length){
        let uniqueHandler = this._handlerGroups.shift()

        if (this._state === "fulfilled"){
            if (uniqueHandler.successCb){
                try {
                    const handleReturnValue = uniqueHandler.successCb(this._value);

                        if (handleReturnValue instanceof $Promise){
                                return handleReturnValue.then(
                                   value => uniqueHandler.downstreamPromise._internalResolve(value),
                                    reason => uniqueHandler.downstreamPromise._internalReject(reason)
                                )
                
                        }
                        else { uniqueHandler.downstreamPromise._internalResolve(handleReturnValue)       
                        }
                    }
                catch (error) {
                    uniqueHandler.downstreamPromise._internalReject(error)
                              }
                            }
            else {
                uniqueHandler.downstreamPromise._internalResolve(this._value)
            }     
            }

        else if (this._state === "rejected"){
            if (uniqueHandler.errorCb){
                try {
                    const handleReturnValue = uniqueHandler.errorCb(this._value);

                        if (handleReturnValue instanceof $Promise){

                            if (handleReturnValue instanceof $Promise){
                                return handleReturnValue.then(
                                    value => uniqueHandler.downstreamPromise._internalResolve(value),
                                    reason => uniqueHandler.downstreamPromise._internalReject(reason)
                                )
                        }
                        }
                        else { uniqueHandler.downstreamPromise._internalResolve(handleReturnValue)       
                        }
                    }
                catch (error) {
                    uniqueHandler.downstreamPromise._internalReject(error)
                              }
                            }
            else {
                uniqueHandler.downstreamPromise._internalReject(this._value)
            }     
            }
 }
};

$Promise.prototype.then = function ( successHandler,errorHandler) {
        const downstreamPromise = new $Promise ( () => {})
    this._handlerGroups.push({
        successCb: typeof successHandler === "function" &&  successHandler,
        errorCb : typeof  errorHandler === "function" && errorHandler,
        downstreamPromise,
    });



    if (this._state !== "pending") this._callHandlers()
    return downstreamPromise
};

$Promise.prototype.catch = function (successHandler,errorHandler) {

   return this.then(null, successHandler);
}

 




module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/