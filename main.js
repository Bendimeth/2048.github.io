(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Xasen\Desktop\2048\2048\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "HVUV":
/*!*******************************************!*\
  !*** ./src/app/entities/IStoreService.ts ***!
  \*******************************************/
/*! exports provided: GameStatus, MoveTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameStatus", function() { return GameStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveTo", function() { return MoveTo; });
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["InProgress"] = 0] = "InProgress";
    GameStatus[GameStatus["Stuck"] = 1] = "Stuck";
    GameStatus[GameStatus["Finished"] = 2] = "Finished";
})(GameStatus || (GameStatus = {}));
var MoveTo;
(function (MoveTo) {
    MoveTo[MoveTo["Top"] = 0] = "Top";
    MoveTo[MoveTo["Right"] = 1] = "Right";
    MoveTo[MoveTo["Bottom"] = 2] = "Bottom";
    MoveTo[MoveTo["Left"] = 3] = "Left";
})(MoveTo || (MoveTo = {}));


/***/ }),

/***/ "Kk9C":
/*!****************************************!*\
  !*** ./src/app/logic/store.service.ts ***!
  \****************************************/
/*! exports provided: StoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreService", function() { return StoreService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _entities_IStoreService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/IStoreService */ "HVUV");
/* harmony import */ var _shared_math_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/math.service */ "w8QJ");





var StoreService = /** @class */ (function () {
    function StoreService(mathService) {
        this.mathService = mathService;
        this.listChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.state = {
            status: _entities_IStoreService__WEBPACK_IMPORTED_MODULE_3__["GameStatus"].InProgress,
            listValues: [],
            sessionScore: 0,
            bestScore: 0
        };
    }
    StoreService.prototype.onUpdate = function () {
        this.listChanged.next(this.state);
    };
    StoreService.prototype.rollRandom = function (howMany) {
        var _a;
        var randomNumbers = this.mathService.generateRandomNumbers(howMany, this.state.listValues.map(function (cell) { return cell.value; }));
        for (var _i = 0, randomNumbers_1 = randomNumbers; _i < randomNumbers_1.length; _i++) {
            var values = randomNumbers_1[_i];
            this.state.listValues[values.index] = {
                created: true,
                value: values.value,
                destroyed: false
            };
        }
        if (((_a = this.state.listValues.filter(function (cell) { return cell.value === 0; })) === null || _a === void 0 ? void 0 : _a.length) === 0 &&
            !this.mathService.isAnyMovePossible(this.state.listValues.map(function (cell) { return cell.value; }))) {
            this.state = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.state), { status: _entities_IStoreService__WEBPACK_IMPORTED_MODULE_3__["GameStatus"].Finished });
        }
        this.onUpdate();
    };
    StoreService.prototype.initOrResetList = function () {
        this.state = {
            listValues: new Array(16).fill(0, 0, 16).map(function (value) { return ({
                value: value
            }); }),
            bestScore: this.state.sessionScore > this.state.bestScore ? this.state.sessionScore : this.state.bestScore,
            sessionScore: 0,
            status: _entities_IStoreService__WEBPACK_IMPORTED_MODULE_3__["GameStatus"].InProgress
        };
        this.rollRandom(2);
    };
    StoreService.prototype.onMove = function (direction) {
        var result = this.mathService.move(this.state.listValues.slice(), direction);
        this.state = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), { sessionScore: this.state.sessionScore += result.currentMoveScore, bestScore: this.state.bestScore });
        this.rollRandom(1);
    };
    StoreService.prototype.getState = function () {
        return this.state;
    };
    StoreService.ctorParameters = function () { return [
        { type: _shared_math_service__WEBPACK_IMPORTED_MODULE_4__["MathService"] }
    ]; };
    StoreService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_shared_math_service__WEBPACK_IMPORTED_MODULE_4__["MathService"]])
    ], StoreService);
    return StoreService;
}());



/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _entities_IStoreService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/IStoreService */ "HVUV");
/* harmony import */ var _logic_store_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logic/store.service */ "Kk9C");






var AppComponent = /** @class */ (function () {
    function AppComponent(storeService) {
        this.storeService = storeService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storeService.initOrResetList();
        this.stateInstance = this.storeService.getState();
        this.subscribe = this.storeService.listChanged
            .subscribe(function (state) {
            _this.stateInstance = state;
        });
    };
    AppComponent.prototype.onReset = function () {
        this.storeService.initOrResetList();
    };
    AppComponent.prototype.onKeyDown = function (event) {
        if (this.stateInstance.status !== _entities_IStoreService__WEBPACK_IMPORTED_MODULE_4__["GameStatus"].Finished) {
            var directionByKeyEvent = {
                ArrowUp: _entities_IStoreService__WEBPACK_IMPORTED_MODULE_4__["MoveTo"].Top,
                ArrowDown: _entities_IStoreService__WEBPACK_IMPORTED_MODULE_4__["MoveTo"].Bottom,
                ArrowRight: _entities_IStoreService__WEBPACK_IMPORTED_MODULE_4__["MoveTo"].Right,
                ArrowLeft: _entities_IStoreService__WEBPACK_IMPORTED_MODULE_4__["MoveTo"].Left
            };
            if (Object.keys(directionByKeyEvent).includes(event.key)) {
                this.storeService.onMove(directionByKeyEvent[event.key]);
            }
        }
    };
    AppComponent.ctorParameters = function () { return [
        { type: _logic_store_service__WEBPACK_IMPORTED_MODULE_5__["StoreService"] }
    ]; };
    AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-root',
            template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_logic_store_service__WEBPACK_IMPORTED_MODULE_5__["StoreService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" (keydown)=\"onKeyDown($event)\" tabindex=\"1\">\r\n  <header class=\"game-header\">\r\n    <div class=\"info-field\">To play use the arrow keys, game'll indicate where no more moves are possible. In that case\r\n      refresh the page or use the reset button. Have fun!\r\n    </div>\r\n    <div class=\"right-side\">\r\n      <div>\r\n        <span>Score: </span>\r\n        <span>\r\n          {{stateInstance?.sessionScore}}\r\n        </span>\r\n      </div>\r\n      <button\r\n        type=\"button\"\r\n        class=\"button-reset\"\r\n        (click)=\"onReset()\"\r\n      >\r\n        Reset\r\n      </button>\r\n    </div>\r\n  </header>\r\n  <div\r\n    class=\"game-finished-popup\"\r\n    *ngIf=\"stateInstance.status === 2\"\r\n  >\r\n    <div class=\"score-result\">\r\n      <ng-container *ngIf=\"stateInstance?.sessionScore < stateInstance?.bestScore; else elseBlock\">\r\n        <h3>Game over!</h3>\r\n        <div>Current score: {{stateInstance.sessionScore}}</div>\r\n        <div>Best score: {{stateInstance.bestScore}}</div>\r\n      </ng-container>\r\n      <ng-template #elseBlock>\r\n        <h3>New best score!</h3>\r\n        <h1>{{stateInstance.sessionScore}}</h1>\r\n      </ng-template>\r\n      <button\r\n        type=\"button\"\r\n        class=\"button-reset\"\r\n        (click)=\"onReset()\"\r\n      >\r\n        Play again\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div\r\n    class=\"row mt-3\"\r\n    [ngClass]=\"{'game-finished': stateInstance?.status === 2}\"\r\n  >\r\n    <div\r\n      class=\"col-3\"\r\n      [ngStyle]=\"{'background-color': '#' + ((item?.value || 0) + 1001) }\"\r\n      [ngClass]=\"{\r\n      'moved-top': item?.moved &&  item?.direction === 0,\r\n      'moved-right': item?.moved && item?.direction === 1,\r\n      'moved-bottom': item?.moved && item?.direction === 2,\r\n      'moved-left': item?.moved && item?.direction === 3,\r\n      'cell-updated': item?.updated,\r\n      'cell-created': item?.created,\r\n      'cell-destroyed': item?.destroyed\r\n      }\"\r\n      *ngFor=\"let item of stateInstance?.listValues\">\r\n      {{item?.value || ''}}\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _logic_store_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logic/store.service */ "Kk9C");
/* harmony import */ var _shared_math_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/math.service */ "w8QJ");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]
            ],
            providers: [_logic_store_service__WEBPACK_IMPORTED_MODULE_4__["StoreService"], _shared_math_service__WEBPACK_IMPORTED_MODULE_5__["MathService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "crnd":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "crnd";

/***/ }),

/***/ "w8QJ":
/*!****************************************!*\
  !*** ./src/app/shared/math.service.ts ***!
  \****************************************/
/*! exports provided: MathService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathService", function() { return MathService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/IStoreService */ "HVUV");



var MathService = /** @class */ (function () {
    function MathService() {
        this.currentMoveScore = 0;
    }
    MathService.prototype.generateRandomNumbers = function (quantity, array) {
        var filtered = array
            .map(function (el, index) { return el === 0 ? index : -1; })
            .filter(function (el) { return el !== -1; });
        var randomNumbers = [];
        for (var i = 0; i < quantity; i++) {
            var index = filtered[Math.floor(Math.random() * filtered.length)];
            var value = Math.random() > 0.5 ? 4 : 2;
            randomNumbers.push({ index: index, value: value });
        }
        return randomNumbers;
    };
    MathService.prototype.cutVertically = function (array, col) {
        var result = [];
        for (var i = col - 1; i < array.length; i += 4) {
            result.push(array[i]);
        }
        return result;
    };
    MathService.prototype.areArraysTheSame = function (a, b) {
        return a.find(function (elem, index) { return elem !== b[index]; }) === undefined;
    };
    MathService.prototype.sortArray = function (array, direction) {
        var _this = this;
        var _a, _b;
        var listValues = [];
        var usedIndexes = 0;
        var dataCopy = (direction === _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["MoveTo"].Bottom || direction === _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["MoveTo"].Right) ? array.slice().reverse() : array.slice();
        dataCopy.filter(function (elem) { return elem.value > 0; }).forEach(function (elem, index, row) {
            var _a, _b;
            if (usedIndexes <= index) {
                if (elem.value === ((_a = row[index + 1]) === null || _a === void 0 ? void 0 : _a.value)) {
                    listValues.push({
                        updated: true,
                        moved: true,
                        direction: direction,
                        value: elem.value * 2
                    });
                    _this.currentMoveScore += elem.value * 3;
                    usedIndexes = index + 2;
                }
                else {
                    listValues.push({
                        value: elem.value,
                        moved: ((_b = dataCopy[index]) === null || _b === void 0 ? void 0 : _b.value) !== elem.value,
                        direction: direction
                    });
                }
            }
        });
        for (var i = listValues.length; i < 4; i++) {
            listValues.push({
                value: 0,
                destroyed: ((_a = dataCopy[i]) === null || _a === void 0 ? void 0 : _a.value) > 0 && !((_b = listValues[i]) === null || _b === void 0 ? void 0 : _b.value)
            });
        }
        return direction === _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["MoveTo"].Right || direction === _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["MoveTo"].Bottom ? listValues.reverse() : listValues;
    };
    MathService.prototype.isAnyMovePossible = function (array) {
        return array.filter(function (item, index) {
            return ((index !== 3 && index !== 7 && index !== 11 && array[index + 1] === item) ||
                (array[index + 4] === item));
        }).length !== 0;
    };
    MathService.prototype.matrixTranspositionOnFlatArray = function (listValues) {
        var towDimensionalArray = [[], [], [], []];
        listValues.forEach(function (el, idx) {
            if ([0, 4, 8, 12].indexOf(idx) !== -1) {
                towDimensionalArray[0].push(el);
            }
            else if ([1, 5, 9, 13].indexOf(idx) !== -1) {
                towDimensionalArray[1].push(el);
            }
            else if ([2, 6, 10, 14].indexOf(idx) !== -1) {
                towDimensionalArray[2].push(el);
            }
            else if ([3, 7, 11, 15].indexOf(idx) !== -1) {
                towDimensionalArray[3].push(el);
            }
        });
        return towDimensionalArray.reduce(function (result, row) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(result, row)); }, []);
    };
    MathService.prototype.move = function (array, direction) {
        this.currentMoveScore = 0;
        if (direction === _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["MoveTo"].Top || direction === _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["MoveTo"].Bottom) {
            var combinedColumns = this.matrixTranspositionOnFlatArray(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(this.sortArray(this.cutVertically(array, 1), direction), this.sortArray(this.cutVertically(array, 2), direction), this.sortArray(this.cutVertically(array, 3), direction), this.sortArray(this.cutVertically(array, 4), direction)));
            var columnValues = combinedColumns.map(function (cell) { return cell.value; });
            return {
                status: this.areArraysTheSame(columnValues, array.map(function (cell) { return cell.value; })) ? _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["GameStatus"].Stuck : _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["GameStatus"].InProgress,
                listValues: combinedColumns,
                currentMoveScore: this.currentMoveScore
            };
        }
        else {
            var combinedRows = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(this.sortArray(array.slice(0, 4), direction), this.sortArray(array.slice(4, 8), direction), this.sortArray(array.slice(8, 12), direction), this.sortArray(array.slice(12, 16), direction));
            var rowsValues = combinedRows.map(function (row) { return row.value; });
            return {
                status: this.areArraysTheSame(rowsValues, array.map(function (cell) { return cell.value; })) ? _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["GameStatus"].Stuck : _entities_IStoreService__WEBPACK_IMPORTED_MODULE_2__["GameStatus"].InProgress,
                listValues: combinedRows,
                currentMoveScore: this.currentMoveScore
            };
        }
    };
    MathService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], MathService);
    return MathService;
}());



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@-webkit-keyframes onElementRender {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes onElementRender {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes onCellUpdate {\n  from {\n    opacity: 0.5;\n    transform: scale(1);\n  }\n  to {\n    transform: scale(1.5);\n    opacity: 0;\n  }\n}\n@keyframes onCellUpdate {\n  from {\n    opacity: 0.5;\n    transform: scale(1);\n  }\n  to {\n    transform: scale(1.5);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes onCellMoveTop {\n  from {\n    transform: translateY(60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes onCellMoveTop {\n  from {\n    transform: translateY(60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes onCellMoveRight {\n  from {\n    transform: translateX(-60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes onCellMoveRight {\n  from {\n    transform: translateX(-60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes onCellMoveBottom {\n  from {\n    transform: translateY(-60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes onCellMoveBottom {\n  from {\n    transform: translateY(-60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes onCellMoveLeft {\n  from {\n    transform: translateX(60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes onCellMoveLeft {\n  from {\n    transform: translateX(60px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes onGameFinished {\n  from {\n    transform: rotate(0deg) scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(720deg) scale(0);\n    opacity: 0;\n  }\n}\n@keyframes onGameFinished {\n  from {\n    transform: rotate(0deg) scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(720deg) scale(0);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes onCellCreation {\n  0% {\n    transform: rotate(0deg);\n  }\n  33% {\n    transform: rotate(15deg);\n  }\n  66% {\n    transform: rotate(-15deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes onCellCreation {\n  0% {\n    transform: rotate(0deg);\n  }\n  33% {\n    transform: rotate(15deg);\n  }\n  66% {\n    transform: rotate(-15deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes onCellReplace {\n  from {\n    transform: scaleY(1);\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    transform: scaleY(0);\n  }\n}\n@keyframes onCellReplace {\n  from {\n    transform: scaleY(1);\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    transform: scaleY(0);\n  }\n}\n@-webkit-keyframes onCellDestroy {\n  0% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes onCellDestroy {\n  0% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.container {\n  font-family: \"Roboto\", sans-serif;\n  padding-top: 5rem;\n  margin: auto;\n  width: 48vh;\n}\n.game-header {\n  display: flex;\n}\n.info-field {\n  font-size: 14px;\n  padding-right: 1rem;\n  opacity: 0.5;\n}\n.row {\n  margin-bottom: 30px;\n}\n.col-3 {\n  color: aliceblue;\n  font-weight: bolder;\n  border: 5px solid white;\n  border-radius: 14px;\n  box-sizing: border-box;\n  vertical-align: middle;\n  text-align: center;\n  line-height: 10.5vh;\n  height: 12vh;\n  font-size: 24px;\n  padding: 0;\n  margin: 0;\n}\n.button-reset {\n  max-height: 4rem;\n  align-self: flex-end;\n  font-family: inherit;\n  border: 3px solid gray;\n  border-radius: 0.5rem;\n  color: gray;\n  background-color: #1001;\n  padding: 0.4rem 2rem 0.4rem 2rem;\n  font-size: 20px;\n  font-weight: 500;\n  box-shadow: 1px 1px 7px lightgray;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.button-reset:hover {\n  color: white;\n  background-color: gray;\n}\n.right-side {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n}\n.score-result {\n  -webkit-animation: onElementRender 0.5s ease-out 3s backwards;\n          animation: onElementRender 0.5s ease-out 3s backwards;\n  position: absolute;\n  border-radius: 4px;\n  width: 30%;\n  height: 30%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -80%);\n  background: #fff;\n  z-index: 1;\n}\n.score-result div {\n  margin: 0.5rem auto;\n}\n.score-result h1, .score-result h3 {\n  text-align: center;\n}\n.score-result h3 {\n  margin: 2rem 0;\n}\n.score-result .button-reset {\n  margin: auto auto 2rem auto;\n}\n.game-finished-popup {\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.7);\n  -webkit-animation: onElementRender 0.5s ease-out 3s backwards;\n          animation: onElementRender 0.5s ease-out 3s backwards;\n}\n.cell-updated {\n  position: relative;\n}\n.cell-updated::after {\n  position: absolute;\n  border: 5px solid white;\n  border-radius: 14px;\n  content: \"\";\n  height: 12vh;\n  width: 12vh;\n  background: #ccc;\n  opacity: 0;\n  left: -5px;\n  z-index: -1;\n  -webkit-animation: onCellUpdate 0.4s ease-in 0.3s;\n          animation: onCellUpdate 0.4s ease-in 0.3s;\n  top: 0;\n}\n.score-changed {\n  -webkit-animation: onScoreUpdate 0.2s ease-out;\n          animation: onScoreUpdate 0.2s ease-out;\n}\n.score-result {\n  display: flex;\n  flex-direction: column;\n}\n.game-finished {\n  -webkit-animation: onGameFinished 4s ease;\n          animation: onGameFinished 4s ease;\n  opacity: 0;\n}\n.moved-top {\n  -webkit-animation: onCellMoveTop 0.3s ease-in;\n          animation: onCellMoveTop 0.3s ease-in;\n  position: relative;\n}\n.moved-top::after {\n  top: -12vh;\n  left: -5px;\n}\n.moved-right {\n  -webkit-animation: onCellMoveRight 0.3s ease-in;\n          animation: onCellMoveRight 0.3s ease-in;\n  position: relative;\n}\n.moved-right::after {\n  top: -12vh;\n  left: -5px;\n}\n.moved-bottom {\n  -webkit-animation: onCellMoveBottom 0.3s ease-in;\n          animation: onCellMoveBottom 0.3s ease-in;\n  position: relative;\n}\n.moved-bottom::after {\n  top: 12vh;\n  left: -5px;\n}\n.moved-left {\n  -webkit-animation: onCellMoveLeft 0.3s ease-in;\n          animation: onCellMoveLeft 0.3s ease-in;\n  position: relative;\n}\n.moved-left::after {\n  top: -12vh;\n  left: -5px;\n}\n.moved-top::after, moved-right::after, moved-bottom::after, moved-left::after, cell-updated::after {\n  position: absolute;\n  color: aliceblue;\n  border: 5px solid white;\n  border-radius: 14px;\n  content: \"\";\n  height: 12vh;\n  width: 12vh;\n  background: black;\n  opacity: 0;\n  -webkit-animation: onCellReplace 0.2s ease-out;\n          animation: onCellReplace 0.2s ease-out;\n}\n.cell-updated::after {\n  top: 0;\n}\n.cell-destroyed {\n  opacity: 1;\n  -webkit-animation: onCellDestroy 0.3s ease-out;\n          animation: onCellDestroy 0.3s ease-out;\n  transition: opacity 0.3s ease-out;\n}\n.cell-created {\n  -webkit-animation: onCellCreation 0.8s ease-out;\n          animation: onCellCreation 0.8s ease-out;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0U7SUFDRSxVQUFBO0VBQUY7RUFFQTtJQUNFLFVBQUE7RUFBRjtBQUNGO0FBTkE7RUFDRTtJQUNFLFVBQUE7RUFBRjtFQUVBO0lBQ0UsVUFBQTtFQUFGO0FBQ0Y7QUFHQTtFQUNFO0lBQ0UsWUFBQTtJQUNBLG1CQUFBO0VBREY7RUFHQTtJQUNFLHFCQUFBO0lBQ0EsVUFBQTtFQURGO0FBQ0Y7QUFQQTtFQUNFO0lBQ0UsWUFBQTtJQUNBLG1CQUFBO0VBREY7RUFHQTtJQUNFLHFCQUFBO0lBQ0EsVUFBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VBRkY7RUFJQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUZGO0FBQ0Y7QUFOQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VBRkY7RUFJQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUZGO0FBQ0Y7QUFLQTtFQUNFO0lBQ0UsNEJBQUE7SUFDQSxVQUFBO0VBSEY7RUFLQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUhGO0FBQ0Y7QUFMQTtFQUNFO0lBQ0UsNEJBQUE7SUFDQSxVQUFBO0VBSEY7RUFLQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUhGO0FBQ0Y7QUFNQTtFQUNFO0lBQ0UsNEJBQUE7SUFDQSxVQUFBO0VBSkY7RUFNQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUpGO0FBQ0Y7QUFKQTtFQUNFO0lBQ0UsNEJBQUE7SUFDQSxVQUFBO0VBSkY7RUFNQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUpGO0FBQ0Y7QUFPQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VBTEY7RUFPQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUxGO0FBQ0Y7QUFIQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VBTEY7RUFPQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQUxGO0FBQ0Y7QUFR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Q0UsVUFBQTtFQUNBLFVBQUE7QUFWSjtBQWNBO0VBQ0UsK0NBQUE7VUFBQSx1Q0FBQTtFQUNBLGtCQUFBO0FBWEY7QUFZRTtFQUNFLFVBQUE7RUFDQSxVQUFBO0FBVko7QUFjQTtFQUNFLGdEQUFBO1VBQUEsd0NBQUE7RUFDQSxrQkFBQTtBQVhGO0FBWUU7RUFDRSxTQUFBO0VBQ0EsVUFBQTtBQVZKO0FBY0E7RUFDRSw4Q0FBQTtVQUFBLHNDQUFBO0VBQ0Esa0JBQUE7QUFYRjtBQVlFO0VBQ0UsVUFBQTtFQUNBLFVBQUE7QUFWSjtBQWNBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7RUFDQSw4Q0FBQTtVQUFBLHNDQUFBO0FBWEY7QUFjQTtFQUNFLE1BQUE7QUFYRjtBQWNBO0VBQ0UsVUFBQTtFQUNBLDhDQUFBO1VBQUEsc0NBQUE7RUFDQSxpQ0FBQTtBQVhGO0FBY0E7RUFDRSwrQ0FBQTtVQUFBLHVDQUFBO0FBWEYiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuQGtleWZyYW1lcyBvbkVsZW1lbnRSZW5kZXIge1xyXG4gIGZyb20ge1xyXG4gICAgb3BhY2l0eTogMDtcclxuICB9XHJcbiAgdG8ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgb25DZWxsVXBkYXRlIHtcclxuICBmcm9tIHtcclxuICAgIG9wYWNpdHk6IC41O1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICB9XHJcbiAgdG8ge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgb25DZWxsTW92ZVRvcCB7XHJcbiAgZnJvbSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNjBweCk7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBvbkNlbGxNb3ZlUmlnaHQge1xyXG4gIGZyb20ge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC02MHB4KTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgfVxyXG4gIHRvIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9uQ2VsbE1vdmVCb3R0b20ge1xyXG4gIGZyb20ge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MHB4KTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgfVxyXG4gIHRvIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9uQ2VsbE1vdmVMZWZ0IHtcclxuICBmcm9tIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgfVxyXG4gIHRvIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9uR2FtZUZpbmlzaGVkIHtcclxuICBmcm9tIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpIHNjYWxlKDEpO1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcbiAgdG8ge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNzIwZGVnKSBzY2FsZSgwKTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9uQ2VsbENyZWF0aW9uIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICB9XHJcbiAgMzMlIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE1ZGVnKTtcclxuICB9XHJcbiAgNjYlIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xNWRlZyk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9uQ2VsbFJlcGxhY2Uge1xyXG4gIGZyb20ge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMSk7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMCk7XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9uQ2VsbERlc3Ryb3kge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxuICA1MCUge1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLmNvbnRhaW5lciB7XHJcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCIsIHNhbnMtc2VyaWY7XHJcbiAgcGFkZGluZy10b3A6IDVyZW07XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHdpZHRoOiA0OHZoO1xyXG59XHJcblxyXG4uZ2FtZS1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuXHJcbi5pbmZvLWZpZWxkIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcclxuICBvcGFjaXR5OiAuNTtcclxufVxyXG5cclxuLnJvdyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLmNvbC0zIHtcclxuICBjb2xvcjogYWxpY2VibHVlO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgYm9yZGVyOiA1cHggc29saWQgd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGxpbmUtaGVpZ2h0OiAxMC41dmg7XHJcbiAgaGVpZ2h0OiAxMnZoO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLmJ1dHRvbi1yZXNldCB7XHJcbiAgbWF4LWhlaWdodDogNHJlbTtcclxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICBmb250LWZhbWlseTogaW5oZXJpdDtcclxuICBib3JkZXI6IDNweCBzb2xpZCBncmF5O1xyXG4gIGJvcmRlci1yYWRpdXM6IC41cmVtO1xyXG4gIGNvbG9yOiBncmF5O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMDAxO1xyXG4gIHBhZGRpbmc6IC40cmVtIDJyZW0gLjRyZW0gMnJlbTtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBib3gtc2hhZG93OiAxcHggMXB4IDdweCBsaWdodGdyYXk7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuMnMgZWFzZSwgY29sb3IgLjJzIGVhc2U7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xyXG4gIH1cclxufVxyXG5cclxuLnJpZ2h0LXNpZGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnNjb3JlLXJlc3VsdCB7XHJcbiAgYW5pbWF0aW9uOiBvbkVsZW1lbnRSZW5kZXIgLjVzIGVhc2Utb3V0IDNzIGJhY2t3YXJkcztcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIHdpZHRoOiAzMCU7XHJcbiAgaGVpZ2h0OiAzMCU7XHJcbiAgdG9wOiA1MCU7XHJcbiAgbGVmdDogNTAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC04MCUpO1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgei1pbmRleDogMTtcclxuICBkaXYge1xyXG4gICAgbWFyZ2luOiAuNXJlbSBhdXRvO1xyXG4gIH1cclxuICBoMSwgaDMge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuICBoMyB7XHJcbiAgICBtYXJnaW46IDJyZW0gMDtcclxuICB9XHJcbiAgLmJ1dHRvbi1yZXNldCB7XHJcbiAgICBtYXJnaW46IGF1dG8gYXV0byAycmVtIGF1dG9cclxuICB9XHJcbn1cclxuXHJcbi5nYW1lLWZpbmlzaGVkLXBvcHVwIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgd2lkdGg6IDEwMHZ3O1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuNyk7XHJcbiAgYW5pbWF0aW9uOiBvbkVsZW1lbnRSZW5kZXIgLjVzIGVhc2Utb3V0IDNzIGJhY2t3YXJkcztcclxufVxyXG5cclxuLmNlbGwtdXBkYXRlZCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICY6OmFmdGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvcmRlcjogNXB4IHNvbGlkIHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTRweDtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICBoZWlnaHQ6IDEydmg7XHJcbiAgICB3aWR0aDogMTJ2aDtcclxuICAgIGJhY2tncm91bmQ6ICNjY2M7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgbGVmdDogLTVweDtcclxuICAgIHotaW5kZXg6IC0xO1xyXG4gICAgYW5pbWF0aW9uOiBvbkNlbGxVcGRhdGUgLjRzIGVhc2UtaW4gLjNzO1xyXG4gICAgdG9wOiAwO1xyXG4gIH1cclxufVxyXG5cclxuLnNjb3JlLWNoYW5nZWQge1xyXG4gIGFuaW1hdGlvbjogb25TY29yZVVwZGF0ZSAuMnMgZWFzZS1vdXQ7XHJcbn1cclxuXHJcbi5zY29yZS1yZXN1bHQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLmdhbWUtZmluaXNoZWQge1xyXG4gIGFuaW1hdGlvbjogb25HYW1lRmluaXNoZWQgNHMgZWFzZTtcclxuICBvcGFjaXR5OiAwO1xyXG59XHJcblxyXG4ubW92ZWQtdG9wIHtcclxuICBhbmltYXRpb246IG9uQ2VsbE1vdmVUb3AgLjNzIGVhc2UtaW47XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICY6OmFmdGVyIHtcclxuICAgIHRvcDogLTEydmg7XHJcbiAgICBsZWZ0OiAtNXB4O1xyXG4gIH1cclxufVxyXG5cclxuLm1vdmVkLXJpZ2h0IHtcclxuICBhbmltYXRpb246IG9uQ2VsbE1vdmVSaWdodCAuM3MgZWFzZS1pbjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgJjo6YWZ0ZXIge1xyXG4gICAgdG9wOiAtMTJ2aDtcclxuICAgIGxlZnQ6IC01cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubW92ZWQtYm90dG9tIHtcclxuICBhbmltYXRpb246IG9uQ2VsbE1vdmVCb3R0b20gLjNzIGVhc2UtaW47XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICY6OmFmdGVyIHtcclxuICAgIHRvcDogMTJ2aDtcclxuICAgIGxlZnQ6IC01cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubW92ZWQtbGVmdCB7XHJcbiAgYW5pbWF0aW9uOiBvbkNlbGxNb3ZlTGVmdCAuM3MgZWFzZS1pbjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgJjo6YWZ0ZXIge1xyXG4gICAgdG9wOiAtMTJ2aDtcclxuICAgIGxlZnQ6IC01cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubW92ZWQtdG9wOjphZnRlciwgbW92ZWQtcmlnaHQ6OmFmdGVyLCBtb3ZlZC1ib3R0b206OmFmdGVyLCBtb3ZlZC1sZWZ0OjphZnRlciwgY2VsbC11cGRhdGVkOjphZnRlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGNvbG9yOiBhbGljZWJsdWU7XHJcbiAgYm9yZGVyOiA1cHggc29saWQgd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcclxuICBjb250ZW50OiBcIlwiO1xyXG4gIGhlaWdodDogMTJ2aDtcclxuICB3aWR0aDogMTJ2aDtcclxuICBiYWNrZ3JvdW5kOiBibGFjaztcclxuICBvcGFjaXR5OiAwO1xyXG4gIGFuaW1hdGlvbjogb25DZWxsUmVwbGFjZSAuMnMgZWFzZS1vdXQ7XHJcbn1cclxuXHJcbi5jZWxsLXVwZGF0ZWQ6OmFmdGVyIHtcclxuICB0b3A6IDA7XHJcbn1cclxuXHJcbi5jZWxsLWRlc3Ryb3llZCB7XHJcbiAgb3BhY2l0eTogMTtcclxuICBhbmltYXRpb246IG9uQ2VsbERlc3Ryb3kgLjNzIGVhc2Utb3V0O1xyXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjNzIGVhc2Utb3V0O1xyXG59XHJcblxyXG4uY2VsbC1jcmVhdGVkIHtcclxuICBhbmltYXRpb246IG9uQ2VsbENyZWF0aW9uIC44cyBlYXNlLW91dDtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map