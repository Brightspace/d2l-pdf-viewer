import '../../localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.PdfViewer = window.D2L.PolymerBehaviors.PdfViewer || {};
window.D2L.PolymerBehaviors.PdfViewer.LangTerms = window.D2L.PolymerBehaviors.PdfViewer.LangTerms || {};
Polymer({
	is: 'localize-behavior-consumer',
	behaviors: [
		D2L.PolymerBehaviors.PdfViewer.LocalizeBehavior
	]
});
