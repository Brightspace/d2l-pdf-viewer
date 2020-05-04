import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.PdfViewer = window.D2L.PolymerBehaviors.PdfViewer || {};

/**
 * THIS FILE IS GENERATED. RUN `npm run build:lang` TO REGENERATE.
 * Localizes the pdf viewer component.
 * @polymerBehavior D2L.PolymerBehaviors.PdfViewer.LocalizeBehavior
 */
D2L.PolymerBehaviors.PdfViewer.LocalizeBehaviorImpl = {
	properties: {
		/**
		 * Localization resources.
		 */
		resources: {
			value: function() {
				return {
					'ar': {
						'downloadTitle': 'تنزيل',
						'downloadLabel': 'تنزيل',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'وضع العرض التقديمي',
						'presentationModeTitle': 'انتقل لوضع العرض التقديمي',
						'zoomInLabel': 'قرّب',
						'zoomInTitle': 'قرّب',
						'zoomOutLabel': 'بعّد',
						'zoomOutTitle': 'بعّد'
					},
					'da': {},
					'de': {
						'downloadTitle': 'Herunterladen',
						'downloadLabel': 'Herunterladen',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Präsentationsmodus',
						'presentationModeTitle': 'In Präsentationsmodus wechseln',
						'zoomInLabel': 'Vergrößern',
						'zoomInTitle': 'Vergrößern',
						'zoomOutLabel': 'Verkleinern',
						'zoomOutTitle': 'Verkleinern'
					},
					'en': {
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Presentation Mode',
						'presentationModeTitle': 'Switch to Presentation Mode',
						'zoomInLabel': 'Zoom In',
						'zoomInTitle': 'Zoom In',
						'zoomOutLabel': 'Zoom Out',
						'zoomOutTitle': 'Zoom Out',
						'downloadTitle': 'Download',
						'downloadLabel': 'Download',
						'printTitle': 'Open new tab for printing',
						'printLabel': 'Open new tab for printing'
					},
					'es': {
						'downloadTitle': 'Descargar',
						'downloadLabel': 'Descargar',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Modo presentación',
						'presentationModeTitle': 'Cambiar al modo presentación',
						'printTitle': 'Abrir una nueva pestaña para imprimir',
						'printLabel': 'Abrir una nueva pestaña para imprimir',
						'zoomInLabel': 'Aumentar',
						'zoomInTitle': 'Aumentar',
						'zoomOutLabel': 'Reducir',
						'zoomOutTitle': 'Reducir'
					},
					'fr': {
						'downloadTitle': 'Télécharger',
						'downloadLabel': 'Télécharger',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Mode présentation',
						'presentationModeTitle': 'Basculer en mode présentation',
						'printTitle': 'Ouvrir un nouvel onglet pour imprimer',
						'printLabel': 'Ouvrir un nouvel onglet pour imprimer',
						'zoomInLabel': 'Zoom avant',
						'zoomInTitle': 'Zoom avant',
						'zoomOutLabel': 'Zoom arrière',
						'zoomOutTitle': 'Zoom arrière'
					},
					'ja': {
						'downloadTitle': 'ダウンロード',
						'downloadLabel': 'ダウンロード',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'プレゼンテーションモード',
						'presentationModeTitle': 'プレゼンテーションモードに切り替えます',
						'zoomInLabel': '拡大',
						'zoomInTitle': '表示を拡大します',
						'zoomOutLabel': '縮小',
						'zoomOutTitle': '表示を縮小します'
					},
					'ko': {
						'downloadTitle': '다운로드',
						'downloadLabel': '다운로드',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': '발표 모드',
						'presentationModeTitle': '발표 모드로 전환',
						'zoomInLabel': '확대',
						'zoomInTitle': '확대',
						'zoomOutLabel': '축소',
						'zoomOutTitle': '축소'
					},
					'nb': {
						'downloadTitle': 'Last ned',
						'downloadLabel': 'Last ned',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Presentasjonsmodus',
						'presentationModeTitle': 'Bytt til presentasjonsmodus',
						'zoomInLabel': 'Zoom inn',
						'zoomInTitle': 'Zoom inn',
						'zoomOutLabel': 'Zoom ut',
						'zoomOutTitle': 'Zoom ut'
					},
					'nl': {
						'downloadTitle': 'Downloaden',
						'downloadLabel': 'Downloaden',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Presentatiemodus',
						'presentationModeTitle': 'Wisselen naar presentatiemodus',
						'zoomInLabel': 'Inzoomen',
						'zoomInTitle': 'Inzoomen',
						'zoomOutLabel': 'Uitzoomen',
						'zoomOutTitle': 'Uitzoomen'
					},
					'pt': {
						'downloadTitle': 'Download',
						'downloadLabel': 'Download',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Modo de apresentação',
						'presentationModeTitle': 'Trocar para o modo de apresentação',
						'zoomInLabel': 'Ampliar',
						'zoomInTitle': 'Ampliar',
						'zoomOutLabel': 'Reduzir',
						'zoomOutTitle': 'Reduzir'
					},
					'sv': {
						'downloadTitle': 'Ladda ned',
						'downloadLabel': 'Ladda ned',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Presentationsläge',
						'presentationModeTitle': 'Byt till presentationsläge',
						'zoomInLabel': 'Zooma in',
						'zoomInTitle': 'Zooma in',
						'zoomOutLabel': 'Zooma ut',
						'zoomOutTitle': 'Zooma ut'
					},
					'tr': {
						'downloadTitle': 'İndir',
						'downloadLabel': 'İndir',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': 'Sunum Modu',
						'presentationModeTitle': 'Sunum moduna geç',
						'zoomInLabel': 'Yaklaştır',
						'zoomInTitle': 'Yaklaştır',
						'zoomOutLabel': 'Uzaklaştır',
						'zoomOutTitle': 'Uzaklaştır'
					},
					'zh-TW': {
						'downloadTitle': '下載',
						'downloadLabel': '下載',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': '簡報模式',
						'presentationModeTitle': '切換至簡報模式',
						'zoomInLabel': '放大',
						'zoomInTitle': '放大',
						'zoomOutLabel': '縮小',
						'zoomOutTitle': '縮小'
					},
					'zh': {
						'downloadTitle': '下载',
						'downloadLabel': '下载',
						'pageOfPages': 'Page {pageNumber} / {pagesCount}',
						'presentationModeLabel': '演示模式',
						'presentationModeTitle': '切换到演示模式',
						'zoomInLabel': '放大',
						'zoomInTitle': '放大',
						'zoomOutLabel': '缩小',
						'zoomOutTitle': '缩小'
					}
				};
			}
		}
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.PdfViewer.LocalizeBehavior */
D2L.PolymerBehaviors.PdfViewer.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.PdfViewer.LocalizeBehaviorImpl
];
