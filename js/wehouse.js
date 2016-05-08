/*
 * AngularJS for WE Housing
 * Shiqi Zhong
 * 5/7/2016
 */	
 var app = angular.module('wehouse', ['ngMap']);	
  
app.controller('aptList',['$http',function($http){
		  		  
		this.cityInfo = null;
		this.curApt = null;
		this.pageIdx = 0;
		this.perPage = 5;
		this.numberOfPages = 0;
		this.aptList = [];

		var obj = this;
		  
		$http.get('data/apartment.json').success(function(data) {
			// Read in the data
			obj.aptList = data.apartments;
			obj.aptToShow = obj.aptList[0];
			// Calculate Total Pages
			obj.numberOfPages = Math.ceil(obj.aptList.length / obj.perPage);
			// Initial cityInfo			  
			var address = obj.aptToShow.description.split(", ");
			obj.cityInfo = address[1].split(" ")[2] + ", " + address[2];
	 		// Initial apartments address line info
			obj.aptList.forEach(function (apt,index,array){
				  var address = apt.description.split(", ");
				  apt.lineTwo = address[1]+", "+address[2];
				  apt.lineFirst = address[0];
			  });
			// By default list by popularity
			obj.aptList.sort(function(a, b){return b.popularity-a.popularity;});
			});

		// Set Selected Apartnment
		this.selectApt = function(apt){ 
			obj.curApt = apt;
		};

		// Sort 
		this.sortByPopular = function(){
			obj.aptList.sort(function(a, b){return b.popularity-a.popularity;});
			document.getElementById('sort-btn-popularity').className="btn btn-warning active";
			document.getElementById('sort-btn-price').className="btn btn-default active";
		};
		this.sortByPrice = function(){
			obj.aptList.sort(function(a, b){return b.price-a.price;});
			document.getElementById('sort-btn-popularity').className="btn btn-default active";
			document.getElementById('sort-btn-price').className="btn btn-warning active";
		  };		  
	  }]);
// pagination 
app.filter('pagination', function(){
	return function(input, idx){
		idx = +idx;
		return input.slice(idx);
	};
});
