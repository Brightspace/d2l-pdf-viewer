/* global pdfjsViewer, pdfjsLib */

import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import 'd2l-colors/d2l-colors.js';
import 'fullscreen-api/fullscreen-api.js';
import './d2l-pdf-viewer-progress-bar.js';
import './d2l-pdf-viewer-toolbar.js';
import { assertTypeParameterDeclaration } from 'babel-types';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-pdf-viewer">
	<template strip-whitespace="">
		<style>
			:host {
				display: inline-block;
				position: relative;
				width: 100%;
				height: 100%;
				background-color: grey;
			}

			#viewerContainer {
				position: relative;
				overflow: auto;
				width: 100%;
				height: 100%;
			}

			d2l-pdf-viewer-toolbar {
				position: absolute;
				bottom: 18px;
				transition-property: opacity;
				transition-duration: 500ms;
				z-index: 1;
			}

			d2l-pdf-viewer-toolbar[show] {
				opacity: 1;
				pointer-events: auto;
			}

			d2l-pdf-viewer-toolbar:not([show]) {
				opacity: 0;
				pointer-events: none;
			}

			d2l-pdf-viewer-progress-bar {
				--d2l-pdf-viewer-progress-bar-primary-color: var(--d2l-color-celestine);
			}

			[hidden] {
				display: none !important;
			}

			/*
			* External PDF.js styles, from PDF.js version 2.0.943
			*/
			.textLayer {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				overflow: hidden;
				opacity: 0.2;
				line-height: 1.0;
			}

			.textLayer>div {
				color: transparent;
				position: absolute;
				white-space: pre;
				cursor: text;
				-webkit-transform-origin: 0% 0%;
				transform-origin: 0% 0%;
			}

			.textLayer .highlight {
				margin: -1px;
				padding: 1px;

				background-color: rgb(180, 0, 170);
				border-radius: 4px;
			}

			.textLayer .highlight.begin {
				border-radius: 4px 0px 0px 4px;
			}

			.textLayer .highlight.end {
				border-radius: 0px 4px 4px 0px;
			}

			.textLayer .highlight.middle {
				border-radius: 0px;
			}

			.textLayer .highlight.selected {
				background-color: rgb(0, 100, 0);
			}

			.textLayer ::-moz-selection {
				background: rgb(0, 0, 255);
			}

			.textLayer ::selection {
				background: rgb(0, 0, 255);
			}

			.textLayer .endOfContent {
				display: block;
				position: absolute;
				left: 0px;
				top: 100%;
				right: 0px;
				bottom: 0px;
				z-index: -1;
				cursor: default;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}

			.textLayer .endOfContent.active {
				top: 0px;
			}


			.annotationLayer section {
				position: absolute;
			}

			.annotationLayer .linkAnnotation>a,
			.annotationLayer .buttonWidgetAnnotation.pushButton>a {
				position: absolute;
				font-size: 1em;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			.annotationLayer .linkAnnotation>a:hover,
			.annotationLayer .buttonWidgetAnnotation.pushButton>a:hover {
				opacity: 0.2;
				background: #ff0;
				box-shadow: 0px 2px 10px #ff0;
			}

			.annotationLayer .textAnnotation img {
				position: absolute;
				cursor: pointer;
			}

			.annotationLayer .textWidgetAnnotation input,
			.annotationLayer .textWidgetAnnotation textarea,
			.annotationLayer .choiceWidgetAnnotation select,
			.annotationLayer .buttonWidgetAnnotation.checkBox input,
			.annotationLayer .buttonWidgetAnnotation.radioButton input {
				background-color: rgba(0, 54, 255, 0.13);
				border: 1px solid transparent;
				box-sizing: border-box;
				font-size: 9px;
				height: 100%;
				margin: 0;
				padding: 0 3px;
				vertical-align: top;
				width: 100%;
			}

			.annotationLayer .choiceWidgetAnnotation select option {
				padding: 0;
			}

			.annotationLayer .buttonWidgetAnnotation.radioButton input {
				border-radius: 50%;
			}

			.annotationLayer .textWidgetAnnotation textarea {
				font: message-box;
				font-size: 9px;
				resize: none;
			}

			.annotationLayer .textWidgetAnnotation input[disabled],
			.annotationLayer .textWidgetAnnotation textarea[disabled],
			.annotationLayer .choiceWidgetAnnotation select[disabled],
			.annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],
			.annotationLayer .buttonWidgetAnnotation.radioButton input[disabled] {
				background: none;
				border: 1px solid transparent;
				cursor: not-allowed;
			}

			.annotationLayer .textWidgetAnnotation input:hover,
			.annotationLayer .textWidgetAnnotation textarea:hover,
			.annotationLayer .choiceWidgetAnnotation select:hover,
			.annotationLayer .buttonWidgetAnnotation.checkBox input:hover,
			.annotationLayer .buttonWidgetAnnotation.radioButton input:hover {
				border: 1px solid #000;
			}

			.annotationLayer .textWidgetAnnotation input:focus,
			.annotationLayer .textWidgetAnnotation textarea:focus,
			.annotationLayer .choiceWidgetAnnotation select:focus {
				background: none;
				border: 1px solid transparent;
			}

			.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,
			.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after,
			.annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before {
				background-color: #000;
				content: '';
				display: block;
				position: absolute;
			}

			.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,
			.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after {
				height: 80%;
				left: 45%;
				width: 1px;
			}

			.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before {
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
			}

			.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after {
				-webkit-transform: rotate(-45deg);
				transform: rotate(-45deg);
			}

			.annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before {
				border-radius: 50%;
				height: 50%;
				left: 30%;
				top: 20%;
				width: 50%;
			}

			.annotationLayer .textWidgetAnnotation input.comb {
				font-family: monospace;
				padding-left: 2px;
				padding-right: 0;
			}

			.annotationLayer .textWidgetAnnotation input.comb:focus {
				/*
			* Letter spacing is placed on the right side of each character. Hence, the
			* letter spacing of the last character may be placed outside the visible
			* area, causing horizontal scrolling. We avoid this by extending the width
			* when the element has focus and revert this when it loses focus.
			*/
				width: 115%;
			}

			.annotationLayer .buttonWidgetAnnotation.checkBox input,
			.annotationLayer .buttonWidgetAnnotation.radioButton input {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				padding: 0;
			}

			.annotationLayer .popupWrapper {
				position: absolute;
				width: 20em;
			}

			.annotationLayer .popup {
				position: absolute;
				z-index: 200;
				max-width: 20em;
				background-color: #FFFF99;
				box-shadow: 0px 2px 5px #333;
				border-radius: 2px;
				padding: 0.6em;
				margin-left: 5px;
				cursor: pointer;
				font: message-box;
				word-wrap: break-word;
			}

			.annotationLayer .popup h1 {
				font-size: 1em;
				border-bottom: 1px solid #000000;
				margin: 0;
				padding-bottom: 0.2em;
			}

			.annotationLayer .popup p {
				margin: 0;
				padding-top: 0.2em;
			}

			.annotationLayer .highlightAnnotation,
			.annotationLayer .underlineAnnotation,
			.annotationLayer .squigglyAnnotation,
			.annotationLayer .strikeoutAnnotation,
			.annotationLayer .lineAnnotation svg line,
			.annotationLayer .squareAnnotation svg rect,
			.annotationLayer .circleAnnotation svg ellipse,
			.annotationLayer .polylineAnnotation svg polyline,
			.annotationLayer .polygonAnnotation svg polygon,
			.annotationLayer .inkAnnotation svg polyline,
			.annotationLayer .stampAnnotation,
			.annotationLayer .fileAttachmentAnnotation {
				cursor: pointer;
			}

			.pdfViewer .canvasWrapper {
				overflow: hidden;
			}

			.pdfViewer .page {
				direction: ltr;
				width: 816px;
				height: 1056px;
				margin: 1px auto -8px auto;
				position: relative;
				overflow: visible;
				border: 9px solid transparent;
				background-clip: content-box;
				-o-border-image: url('https://s.brightspace.com/lib/pdf.js/2.0.943/web/images/shadow.png') 9 9 repeat;
				border-image: url('https://s.brightspace.com/lib/pdf.js/2.0.943/web/images/shadow.png') 9 9 repeat;
				background-color: white;
			}

			.pdfViewer.removePageBorders .page {
				margin: 0px auto 10px auto;
				border: none;
			}

			.pdfViewer.singlePageView {
				display: inline-block;
			}

			.pdfViewer.singlePageView .page {
				margin: 0;
				border: none;
			}

			.pdfViewer.scrollHorizontal,
			.pdfViewer.scrollWrapped,
			.spread {
				margin-left: 3.5px;
				margin-right: 3.5px;
				text-align: center;
			}

			.pdfViewer.scrollHorizontal,
			.spread {
				white-space: nowrap;
			}

			.pdfViewer.removePageBorders,
			.pdfViewer.scrollHorizontal .spread,
			.pdfViewer.scrollWrapped .spread {
				margin-left: 0;
				margin-right: 0;
			}

			.spread .page,
			.pdfViewer.scrollHorizontal .page,
			.pdfViewer.scrollWrapped .page,
			.pdfViewer.scrollHorizontal .spread,
			.pdfViewer.scrollWrapped .spread {
				display: inline-block;
				vertical-align: middle;
			}

			.spread .page,
			.pdfViewer.scrollHorizontal .page,
			.pdfViewer.scrollWrapped .page {
				margin-left: -3.5px;
				margin-right: -3.5px;
			}

			.pdfViewer.removePageBorders .spread .page,
			.pdfViewer.removePageBorders.scrollHorizontal .page,
			.pdfViewer.removePageBorders.scrollWrapped .page {
				margin-left: 5px;
				margin-right: 5px;
			}

			.pdfViewer .page canvas {
				margin: 0;
				display: block;
			}

			.pdfViewer .page canvas[hidden] {
				display: none;
			}

			.pdfViewer .page .loadingIcon {
				position: absolute;
				display: block;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				background: url('https://s.brightspace.com/lib/pdf.js/2.0.943/web/images/loading-icon.gif') center no-repeat;
			}

			.pdfPresentationMode .pdfViewer {
				margin-left: 0;
				margin-right: 0;
			}

			.pdfPresentationMode .pdfViewer .page,
			.pdfPresentationMode .pdfViewer .spread {
				display: block;
			}

			.pdfPresentationMode .pdfViewer .page,
			.pdfPresentationMode .pdfViewer.removePageBorders .page {
				margin-left: auto;
				margin-right: auto;
			}

			.pdfPresentationMode:-ms-fullscreen .pdfViewer .page {
				margin-bottom: 100% !important;
			}

			.pdfPresentationMode:-webkit-full-screen .pdfViewer .page {
				margin-bottom: 100%;
				border: 0;
			}

			.pdfPresentationMode:-moz-full-screen .pdfViewer .page {
				margin-bottom: 100%;
				border: 0;
			}

			.pdfPresentationMode:fullscreen .pdfViewer .page {
				margin-bottom: 100%;
				border: 0;
			}
		</style>

		<span id="pdfName" hidden="">[[_pdfName]]</span>

		<fullscreen-api
			id="fsApi"
			target="[[_getFullscreenTarget()]]"
			fullscreen="{{_isFullscreen}}"
			fullscreen-available="{{_isFullscreenAvailable}}">
		</fullscreen-api>

		<d2l-pdf-viewer-progress-bar id="progressBar"></d2l-pdf-viewer-progress-bar>
		<d2l-pdf-viewer-toolbar
			id="toolbar"
			page-number="[[_pageNumber]]"
			pages-count="[[_pagesCount]]"
			page-scale="[[_pageScale]]"
			min-page-scale="[[minPageScale]]"
			max-page-scale="[[maxPageScale]]"
			fullscreen-available="[[_isFullscreenAvailable]]"
			is-fullscreen="[[_isFullscreen]]"
			show$="[[_showToolbar]]">
		</d2l-pdf-viewer-toolbar>
		<div id="viewerContainer">
			<div id="viewer" class="pdfViewer" tabindex="0"></div>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);

/**
 * `<d2l-pdf-viewer>`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
Polymer({
	is: 'd2l-pdf-viewer',
	hostAttributes: {
		'role': 'document',
		'aria-describedby': 'pdfName'
	},
	properties: {
		loader: {
			type: String,
			value: 'import'
		},
		minPageScale: {
			type: Number,
			value: 0.1
		},
		maxPageScale: {
			type: Number,
			value: 5
		},
		pdfjsBasePath: String,
		pdfJsWorkerSrc: {
			type: String
		},
		src: {
			type: String
		},
		useCdn: {
			type: Boolean,
			value: false
		},
		pdfJsGetDocumentParams: {
			type: Object,
			value: function() {
				return {};
			}
		},
		_isFullscreen: {
			type: Boolean,
			value: false
		},
		_isFullscreenAvailable: {
			type: Boolean,
			value: false
		},
		_isLoaded: {
			type: Boolean,
			value: false
		},
		_hasRecentInteraction: {
			type: Boolean,
			value: false
		},
		_pageNumber: {
			type: Number
		},
		_pagesCount: {
			type: Number
		},
		_pageScale: {
			type: Number
		},
		_pdfName: {
			type: String,
			value: ''
		},
		_showToolbar: {
			type: Boolean,
			computed: '_computeShowToolbar(_isLoaded, _hasRecentInteraction)'
		}
	},
	listeners: {
		'mouseenter': '_onMouseEnter',
		'mouseleave': '_onMouseLeave',
		'touchstart': '_onInteraction',
		'touchend': '_onInteraction',
		'touchmove': '_onInteraction',
		'focusin': '_onInteraction',
		'focusout': '_onFocusOut',
		'd2l-pdf-viewer-button-interaction': '_onInteraction'
	},
	observers: [
		'_srcChanged(isAttached, src, pdfJsGetDocumentParams)'
	],
	ready: function() {
		this._boundListeners = false;
		this._addedEventListeners = false;

		let initializeTask;

		this._workerSrc = this.pdfJsWorkerSrc;

		// Currently the loader implies useCdn, but ideally isn't in the future
		switch (this.loader) {
			case 'import':
				initializeTask = this._loadDynamicImports();
				break;
			case 'script':
				initializeTask = this._loadScripts();
				break;
			default:
				initializeTask = Promise.reject(`unknown loader: ${this.loader}`);
		}

		this._initializeTask = initializeTask
			.then(libraries => {
				return this._onLibrariesLoaded(libraries);
			})
			.catch(e => {
				this.$.progressBar.hidden = true;

				if (this.dispatchEvent(new CustomEvent(
					'd2l-pdf-viewer-load-failed', {
						bubbles: true,
						composed: true,
						detail: e,
						cancelable: true
					},
				))) {
					console.error(e); //eslint-disable-line
				}
			});
	},
	_loadDynamicImports: function() {
		if (this.useCdn || this.pdfjsBasePath) {
			return Promise.reject('loader `import` does not have CDN/base path support');
		}

		if (!this._workerSrc) {
			this._workerSrc = `${import.meta.url}/../node_modules/pdfjs-dist-modules/pdf.worker.min.js`;
		}

		return Promise.all([
			import('pdfjs-dist-modules/pdf.js'),
			import('pdfjs-dist-modules/pdf_link_service.js'),
			import('pdfjs-dist-modules/pdf_viewer.js')
		]).then(([pdfImport, pdfLinkServiceImport, pdfViewerImport]) => {
			return {
				pdfjsLib: pdfImport.default,
				LinkTarget: pdfImport.LinkTarget,
				PDFLinkService: pdfLinkServiceImport.PDFLinkService,
				PDFViewer: pdfViewerImport.PDFViewer
			};
		});
	},
	_loadScripts: function() {
		const basePath = this.useCdn
			? 'https://s.brightspace.com/lib/pdf.js/2.0.943'
			: this.pdfjsBasePath || `${import.meta.url}/../node_modules/pdfjs-dist`;

		if (!this._workerSrc) {
			this._workerSrc = `${basePath}/build/pdf.worker.min.js`;
		}

		return this._loadScript(`${basePath}/build/pdf.min.js`)
			.then(() => this._loadScript(`${basePath}/web/pdf_viewer.js`))
			.then(() => {
				return {
					pdfjsLib,
					LinkTarget: pdfjsLib.LinkTarget,
					PDFLinkService: pdfjsViewer.PDFLinkService,
					PDFViewer: pdfjsViewer.PDFViewer,
				};
			});
	},
	_loadScript: function(src) {
		const scriptTag = document.createElement('script');
		scriptTag.async = false;
		document.head.appendChild(scriptTag);

		return new Promise((resolve, reject) => {
			scriptTag.onload = resolve;
			scriptTag.onerror = reject;
			scriptTag.src = src;
		});
	},
	_onLibrariesLoaded: function({
		pdfjsLib,
		LinkTarget,
		PDFViewer,
		PDFLinkService,
	}) {
		this._pdfJsLib = pdfjsLib;

		// Ensure that style scoping is applied to elements added by PDF.js
		// under Shady DOM
		this.scopeSubtree(this.$.viewerContainer, true);

		pdfjsLib.GlobalWorkerOptions.workerSrc = this._workerSrc;

		// (Optionally) enable hyperlinks within PDF files.
		this._pdfLinkService = new PDFLinkService({
			externalLinkTarget: LinkTarget.BLANK
		});

		this._pdfViewer = new PDFViewer({
			container: this.$.viewerContainer,
			linkService: this._pdfLinkService,
			useOnlyCssZoom: true, // Use CSS zooming only, as default zoom rendering in (modularized?) pdfjs-dist is buggy
		});

		this._pdfLinkService.setViewer(this._pdfViewer);

		// Add event listeners before loading document
		this._addEventListeners();

		this.dispatchEvent(new CustomEvent('d2l-pdf-viewer-initialized', {
			bubbles: true,
		}));
	},
	attached: function() {
		this._addEventListeners();
		if (!this._pdfViewer) {
			const progressBar = this.$.progressBar;
			progressBar.hidden = false;
			progressBar.indeterminate = true;
			progressBar.start();
		}
	},
	detached: function() {
		window.removeEventListener('resize', this._resize);

		this.$.viewerContainer.removeEventListener('pagesinit', this._onPagesInitEvent);
		this.$.viewerContainer.removeEventListener('pagechange', this._onPageChangeEvent);

		this.$.toolbar.removeEventListener('d2l-pdf-viewer-toolbar-previous', this._onPrevPageEvent);
		this.$.toolbar.removeEventListener('d2l-pdf-viewer-toolbar-next', this._onNextPageEvent);
		this.$.toolbar.removeEventListener('d2l-pdf-viewer-toolbar-zoom-in', this._onZoomInEvent);
		this.$.toolbar.removeEventListener('d2l-pdf-viewer-toolbar-zoom-out', this._onZoomOutEvent);
		this.$.toolbar.removeEventListener('d2l-pdf-viewer-toolbar-page-change', this._onPageNumberChangedEvent);
		this.$.toolbar.removeEventListener('d2l-pdf-viewer-toolbar-toggle-fullscreen', this._onFullscreenEvent);

		this.$.progressBar.removeEventListener('d2l-pdf-viewer-progress-bar-animation-complete', this._onProgressAnimationCompleteEvent);

		this._addedEventListeners = false;
	},
	_addEventListeners: function() {
		if (!this._boundListeners) {
			this._onMouseEnter = this._onMouseEnter.bind(this); // don't add yet- just bind
			this._resize = this._resize.bind(this);
			this._onPagesInitEvent = this._onPagesInitEvent.bind(this);
			this._onPageChangeEvent = this._onPageChangeEvent.bind(this);
			this._onPrevPageEvent = this._onPrevPageEvent.bind(this);
			this._onNextPageEvent = this._onNextPageEvent.bind(this);
			this._onZoomInEvent = this._onZoomInEvent.bind(this);
			this._onZoomOutEvent = this._onZoomOutEvent.bind(this);
			this._onPageNumberChangedEvent = this._onPageNumberChangedEvent.bind(this);
			this._onFullscreenEvent = this._onFullscreenEvent.bind(this);
			this._onProgressAnimationCompleteEvent = this._onProgressAnimationCompleteEvent.bind(this);
			this._boundListeners = true;
		}

		if (this._addedEventListeners) {
			return;
		}

		window.addEventListener('resize', this._resize);

		this.$.viewerContainer.addEventListener('pagesinit', this._onPagesInitEvent);
		this.$.viewerContainer.addEventListener('pagechange', this._onPageChangeEvent);

		this.$.toolbar.addEventListener('d2l-pdf-viewer-toolbar-previous', this._onPrevPageEvent);
		this.$.toolbar.addEventListener('d2l-pdf-viewer-toolbar-next', this._onNextPageEvent);
		this.$.toolbar.addEventListener('d2l-pdf-viewer-toolbar-zoom-in', this._onZoomInEvent);
		this.$.toolbar.addEventListener('d2l-pdf-viewer-toolbar-zoom-out', this._onZoomOutEvent);
		this.$.toolbar.addEventListener('d2l-pdf-viewer-toolbar-page-change', this._onPageNumberChangedEvent);
		this.$.toolbar.addEventListener('d2l-pdf-viewer-toolbar-toggle-fullscreen', this._onFullscreenEvent);

		this.$.progressBar.addEventListener('d2l-pdf-viewer-progress-bar-animation-complete', this._onProgressAnimationCompleteEvent);

		this._addedEventListeners = true;
	},
	_resize: function() {
		if (!this._pdfViewer) {
			return;
		}
		if (!this._resizeThrottleHandle) {
			this._resizeThrottleHandle = setTimeout(() => {
				var currentScaleValue = this._pdfViewer.currentScaleValue;

				if (currentScaleValue === 'auto' ||
					currentScaleValue === 'page-fit' ||
					currentScaleValue === 'page-width') {
					// Note: the scale is constant for 'page-actual'.
					this._pdfViewer.currentScaleValue = currentScaleValue;
				}

				this._pageScale = this._pdfViewer.currentScale;
				this._pdfViewer.update();
				this._resizeThrottleHandle = null;
			}, 100);
		}
	},
	_srcChanged: function(isAttached, src, pdfJsGetDocumentParams) {
		if (!isAttached || !src) {
			return;
		}

		const progressBar = this.$.progressBar;
		let destroyLoadingTask = this._initializeTask;

		this._resetPdfData();

		progressBar.indeterminate = false;
		progressBar.value = 0;

		if (this._loadingTask) {
			destroyLoadingTask = this._loadingTask.destroy();
			this._loadingTask = null;
		}

		this._setPdfNameFromUrl(src);

		let paramGetter;
		if (typeof pdfJsGetDocumentParams === Function) {
			paramGetter =  pdfJsGetDocumentParams;
		} else {
			paramGetter = Promise.resolve(pdfJsGetDocumentParams);
		}

		// TODO: DELET THIS
		console.log(JSON.stringify(pdfJsGetDocumentParams)); //eslint-disable-line

		destroyLoadingTask.then(paramGetter).then(params => {
			params = params || {};
			params.url = src;
			params.data = undefined;
			params.range = undefined;
			const loadingTask = this._loadingTask = this._pdfJsLib.getDocument(params);

			progressBar.hidden = false;

			loadingTask.onProgress = (progressData) => {
				if (progressBar.indeterminate) {
					return;
				}

				if (!progressData.total) {
					progressBar.indeterminate = true;
					progressBar.start();
					return;
				}

				progressBar.value = progressData.loaded / progressData.total;
			};

			loadingTask.promise.then(pdfDocument => {
				this._pdfViewer.setDocument(pdfDocument);
				this._pagesCount = pdfDocument.numPages;
				this._pageNumber = this._pdfViewer.currentPageNumber;

				this._pdfLinkService.setDocument(pdfDocument, null);
			}).catch(() => {
				progressBar.hidden = true;

				if (loadingTask.destroyed) {
					// the load was canceled because the src changed
					return;
				}

				this.dispatchEvent(new CustomEvent('d2l-pdf-viewer-load-failed', {
					bubbles: true,
					composed: true
				}));
			});
		});
	},
	_onPagesInitEvent: function() {
		this._pdfViewer.currentScaleValue = 'page-width';
		this._pageScale = this._pdfViewer.currentScale;
		this._onInteraction();
		this._isLoaded = true;

		if (this.$.progressBar.indeterminate) {
			this.$.progressBar.finish();
		}
	},
	_onPageChangeEvent: function(evt) {
		this._pageNumber = evt.pageNumber;
	},
	_onNextPageEvent: function() {
		if (this._pdfViewer) {
			this._setPageNumber(this._pdfViewer.currentPageNumber + 1);
		}
	},
	_onPrevPageEvent: function() {
		if (this._pdfViewer) {
			this._setPageNumber(this._pdfViewer.currentPageNumber - 1);
		}
	},
	_onZoomInEvent: function() {
		this._addDeltaZoom(0.1);
		this._onInteraction();
	},
	_onZoomOutEvent: function() {
		this._addDeltaZoom(-0.1);
		this._onInteraction();
	},
	_onFullscreenEvent: function() {
		if (!this._pdfViewer) {
			return;
		}
		this.$.fsApi.toggleFullscreen();
		this._onInteraction();

		// If scale is a special type (eg. 'page-width'), ensure we maintain that
		requestAnimationFrame(() => {
			this._pageScale = this._pdfViewer.currentScale;
		});
	},
	_onProgressAnimationCompleteEvent: function() {
		this.$.progressBar.hidden = true;
	},
	_onPageNumberChangedEvent: function(evt) {
		var newPage = parseInt(evt.detail.page);

		this._setPageNumber(newPage);
	},
	_addDeltaZoom: function(delta) {
		if (!this._pdfViewer) {
			return;
		}
		var newZoom = this._pdfViewer.currentScale + delta;

		this._setScale(newZoom);
	},
	_setPageNumber: function(pageNumber) {
		if (!this._pdfViewer || pageNumber < 1 || pageNumber > this._pagesCount) {
			return;
		}

		this._pdfViewer.currentPageNumber = pageNumber;
		this._pageNumber = pageNumber;
	},
	_setScale: function(newScale) {
		if (!this._pdfViewer) {
			return;
		}
		this._pdfViewer.currentScaleValue = Math.max(
			this.minPageScale,
			Math.min(this.maxPageScale, newScale)
		);

		this._pageScale = this._pdfViewer.currentScale;
	},
	_getFullscreenTarget: function() {
		return this;
	},
	_onMouseEnter: function() {
		this.addEventListener('mousemove', this._onMouseMove);
	},
	_onMouseLeave: function(e) {
		// Handle a Chrome bug where "mouseleave" event may be sporadically fired when interacting
		// with element, with relatedTarget/toElement of "null"
		// This could also happen when switching away from the tab/window, but on re-entry
		// this element get another mouseleave/etc. event if the mouse is outside of the element
		if (e.relatedTarget || e.toElement) {
			clearTimeout(this._recentInteractionTimer);

			this.removeEventListener('mousemove', this._onMouseMove);
			this._hasRecentInteraction = false;
		}
	},
	_onMouseMove: function() {
		this._onInteraction();
	},
	_onInteraction: function() {
		this._hasRecentInteraction = true;

		clearTimeout(this._recentInteractionTimer);

		this._recentInteractionTimer = setTimeout(() => {
			this._hasRecentInteraction = false;
		}, 2000);
	},
	_onFocusOut: function(e) {
		if (!D2L.Dom.isComposedAncestor(this, e.relatedTarget)) {
			this._hasRecentInteraction = false;
		}
	},
	_computeShowToolbar: function(isLoaded, hasRecentInteraction) {
		return !!isLoaded && !!hasRecentInteraction;
	},
	_resetPdfData: function() {
		// Check if pdfJs has been imported
		if (this._pdfViewer && this._pdfLinkService) {
			this._pdfViewer.setDocument(null);
			this._pdfLinkService.setDocument(null);
		}
		this._pageNumber = 0;
		this._pagesCount = 0;
		this._isLoaded = false;
		this._pdfName = '';
	},
	_setPdfNameFromUrl: function(src) {
		if (!src) {
			this._pdfName = '';
			return;
		}

		const parts = src.split('/');
		let pdfName = '';

		if (parts.length > 0) {
			pdfName = parts[parts.length - 1];
		}

		this._pdfName = pdfName;
	}
});
