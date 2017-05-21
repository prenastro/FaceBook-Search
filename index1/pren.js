  window.fbAsyncInit = function() {
              FB.init({
              appId      : '1742952839348527',
              xfbml      : true,
              version    : 'v2.1'
      });
   };

      (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));


      var app = angular.module("Appln", ['angularMoment']);
      app.controller('Ctrl1', function($scope, $http) {
        var tim = this;
        tim.time = new Date();
        $scope.change= function() {
               $('#container1').carousel(0);
        }

         $scope.frmdata = {};
        $scope.pager = false;
       $scope.nextusr = false;
       $scope.prevusr = false;
       $scope.progbar = false;
        $scope.header = false;


        $scope.myFunc = function () {

          $scope.utab= false;
          $scope.ptab = false;
          $scope.etab = false;
          $scope.pltab = false;
          $scope.gtab = false;
          $scope.albposts = false;
          $scope.udata = "";
          $scope.pdata = "";
          $scope.edata = "";
          $scope.pldata = "";
          $scope.gdata = "";
     $('#container1').carousel(0);
         $scope.progbar = true;
         navigator.geolocation.getCurrentPosition(function success(pos) {

         var coord = pos.coords;
   $('#container1').carousel(0);
      $http.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";

      $http.get('./application.php',$.param({Search:$scope.frmdata.input1}))
      .success(function(data1) {
        $scope.utab= true;
        $scope.ptab = true;
        $scope.etab = true;
        $scope.pltab = true;
        $scope.gtab = true;
        $scope.albposts = true;
        $scope.pager = true;
        $scope.udata = data1.user.data;
          $scope.pdata = data1.page.data;
          $scope.edata = data1.event.data;
          $scope.pldata = data1.place.data;
          $scope.gdata = data1.group.data;
       $scope.progbar = false;
       $scope.header = true;
       window.localStorage.clear();

       $scope.fdata = localStorage.getItem("favdata");
       if("next" in data1.user.paging.paging){
           $scope.nextusr = true;
           $scope.nextusrlink = data1.user.paging.paging.next;
       }
       if("previous" in data1.user.paging.paging){
           $scope.prevusr = true;
           $scope.prevusrlink = data1.user.paging.paging.previous;
       }
       if("next" in data1.page.paging.paging){
           $scope.nextpg = true;
           $scope.nextpglink = data1.page.paging.paging.next;
       }
       if("previous" in data1.page.paging.paging){
           $scope.prevpg = true;
           $scope.prevpglink = data1.page.paging.paging.previous;
       }
       if("next" in data1.event.paging.paging){
           $scope.nextevnt = true;
           $scope.nextevntlink = data1.event.paging.paging.next;
       }
       if("previous" in data1.event.paging.paging){
           $scope.prevevnt = true;
           $scope.prevevntlink = data1.event.paging.paging.previous;
       }
       if("next" in data1.place.paging.paging){
           $scope.nextplc = true;
           $scope.nextplclink = data1.place.paging.paging.next;
       }
       if("previous" in data1.place.paging.paging){
           $scope.prevplc = true;
           $scope.prevplclink = data1.place.paging.paging.previous;
       }
       if("next" in data1.group.paging.paging){
           $scope.nextgrp = true;
           $scope.nextgrplink = data1.group.paging.paging.next;
       }
       if("previous" in data1.group.paging.paging){
           $scope.prevgrp = true;
           $scope.prevgrplink = data1.group.paging.paging.previous;
       }
      });
      });
      };

   $scope.prevnext = function(type,link)
   {
     $http({
   method  : 'GET',
   url     : link
   }).success(function(data3){
   if(type=='user')
   {
   $scope.udata = data3.data;
   $scope.prevusrlink = '';$scope.prevusr = false;
   $scope.nextusrlink = '';$scope.nextusr = false;
   if("previous" in data3.paging)
   {
     $scope.prevusrlink = data3.paging.previous;
     $scope.prevusr = true;

   }
   if("next" in data3.paging){
     $scope.nextusrlink = data3.paging.next;
     $scope.nextusr = true;
   }
   }else if(type=='page')
   {
     $scope.pdata = data3.data;
     $scope.prevpglink = '';$scope.prevpg = false;
     $scope.nextpglink = '';$scope.nextpg = false;
     if("previous" in data3.paging)
     {
       $scope.prevpglink = data3.paging.previous;
       $scope.prevpg = true;

     }
     if("next" in data3.paging){
       $scope.nextpglink = data3.paging.next;
       $scope.nextpg = true;
     }
   }else if(type=='event')
   {
     $scope.edata = data3.data;
     $scope.prevevntlink = '';$scope.prevevnt = false;
     $scope.nextevntlink = '';$scope.nextevnt = false;
     if("previous" in data3.paging)
     {
       $scope.prevevntlink = data3.paging.previous;
       $scope.prevevnt = true;

     }
     if("next" in data3.paging){
       $scope.nextevntlink = data3.paging.next;
       $scope.nextevnt = true;
     }
   }else if(type=='place')
   {
     $scope.pldata = data3.data;
     $scope.prevplclink = '';$scope.prevplc = false;
     $scope.nextplclink = '';$scope.nextplc = false;
     if("previous" in data3.paging)
     {
       $scope.prevplclink = data3.paging.previous;
       $scope.prevplc = true;

     }
     if("next" in data3.paging){
       $scope.nextplclink = data3.paging.next;
       $scope.nextplc = true;
     }
   }else if(type=='group')
   {
     $scope.gdata = data3.data;
     $scope.prevgrplink = '';$scope.prevgrp = false;
     $scope.nextgrplink = '';$scope.nextgrp = false;
     if("previous" in data3.paging)
     {
       $scope.prevgrplink = data3.paging.previous;
       $scope.prevgrp = true;

     }
     if("next" in data3.paging){
       $scope.nextgrplink = data3.paging.next;
       $scope.nextgrp = true;
     }
   }

   }).error(function(err){

     $scope.albsdata = [];
     $scope.usrname = '';
     $scope.imgaddr = '';
     $scope.posts = [];

   });

   };

      $scope.localstorage_add = function(i,type)
      {

      i["type1"] = type;
      var arr = localStorage.getItem("favdata");
      if(arr !== null)
      {
          arr1 = JSON.parse(arr);
          rem = arr1.filter(function(arr2) {
          return arr2["id"] !== i["id"];
          });

      if(rem.length == arr1.length){
      arr1.push(i);
      localStorage.setItem("favdata",JSON.stringify(arr1));
      } else {
      localStorage.setItem("favdata",JSON.stringify(rem));
      }
      }
      else {
        arr = [];
        arr.push(i);
        localStorage.setItem("favdata",JSON.stringify(arr));
      }

   $scope.fdata = JSON.parse(localStorage.getItem("favdata"));
    //localStorage.setItem("fav",JSON.stringify(i));
    //var fav1 = JSON.parse(localStorage.getItem("fav"));
      };

     $scope.localstorage_del = function(ind)
      {
        rem1 =    JSON.parse(localStorage.getItem("favdata"));
          rem1.splice(ind,1);
          localStorage.setItem("favdata",JSON.stringify(rem1));
        $scope.fdata = JSON.parse(localStorage.getItem("favdata"));
      };

   $scope.localstorage_marked = function(id)
   {
     //console.log("hello123");
     var arr = JSON.parse(localStorage.getItem("favdata"));
     if(arr != null)
         return arr.some(function(arr2) {
         return arr2["id"] == id;
      });
   };

   $scope.resetfrm = function(){

     $scope.udata = "";
 $scope.pdata = "";
 $scope.edata = "";
 $scope.pldata = "";
 $scope.gdata = "";
 $scope.utab = false;
 $scope.ptab = false;
 $scope.etab = false;
 $scope.pltab = false;
 $scope.gtab = false;
 $scope.albposts = false;
 $('#container1').carousel(0);
  document.getElementById('myfrm').reset();
   }

      $scope.albPosts = function(id,type,i) {

        $scope.albpanel = false;
        $scope.postpanel = false;
             $http.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
             $scope.progbar = true;
             $scope.row1 = id;
             $scope.type2 = type;
             $scope.row3 = i;
             $http.get('./application.php',$.param({Id:id}))
             .success(function(data2) {
               $scope.progbar = false;
               $scope.albpanel = true;
               $scope.postpanel = true;
               postarr = [];
               albsarr = [];

                   $scope.albsdata = [];

                   $scope.imgaddr = '';
                   $scope.usrname = '';
                   $scope.posts = [];

                   if(data2 == '')
                   {
                     $scope.noalbsdata = true;
                     $scope.noposts = true;
                   }
                   else {

                    if("albums" in data2){

                        albsarr = data2["albums"];
                        $scope.noalbsdata = false;
                        if(albsarr.length > 0){
                            $scope.albsdata = albsarr;
                        } else {
                            $scope.noalbsdata = true;
                        }
                   }  else {
                      $scope.noalbsdata = true;
                  }
                      if("posts" in data2){

                         $scope.usrname = data2.name;
                         $scope.imgaddr = data2.picture.url;
                          postarr = data2["posts"];
                          if(postarr.length >0){
                              $scope.posts = postarr;
                              $scope.noposts = false;
                            }else {
                                $scope.noposts = true;
                           }
                      } else {
                          $scope.noposts = true;
                      }
                    }
                    }).error(function(err){
                       $scope.albsdata = [];
                       $scope.usrname = '';
                       $scope.imgaddr = '';
                       $scope.posts = [];
                       $scope.progbar = false;
                       $scope.noalbsdata = true;
                        $scope.noposts = true;
                    });
                };


                $scope.fbposting = function(img,uname){
                  console.log(img);
                    FB.ui({
                       app_id: "1742952839348527",
                       method: 'feed',
                       link: window.location.href,
                       picture: img,
                       name: uname,
                       caption: "FB Post",
                       }, function(response){
                           if (response && !response.error_message)
                               alert("Posted successfully");
                           else
                               alert("Not Posted");
                   });

                };

      });

