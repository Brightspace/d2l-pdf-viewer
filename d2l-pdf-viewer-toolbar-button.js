import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icon.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-pdf-viewer-toolbar-button">
	<template strip-whitespace="">
		<style>
			:host {
				cursor: pointer;
				border: none;
				border-radius: 6px;
				outline: none;
				user-select: none;
				transition: background-color 0.5s;
				background-color: transparent;
				padding: 0;
			}

			:host([disabled]) {
				cursor: default;
				opacity: .5;
			}

			:host(:focus),
			:host(:hover:not([disabled])) {
				background-color: var(--d2l-color-celestine);
			}

			d2l-icon {
				color: white;
				padding: 6px;
			}
		</style>
		<d2l-icon icon="[[icon]]"></d2l-icon>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-pdf-viewer-toolbar-button',

	hostAttributes: {
		role: 'button',
		tabIndex: -1
	},

	listeners: {
		'focusin': '_onInteraction',
		'focusout': '_onInteraction'
	},

	properties: {
		ariaLabel: {
			type: String,
			reflectToAttribute: true
		},
		disabled: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		icon: {
			type: String
		},
		toggle: {
			type: Boolean,
			value: false
		},
		pressed: {
			type: Boolean,
			value: false
		},
		title: {
			type: String
		}
	},

	observers: [
		'_setAriaPressed(toggle, pressed)'
	],

	_onInteraction: function() {
		this.dispatchEvent(new CustomEvent('d2l-pdf-viewer-button-interaction', {
			bubbles: true,
			composed: true
		}));
	},

	_setAriaPressed: function(toggle, pressed) {
		if (!toggle) {
			this.removeAttribute('aria-pressed');
		} else {
			this.setAttribute('aria-pressed', pressed ? 'true' : 'false');
		}
	}
});
