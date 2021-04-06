/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d3adee90eb0ab0ef3459";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/raw-loader/dist/cjs.js!./pug/includes/head.pug":
/*!**********************************************************************!*\
  !*** ../node_modules/raw-loader/dist/cjs.js!./pug/includes/head.pug ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("var pug = require(\"!../../../node_modules/pug-runtime/index.js\");\n\nfunction template(locals) {var pug_html = \"\", pug_mixins = {}, pug_interp;var pug_indent = [];\npug_html = pug_html + \"\\n\\u003Chead\\u003E\\n  \\u003Cmeta charset=\\\"UTF-8\\\"\\u003E\\n  \\u003Cmeta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1, maximum-scale=1\\\"\\u003E\\n  \\u003Cmeta name=\\\"description\\\" content=\\\"\\\"\\u003E\\n  \\u003Cmeta name=\\\"keywords\\\" content=\\\"\\\"\\u003E\\u003Cmeta name=\\\"apple-mobile-web-app-capable\\\" content=\\\"yes\\\"\\u002F\\u003E\\n\\u003Cmeta name=\\\"apple-mobile-web-app-status-bar-style\\\" content=\\\"black-translucent\\\"\\u002F\\u003E\\n\\u003Clink rel=\\\"apple-touch-icon\\\" sizes=\\\"180x180\\\" href=\\\".\\u002Fapple-touch-icon.png\\\"\\u003E\\n\\u003Clink rel=\\\"icon\\\" type=\\\"image\\u002Fpng\\\" sizes=\\\"32x32\\\" href=\\\".\\u002Ffavicon-32x32.png\\\"\\u003E\\n\\u003Clink rel=\\\"icon\\\" type=\\\"image\\u002Fpng\\\" sizes=\\\"16x16\\\" href=\\\".\\u002Ffavicon-16x16.png\\\"\\u003E\\n\\u003Clink rel=\\\"manifest\\\" href=\\\".\\u002Fsite.webmanifest\\\"\\u003E\\n\\u003Clink rel=\\\"mask-icon\\\" href=\\\".\\u002Fsafari-pinned-tab.svg\\\" color=\\\"#5bbad5\\\"\\u003E\\n\\u003Cmeta name=\\\"msapplication-TileColor\\\" content=\\\"#da532c\\\"\\u003E\\n\\u003Cmeta name=\\\"theme-color\\\" content=\\\"#ffffff\\\"\\u003E\\n  \\u003C!-- fontawesome--\\u003E\\n  \\u003Clink rel=\\\"stylesheet\\\" href=\\\"https:\\u002F\\u002Fstackpath.bootstrapcdn.com\\u002Ffont-awesome\\u002F4.7.0\\u002Fcss\\u002Ffont-awesome.min.css\\\"\\u003E\\n  \\u003Ctitle\\u003E2048\\u003C\\u002Ftitle\\u003E\\n\\u003C\\u002Fhead\\u003E\";;return pug_html;};\nmodule.exports = template;");

/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./pug/index.pug":
/*!**************************************************************!*\
  !*** ../node_modules/raw-loader/dist/cjs.js!./pug/index.pug ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("var pug = require(\"!../../node_modules/pug-runtime/index.js\");\n\nfunction template(locals) {var pug_html = \"\", pug_mixins = {}, pug_interp;var pug_indent = [];\npug_html = pug_html + \"\\u003C!DOCTYPE html\\u003E\\n\\u003Chtml lang=\\\"en\\\"\\u003E\" + (null == (pug_interp = require(\"./includes/head.pug\").call(this, locals)) ? \"\" : pug_interp) + \"\\n  \\u003Cbody\\u003E\\n    \\u003Caudio id=\\\"move\\\" src=\\\".\\u002Fassets\\u002Faudio\\u002Fmove.mp3\\\"\\u003E\\u003C\\u002Faudio\\u003E\\n    \\u003Caudio id=\\\"merge\\\" src=\\\".\\u002Fassets\\u002Faudio\\u002Fmerge.mp3\\\"\\u003E\\u003C\\u002Faudio\\u003E\\n    \\u003Cdiv class=\\\"wrapper\\\"\\u003E\\n      \\u003Cdiv class=\\\"IE hide\\\"\\u003E \\u003Cspan\\u003Eyour browser not support\\u003C\\u002Fspan\\u003E\\u003C\\u002Fdiv\\u003E\\n      \\u003Cdiv class=\\\"settings-icon\\\"\\u003E\\u003Ci class=\\\"fa fa-question-circle\\\"\\u003E\\u003C\\u002Fi\\u003E\\u003C\\u002Fdiv\\u003E\\n      \\u003Cdiv class=\\\"settings-content hide\\\"\\u003E\\n        \\u003Cdiv class=\\\"how-play\\\"\\u003E\\u003Cspan\\u003Ehow to play?\\u003C\\u002Fspan\\u003E\\n          \\u003Cp\\u003EMove tiles by pressing the arrows on your keyboard or by swiping. Tiles will merge if they have the same numbers. Try to get 2048 tile.\\u003C\\u002Fp\\u003E\\n        \\u003C\\u002Fdiv\\u003E\\n        \\u003Cdiv class=\\\"mail\\\"\\u003E\\u003Ca href=\\\"https:\\u002F\\u002Fwww.facebook.com\\u002Ferlan.zharkeev\\\" target=\\\"_blank\\\"\\u003E\\u003Cspan\\u003Esend feedback\\u003C\\u002Fspan\\u003E\\u003C\\u002Fa\\u003E\\u003C\\u002Fdiv\\u003E\\n      \\u003C\\u002Fdiv\\u003E\\n      \\u003Cdiv class=\\\"message lose hide\\\"\\u003E\\n        \\u003Cp\\u003Eyou lose(\\u003C\\u002Fp\\u003E\\u003Cspan\\u003Enext time you will definitely win!\\u003C\\u002Fspan\\u003E\\n        \\u003Cbutton class=\\\"new-game\\\" id=\\\"new-game\\\"\\u003Eok\\u003C\\u002Fbutton\\u003E\\n      \\u003C\\u002Fdiv\\u003E\\n      \\u003Cdiv class=\\\"message win hide\\\"\\u003E\\n        \\u003Cp\\u003ECongratulations!\\u003C\\u002Fp\\u003E\\u003Cspan\\u003Eyou win!\\u003C\\u002Fspan\\u003E\\u003Cspan\\u003Ekeep going to reach 4096 tile!\\u003C\\u002Fspan\\u003E\\n        \\u003Cbutton id=\\\"continue\\\"\\u003Econtinue\\u003C\\u002Fbutton\\u003E\\n      \\u003C\\u002Fdiv\\u003E\\n      \\u003Cdiv class=\\\"game\\\"\\u003E\\n        \\u003Cdiv class=\\\"info\\\"\\u003E \\n          \\u003Cdiv class=\\\"title\\\"\\u003E \\n            \\u003Ch1\\u003E2048 \\u003C\\u002Fh1\\u003E\\n          \\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"sound\\\"\\u003E \\n            \\u003Cdiv class=\\\"bg-no_sound\\\"\\u003E \\u003C\\u002Fdiv\\u003E\\n          \\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"score\\\"\\u003E \\n            \\u003Cp\\u003Escore \\u003C\\u002Fp\\u003E\\u003Cspan\\u003E0\\u003C\\u002Fspan\\u003E\\n          \\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"new-game-btn\\\"\\u003E \\u003Cspan\\u003Enew game\\t\\u003C\\u002Fspan\\u003E\\u003C\\u002Fdiv\\u003E\\n        \\u003C\\u002Fdiv\\u003E\\n        \\u003Cdiv class=\\\"table\\\"\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"1-1\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"1-2\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"1-3\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"1-4\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"2-1\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"2-2\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"2-3\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"2-4\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"3-1\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"3-2\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"3-3\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"3-4\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"4-1\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"4-2\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"4-3\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n          \\u003Cdiv class=\\\"table__cell\\\" id=\\\"4-4\\\"\\u003E\\u003C\\u002Fdiv\\u003E\\n        \\u003C\\u002Fdiv\\u003E\\n      \\u003C\\u002Fdiv\\u003E\\n    \\u003C\\u002Fdiv\\u003E\\n  \\u003C\\u002Fbody\\u003E\\n\\u003C\\u002Fhtml\\u003E\";;return pug_html;};\nmodule.exports = template;");

/***/ }),

/***/ "./assets/sass/style.sass":
/*!********************************!*\
  !*** ./assets/sass/style.sass ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var raw_loader_pug_index_pug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./pug/index.pug */ "../node_modules/raw-loader/dist/cjs.js!./pug/index.pug");
/* harmony import */ var raw_loader_pug_includes_head_pug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pug/includes/head.pug */ "../node_modules/raw-loader/dist/cjs.js!./pug/includes/head.pug");
/* harmony import */ var _assets_sass_style_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/sass/style.sass */ "./assets/sass/style.sass");
/* harmony import */ var _assets_sass_style_sass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_sass_style_sass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_table_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/table.js */ "./js/table.js");
/* harmony import */ var _js_gameControls_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/gameControls.js */ "./js/gameControls.js");
/* harmony import */ var _js_localStorageSaver_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/localStorageSaver.js */ "./js/localStorageSaver.js");




 //import './js/hammer.js';





/***/ }),

/***/ "./js/gameControls.js":
/*!****************************!*\
  !*** ./js/gameControls.js ***!
  \****************************/
/*! exports provided: settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ "./js/table.js");
/* harmony import */ var _localStorageSaver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorageSaver */ "./js/localStorageSaver.js");
//game controls


var settings = document.querySelector('.settings-icon');
var settingsContent = document.querySelector('.settings-content');
settings.addEventListener('click', function () {
  settingsContent.classList.toggle('hide');
});
var newGameBtn = document.querySelector('.new-game-btn');
var newGameBtnInner = document.getElementById('new-game');
var continueBtn = document.getElementById('continue');
newGameBtn.addEventListener('click', newGame);
newGameBtnInner.addEventListener('click', newGame);
continueBtn.addEventListener('click', continueGame);

function newGame() {
  var squares = document.querySelectorAll('.square');
  squares.forEach(function (sq) {
    sq.remove();
  });
  status = false;
  var score = document.querySelector('.score').querySelector('span');
  score.textContent = 0;
  var loseMess = document.querySelector('.lose');
  loseMess.classList.add('hide');
  Object(_table__WEBPACK_IMPORTED_MODULE_0__["initGame"])();
  var lcStorage = new _localStorageSaver__WEBPACK_IMPORTED_MODULE_1__["Storage"]();
  lcStorage.write();
}

function continueGame() {
  var winMess = document.querySelector('.win');
  winMess.classList.add('hide');
  var lcStorage = new _localStorageSaver__WEBPACK_IMPORTED_MODULE_1__["Storage"]();
  lcStorage.write();
}

/***/ }),

/***/ "./js/initMove.js":
/*!************************!*\
  !*** ./js/initMove.js ***!
  \************************/
/*! exports provided: randomizer, getRandNum, createSquare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Hammer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomizer", function() { return randomizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandNum", function() { return getRandNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSquare", function() { return createSquare; });
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ "./js/table.js");
//init move

function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandNum() {
  var randInd = randomizer(0, 2);
  var num;
  if (randInd == 0) num = 2;else num = 4;
  return num;
}
document.addEventListener('keyup', createSquare);
var game = document.querySelector('.table');
var hammertime = new Hammer(game);
hammertime.get('swipe').set({
  direction: Hammer.DIRECTION_ALL,
  pointers: 1
});
hammertime.on("swipe", function (event) {
  var dirNum = event.direction;

  switch (dirNum) {
    case 8:
      Object(_table__WEBPACK_IMPORTED_MODULE_0__["startMove"])('ArrowUp');
      break;

    case 16:
      Object(_table__WEBPACK_IMPORTED_MODULE_0__["startMove"])('ArrowDown');
      break;

    case 2:
      Object(_table__WEBPACK_IMPORTED_MODULE_0__["startMove"])('ArrowLeft');
      break;

    case 4:
      Object(_table__WEBPACK_IMPORTED_MODULE_0__["startMove"])('ArrowRight');
      break;
  }
});
function createSquare(e) {
  var posKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  posKey.forEach(function (key) {
    if (e.key == key) Object(_table__WEBPACK_IMPORTED_MODULE_0__["startMove"])(key);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! hammerjs/hammer */ "../node_modules/hammerjs/hammer.js")))

/***/ }),

/***/ "./js/localStorageSaver.js":
/*!*********************************!*\
  !*** ./js/localStorageSaver.js ***!
  \*********************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
/* harmony import */ var _table_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table.js */ "./js/table.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, [{
    key: "_getData",
    value: function _getData() {
      var _this = this;

      this._data = [];
      this._score = document.querySelector('.score').querySelector('span').textContent;
      this._squares = document.querySelectorAll('.square');

      this._data.push(this._score);

      this._squares.forEach(function (sq) {
        var subArr = [];
        subArr.push(sq.textContent, sq.id);

        _this._data.push(subArr);
      });

      return this._data;
    }
  }, {
    key: "write",
    value: function write() {
      var data = this._getData();

      var string = this._stringify(data);

      localStorage.setItem('2048', string);
    }
  }, {
    key: "_stringify",
    value: function _stringify(data) {
      return JSON.stringify(data);
    }
  }, {
    key: "_parse",
    value: function _parse(data) {
      return JSON.parse(data);
    }
  }, {
    key: "read",
    value: function read() {
      var data = localStorage.getItem('2048');

      var arr = this._parse(data);

      this._updateData(arr);
    }
  }, {
    key: "_updateData",
    value: function _updateData(arr) {
      this._score = document.querySelector('.score').querySelector('span').textContent = arr.shift();
      arr.forEach(function (sq) {
        new _table_js__WEBPACK_IMPORTED_MODULE_0__["Square"](sq[0], undefined, sq[1]);
      });
    }
  }]);

  return Storage;
}();

window.onload = function () {
  var lcStorage = new Storage();
  if (localStorage[2048] != undefined) lcStorage.read();
};

/***/ }),

/***/ "./js/sound.js":
/*!*********************!*\
  !*** ./js/sound.js ***!
  \*********************/
/*! exports provided: soundActive, moveSound, mergeSound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "soundActive", function() { return soundActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveSound", function() { return moveSound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeSound", function() { return mergeSound; });
//sound 
var soundActive = false;
var icon = document.querySelector('.sound').children[0];
icon.addEventListener('click', onSound);
var moveSound = document.getElementById('move');
var mergeSound = document.getElementById('merge');

function onSound() {
  soundActive = true;
  icon.classList.remove('bg-no_sound');
  icon.classList.add('bg-sound');
  icon.removeEventListener('click', onSound);
  icon.addEventListener('click', offSound);
}

function offSound() {
  soundActive = false;
  icon.classList.remove('bg-sound');
  icon.classList.add('bg-no_sound');
  icon.removeEventListener('click', offSound);
  icon.addEventListener('click', onSound);
}

/***/ }),

/***/ "./js/table.js":
/*!*********************!*\
  !*** ./js/table.js ***!
  \*********************/
/*! exports provided: Square, initGame, startMove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Square", function() { return Square; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initGame", function() { return initGame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startMove", function() { return startMove; });
/* harmony import */ var _initMove__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initMove */ "./js/initMove.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound */ "./js/sound.js");
/* harmony import */ var _localStorageSaver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorageSaver */ "./js/localStorageSaver.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function isInternetExplorer() {
  return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}

if (isInternetExplorer()) {
  var ie = document.querySelector('.IE');
  ie.classList.remove('hide');
}




var tranDuration = 100;
var status = false;
var body = document.querySelector('body');
var Square = /*#__PURE__*/function () {
  function Square(num, dir, id) {
    var _this = this;

    _classCallCheck(this, Square);

    this._num = num;
    this._dir = dir;
    this._squaresArr;
    this._table = document.querySelector('.table');
    this._square = this._create();
    this._squares = document.querySelectorAll('.square');

    this._clearMerged();

    this._colorChange(this._num, this._square);

    if (this._dir != undefined) {
      if (_sound__WEBPACK_IMPORTED_MODULE_1__["soundActive"]) _sound__WEBPACK_IMPORTED_MODULE_1__["moveSound"].play();
      this._squaresArr = this._getSquareArr();

      this._clearNewClass(this._squaresArr);

      if (this._findFreePos() == undefined) this._checkForLose();

      this._prepForMove().then(function () {
        if (status == true) {
          _this._append();

          status = false;
        }
      });
    } else this._append(id);

    this._saveLocal();
  }

  _createClass(Square, [{
    key: "_saveLocal",
    value: function _saveLocal() {
      new _localStorageSaver__WEBPACK_IMPORTED_MODULE_2__["Storage"]().write();
    }
  }, {
    key: "_checkForLose",
    value: function _checkForLose() {
      var _this2 = this;

      var hasStep = false;
      this._squaresArr = this._getSquareArr();

      this._squaresArr.forEach(function (sq) {
        var cells = _this2._getAllPosCoords(sq.id);

        cells.forEach(function (cell) {
          var innerSquare = cell.querySelector('.square');

          if (innerSquare == null) {
            hasStep = true;
            return;
          }

          if (innerSquare.textContent == sq.textContent && cells.length > 2) {
            hasStep = true;
            return;
          }
        });
      });

      if (hasStep == false) this._showMessage('game over');
    }
  }, {
    key: "_showMessage",
    value: function _showMessage(mes) {
      console.log('game over');
      var message;
      if (mes == 'game over') message = document.querySelector('.lose');else if (mes == 'win') message = document.querySelector('.win');
      message.classList.remove('hide');
    }
  }, {
    key: "_getAllPosCoords",
    value: function _getAllPosCoords(coords) {
      var _this3 = this;

      var arr = [];
      var cells = [];
      var posY = Number(coords[0]);
      var posX = Number(coords[2]);
      if (posY != 4) arr.push("".concat(posY + 1, "-").concat(posX));
      if (posY != 0) arr.push("".concat(posY - 1, "-").concat(posX));
      if (posX != 4) arr.push("".concat(posY, "-").concat(posX + 1));
      if (posX != 0) arr.push("".concat(posY, "-").concat(posX - 1));
      arr.forEach(function (coord) {
        var cell = _this3._table.querySelector(".table__cell[id=\"".concat(coord, "\"]"));

        if (cell != null) cells.push(cell);
      });
      return cells;
    }
  }, {
    key: "_clearNewClass",
    value: function _clearNewClass(arr) {
      arr.forEach(function (sq) {
        sq.classList.remove('new');
      });
    }
  }, {
    key: "_prepForMove",
    value: function _prepForMove() {
      for (var i = 0; i <= this._squaresArr.length - 1; i++) {
        var squares = this._getSquareArr();

        var square = squares[i];
        var startCoords = square.id.split('-');

        this._getNextCell(this._dir, startCoords, square);

        if (i == this._squaresArr.length - 1) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve(status);
            }, tranDuration * 2);
          });
        }
      }
    }
  }, {
    key: "_clearMerged",
    value: function _clearMerged() {
      this._squares.forEach(function (square) {
        square.classList.remove('merged');
      });
    }
  }, {
    key: "_checkForMerge",
    value: function _checkForMerge(cell, square) {
      var contSquare = cell.querySelector('.square');
      if (contSquare != null && contSquare.textContent === square.textContent) return true;else return false;
    }
  }, {
    key: "_moveTo",
    value: function _moveTo(cell, square, innerSquare, direct) {
      if (cell.id != square.id) {
        status = true;

        var clone = this._createClone(square);

        var startPosClone = this._getStartClonePos(square);

        this._addClone(clone, startPosClone);

        this._addOriginal(cell, square);

        this._moveClone(cell, clone, startPosClone, direct);

        setTimeout(function () {
          clone.remove();
        }, tranDuration);
        if (innerSquare != false) this._merge(square, innerSquare);
      }
    }
  }, {
    key: "_createClone",
    value: function _createClone(square) {
      var clone = square.cloneNode(true);
      clone.classList.add('clone');
      var width = square.getBoundingClientRect().width;
      clone.style.width = "".concat(width, "px");
      clone.style.height = "".concat(width, "px");
      return clone;
    }
  }, {
    key: "_getStartClonePos",
    value: function _getStartClonePos(square) {
      var startPosY = square.getBoundingClientRect().top;
      var startPosX = square.getBoundingClientRect().left;
      return [startPosY, startPosX];
    }
  }, {
    key: "_addClone",
    value: function _addClone(clone, startPosClone) {
      clone.style.top = "".concat(startPosClone[0], "px");
      clone.style.left = "".concat(startPosClone[1], "px");
      body.append(clone);
    }
  }, {
    key: "_moveClone",
    value: function _moveClone(cell, clone, startPosClone, direct) {
      var border = parseInt(getComputedStyle(this._table).borderTopWidth);
      var endPosY = cell.getBoundingClientRect().top + border;
      var endPosX = cell.getBoundingClientRect().left + border;

      if (direct == 'ArrowUp' || direct == 'ArrowDown') {
        clone.style.transform = "translate(0px,".concat(endPosY - startPosClone[0], "px)");
      } else clone.style.transform = "translate(".concat(endPosX - startPosClone[1], "px,0px)");
    }
  }, {
    key: "_addOriginal",
    value: function _addOriginal(cell, square) {
      cell.append(square);
      square.id = cell.id;
    }
  }, {
    key: "_merge",
    value: function _merge(square, innerSquare) {
      if (_sound__WEBPACK_IMPORTED_MODULE_1__["soundActive"]) _sound__WEBPACK_IMPORTED_MODULE_1__["mergeSound"].play();
      innerSquare.remove();
      square.textContent = Number(square.textContent) * 2;
      if (square.textContent == '2048') this._showMessage('win');
      square.classList.add("s".concat(square.textContent));
      square.classList.add('merged');

      this._scoreUpdate(square.textContent);
    }
  }, {
    key: "_scoreUpdate",
    value: function _scoreUpdate(num) {
      var score = document.querySelector('.score').querySelector('span');
      var newScore = document.createElement('span');
      newScore.textContent = Number(score.textContent) + Number(num);
      var parent = score.parentElement;
      score.remove();
      parent.append(newScore);
    }
  }, {
    key: "_isCellFree",
    value: function _isCellFree(coords, posY, posX, square, value) {
      var cell = this._table.querySelector(".table__cell[id=\"".concat(coords, "\"]"));

      if (!cell.hasChildNodes()) {
        this._getNextCell(this._dir, "".concat(posY).concat(posX), square);
      } else if (cell.hasChildNodes()) {
        var innerSquare = cell.querySelector('.square');

        if (innerSquare.textContent == value && !innerSquare.classList.contains('merged')) {
          this._moveTo(cell, square, innerSquare, this._dir);
        } else {
          this._corrMov(this._dir, "".concat(posY).concat(posX), square);
        }
      }
    }
  }, {
    key: "_corrMov",
    value: function _corrMov(direction, coords, square) {
      var posY = Number(coords[0]);
      var posX = Number(coords[1]);
      var coordinate;

      switch (direction) {
        case 'ArrowDown':
          posY = posY - 1;
          coordinate = "".concat(posY, "-").concat(posX);
          break;

        case 'ArrowUp':
          posY = posY + 1;
          coordinate = "".concat(posY, "-").concat(posX);
          break;

        case 'ArrowLeft':
          posX = posX + 1;
          coordinate = "".concat(posY, "-").concat(posX);
          break;

        case 'ArrowRight':
          posX = posX - 1;
          coordinate = "".concat(posY, "-").concat(posX);
          break;
      }

      var cell = this._table.querySelector(".table__cell[id=\"".concat(coordinate, "\"]"));

      this._moveTo(cell, square, false, direction);
    }
  }, {
    key: "_getNextCell",
    value: function _getNextCell(direction, startCoords, square) {
      var value = square.textContent;
      var coords;
      var posY = Number(startCoords[0]);
      var posX = Number(startCoords[1]);
      coords = "".concat(posY, "-").concat(posX);

      switch (direction) {
        case 'ArrowDown':
          if (posY != 4) {
            posY = posY + 1;
            coords = "".concat(posY, "-").concat(posX);

            this._isCellFree(coords, posY, posX, square, value);
          } else {
            var cell = this._table.querySelector(".table__cell[id=\"".concat(coords, "\"]"));

            this._moveTo(cell, square, false, direction);
          }

          break;

        case 'ArrowUp':
          if (posY != 1) {
            posY = posY - 1;
            coords = "".concat(posY, "-").concat(posX);

            this._isCellFree(coords, posY, posX, square, value);
          } else {
            var _cell = this._table.querySelector(".table__cell[id=\"".concat(coords, "\"]"));

            this._moveTo(_cell, square, false, direction);
          }

          break;

        case 'ArrowLeft':
          if (posX != 1) {
            posX = posX - 1;
            coords = "".concat(posY, "-").concat(posX);

            this._isCellFree(coords, posY, posX, square, value);
          } else {
            var _cell2 = this._table.querySelector(".table__cell[id=\"".concat(coords, "\"]"));

            this._moveTo(_cell2, square, false, direction);
          }

          break;

        case 'ArrowRight':
          if (posX != 4) {
            posX = posX + 1;
            coords = "".concat(posY, "-").concat(posX);

            this._isCellFree(coords, posY, posX, square, value);
          } else {
            var _cell3 = this._table.querySelector(".table__cell[id=\"".concat(coords, "\"]"));

            this._moveTo(_cell3, square, false, direction);
          }

          break;
      }
    }
  }, {
    key: "_getSquareArr",
    value: function _getSquareArr() {
      var resault = [];
      var arr = Array.prototype.slice.call(this._squares, 0);

      switch (this._dir) {
        case 'ArrowUp':
          for (var i = this._squares.length - 1; i >= 0; i--) {
            resault.unshift(this._squares[i]);
          }

          break;

        case 'ArrowDown':
          for (var _i = this._squares.length - 1; _i >= 0; _i--) {
            resault.push(this._squares[_i]);
          }

          break;

        case 'ArrowLeft':
          arr.sort(function (a, b) {
            var x = a.id.substr(2, 1);
            var y = b.id.substr(2, 1);
            if (x > y) return 1;
            if (x < y) return -1;
            return 0;
          });
          resault = arr;
          break;

        case 'ArrowRight':
          arr.sort(function (a, b) {
            var x = a.id.substr(2, 1);
            var y = b.id.substr(2, 1);
            if (x < y) return 1;
            if (x > y) return -1;
            return 0;
          });
          resault = arr;
          break;
      }

      return resault;
    }
  }, {
    key: "_findFreePos",
    value: function _findFreePos() {
      var freeCells = [];

      if (this._cells != undefined) {
        this._cells.forEach(function (cell) {
          if (cell.childNodes.length == "0") freeCells.push(cell);
        });

        return freeCells[Object(_initMove__WEBPACK_IMPORTED_MODULE_0__["randomizer"])(0, freeCells.length)];
      }
    }
  }, {
    key: "_create",
    value: function _create() {
      var square = document.createElement('div');
      square.classList.add('square');
      square.textContent = this._num;
      return square;
    }
  }, {
    key: "_colorChange",
    value: function _colorChange(num, square) {
      square.classList.add("s".concat(num));
    }
  }, {
    key: "_append",
    value: function _append(id) {
      this._cells = document.querySelectorAll('.table__cell');

      if (id == undefined) {
        this._freeCell = this._findFreePos();

        if (this._freeCell.id != undefined) {
          this._square.id = this._freeCell.id;

          this._freeCell.append(this._square);

          this._square.classList.add('new');
        }
      } else {
        var target = this._table.querySelector(".table__cell[id=\"".concat(id, "\"]"));

        this._square.id = target.id;

        this._square.classList.add('new');

        target.append(this._square);
      }
    }
  }]);

  return Square;
}();

if (localStorage[2048] === undefined) {
  initGame();
}

function initGame() {
  new Square(Object(_initMove__WEBPACK_IMPORTED_MODULE_0__["getRandNum"])());
  new Square(Object(_initMove__WEBPACK_IMPORTED_MODULE_0__["getRandNum"])());
}
function startMove(dir) {
  new Square(Object(_initMove__WEBPACK_IMPORTED_MODULE_0__["getRandNum"])(), dir);
}

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi @babel/polyfill ./index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"../node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map