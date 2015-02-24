var geneticSalesman = function(genes, assessFitness, initiateBloodline, mutate, availableResources){
  var options = {
    numberOfBloodlines: 10,
    offspringPerSurvivor: 30
  };

  /* -------------------- Complete me! -------------------- */
  var offspring = [];
  for(var i = 0; i < options.offspringPerSurvivor ; i++) {
    var route = createRoute(genes);
    offspring.push(route);
  }

  var optimalOffspring = offspring[0];

  for(var j = 0; j < availableResources ; j++) {
    optimalOffspring = offspring[0];
    for(var k = 0; k < offspring.length ; k++) {
      var distance = assessFitness(offspring[k]);
      var optDistance = assessFitness(optimalOffspring);
      if( distance <= optDistance ) {
        optimalOffspring = offspring[k];
      }
    }

    for(var m = 0; m < offspring.length ; m++) {
      var mutation = mutate(optimalOffspring);
      offspring[m] = mutation;
    }

  }

  return optimalOffspring;
}

var createRoute = function(cities){
  var route = cities.slice();
  for(var i = 0; i < route.length; i++){
    var randomIndex = Math.floor(Math.random() * i);
    route[i] = route[randomIndex];
    route[randomIndex] = cities[i];
  }
  return route;
}

var alterRoute = function(route){

  /* -------------------- Complete me! -------------------- */
  var newRoute = route.slice();
  var randomIndex1 = Math.floor(Math.random() * route.length);
  var randomIndex2 = Math.floor(Math.random() * route.length);
  
  var city1 = newRoute[randomIndex1];
  var city2 = newRoute[randomIndex2];
  var temp = newRoute[randomIndex1];

  newRoute[randomIndex1] = newRoute[randomIndex2];
  newRoute[randomIndex2] = temp;

  return newRoute;

};

var calculateDistance = function(route){
  var distances = route.map(function(city, index, route){
    var nextCity = route[index + 1] || route[0];
    var distance = distanceCalculator(city, nextCity);
    return distance;
  });

  return distances.reduce(function(distance1, distance2){
    return distance1 + distance2;
  });
}

