app.controller("mainCtrl", function ($scope, $http, Notification) {
    $scope.nameshop = "foundationshop";
    $scope.namecatalog = "SẢN PHẨM";

    $scope.urlProdCate = "https://a2fshop.com/api/v1/product-category/";
    $scope.urlProds = "https://a2fshop.com/api/v1/product/";
    $scope.urlSearchProd = "https://a2fshop.com/api/v1/search-product/";
    $scope.urlOtherSet = "https://a2fshop.com/api/v1/setting-other/";
    $scope.urlWebSet = "https://a2fshop.com/api/v1/setting-web/";
    $scope.urlImage = 'https://a2fshop.com/uploads/customer/23/' + $scope.nameshop + '/';
    $scope.urlImgBank = "https://a2fshop.com/uploads/common/bank_logo/";

    $scope.changename = function (name) {
        $scope.namecatalog = name;
    };

    $scope.data = {
        availableOptions: [
            {name: 'Mặc định', arrange: '', boolean: ''},
            {name: 'Giá : Từ thấp tới cao', arrange: '(1 - price_off_percent / 100)*price_vn', boolean: false},
            {name: 'Giá : Từ cao tới thấp', arrange: '(1 - price_off_percent / 100)*price_vn', boolean: true},
            {name: 'Tên sản phẩm : A > Z', arrange: 'name_vi', boolean: false},
            {name: 'Tên sản phẩm : Z > A', arrange: 'name_vi', boolean: true}
        ],
        selectedOption: {name: 'Mặc định', arrange: '', boolean: ''} //This sets the default value of the select in the ui
    };

    $scope.$on('LOAD', function () {
        $scope.loading = true;
    });
    $scope.$on('UNLOAD', function () {
        $scope.loading = false;
    });

    $http({method: 'GET', url: $scope.urlWebSet + 'get-about-by-shop-name?shop_name=' + $scope.nameshop + '&language=vi-VN'
    }).then(function mySucces(response) {
        $scope.about = response.data;
    }, function myError(response) {
        $scope.about = response.statusText;
    });

    $http({method: 'GET', url: $scope.urlWebSet + 'get-all-news-by-shop-name-and-category-code?shop_name=' + $scope.nameshop + '&category_code=dvu1&language=vi-VN&is_return_array=0'
    }).then(function mySucces(response) {
        $scope.service = response.data;
    }, function myError(response) {
        $scope.service = response.statusText;
    });

}).directive("owlCarousel", function () {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function (element) {
                // provide any default options you want
                var defaultOptions = {
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for (var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
}).directive('owlCarouselItem', [function () {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element) {
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }]);