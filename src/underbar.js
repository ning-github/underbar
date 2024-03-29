(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n>array.length){
      return array.slice(0);
    }
    return n === undefined ? array[array.length-1] : array.slice(array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (typeof collection === "object"){
      if (Array.isArray(collection)){
        for (var i = 0; i < collection.length; i++) {
          iterator(collection[i], i, collection);
        }
      }
      else{
        for(var key in collection){
          iterator(collection[key], key, collection);
        }
      }      
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
      var output = [];
      for (var i = 0; i < collection.length; i++) {
        if (test(collection[i])){
          output.push(collection[i]);
        }
      }
      return output;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var filtered = _.filter(collection, test);
    var output=[];
    _.each(collection, function(each){
      if (_.indexOf(filtered, each) === -1) {
        output.push(each);
      }
    });
    return output;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var output=[];
    _.each(array, function(each){
      if (_.indexOf(output, each) === -1){
        output.push(each);
      }
    });
    return output; 
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results=[];
    _.each(collection, function(each){
      results.push(iterator(each));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, function(each){
      if (accumulator === undefined){
        accumulator = each;
      }
      else {
        accumulator = iterator(accumulator, each);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined){
      iterator=_.identity;
    }
    return _.reduce(collection, function(allPresent, each){
      if (iterator(each) && allPresent){
        return true;
      }
      else{
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined){
      iterator=_.identity;
    }

    var none = _.every(collection, function(each){
      return (!iterator(each));
    });

    return !none;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var mainObj = obj;
    //need to convert arguments to a true array
    //  *ran into trouble testing this with JSBin because JSBin's underscore library's
    //    _.last function accepted arguments just straight up.
    var args = Array.prototype.slice.call(arguments);
    // extenders is an array, whose elements are objects
    var extenders = _.last(args, args.length-1);
    _.each(extenders, function(eachObj){
      for (var key in eachObj){
        mainObj[key]=eachObj[key];
      }
    });
    return(mainObj);
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var mainObj = obj;
    var args = Array.prototype.slice.call(arguments);
    var extenders = _.last(args, args.length-1);
    _.each(extenders, function(eachObj){
      for (var key in eachObj){
        //the difference here is that it will now check if mainObj already has that property
        if (!(key in mainObj)) {
          mainObj[key]=eachObj[key];
        }
      }
    });
    return(mainObj);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // a new uniqArgs object is created per func
    //  eg with the function add(a,b){return a+b;}
    //     var memoAdd = _.memoize(add); is only called ONCE
    //      - therefore, memoAdd(1,2) and memoAdd(3,4) share the same uniqArgs object
    var uniqArgs ={};

    return function(){
      var arg = arguments[0]; //assuming only one argument

      if (!(arg in uniqArgs)){
        var result = func.apply(this, arguments);
        uniqArgs[arg] = result;
      }

      return uniqArgs[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var allArgs = Array.prototype.slice.call(arguments);
    var argsToFunc = allArgs.slice(2);

    var runIt = function(){
      return func.apply(this, argsToFunc);
    };

    return setTimeout(runIt, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copiedArray = array.slice();
    var collectedIndices=[];

    for (var i = 0; i < copiedArray.length; i++) {
      var temp = copiedArray[i];
      var randomNumber = Math.floor(Math.random()*array.length);
      copiedArray[i] = copiedArray[randomNumber];
      copiedArray[randomNumber] = temp;
    }

    // to prevent shuffling into the same order as before
    var same = true;
    for (var j = 0; j < copiedArray.length; j++) {
      if (copiedArray[j]!==array[j]){
        same=false;
      }
    }
    if (same){
      return _.shuffle(array);
    }
    else{
      return copiedArray;
    }
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var output = _.map(collection, function(each){
      if (typeof functionOrKey === "string"){ //methods evaluate to "string"
        return each[functionOrKey].apply(each, args)
      }
      else {  // functions evaluate to "function"
       return functionOrKey.apply(each, args);
     }
    });
    return output;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //collection is an array (could be array of objects)
    var copy = collection;

    for (var i = 0; i < copy.length-1; i++) {
      for (var j = 0; j < copy.length-1; j++) {
        var current = copy[j];
        var next= copy[j+1];
        var temp = next;

        if (typeof iterator === "string"){
          if (current[iterator]>next[iterator] || current === undefined){
            copy[j+1] = current;
            copy[j] = temp;
          }
        }
        else{
          if (iterator(current)>iterator(next) || current === undefined){
            copy[j+1] = current;
            copy[j] = temp;
          }
        }
      }
    }
    return copy;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arraysPassed = Array.prototype.slice.call(arguments);
    var output=[];
    
    for (var i = 0; i<arraysPassed.length;i++){
      var eachPush = [];
      for(var j =0; j<arraysPassed.length;j++){
        eachPush.push(arraysPassed[j][i]);
      }
      output.push(eachPush);
    }
    
    return output;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var output=[];
    for(var i=0; i<nestedArray.length;i++){
      var singleVal = nestedArray[i];
      console.log(i);
      if(Array.isArray(singleVal)){
        if (!result){
          singleVal = _.flatten(singleVal, result); //recursion (the call stack will come back here)
        }
        //once a particular nestedArray element has completed recursion, its output wll be traversed
        //  and pushed to the "main" output
        _.each(singleVal, function(each){
          output.push(each);
        });
      }
      else{
        output.push(singleVal);
      }
    }
    return output;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var passedArrays = Array.prototype.slice.call(arguments);
    //find shortest array passed, as that will set limit
    var shortest = passedArrays[0];
    _.each(passedArrays, function(eachArray){
      if (eachArray.length<shortest.length){
        shortest = eachArray;
      }
    });
    
    var output=[];
    
    for (var i=0; i<shortest.length; i++){
      var inAll = true;
      _.each(passedArrays, function(eachArray){
          if (!(_.contains(eachArray, shortest[i]))){
            inAll=false;
        }   
      });
      //if a given element shortest[i] checked in eachArray of passedArrays without returning false
      if(inAll){
        output.push(shortest[i]);
      }
    }
    return output;     
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments);
    
    var oneArray = args[0];
    var others = _.last(args, args.length-1);
    var combined = _.flatten(others, true);

    var output = _.filter(oneArray, function(each){
      return (!_.contains(combined, each));
    });
    return output;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

    var result;
    var firstCall = true; //the first call
    var canSched = true; //control against overbooking

    return function(args){  //the returned function uses closure
      if (firstCall){       // the first call allows for calling func
        firstCall = false;
        canSched = true;      //reopens for scheduling  
        result = func(args);  //where call of func actually occurs
      }

      if(canSched){
        canSched=false; //now can't book multiple calls
        setTimeout(function(){  
          result = func(args); //calls func after waiting the the wait time
          return result;  
        },wait);                
      }
      
      return result;  // the throttled function always returns the most current result
    };
  };
}());
