import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export function isSupported( option ) {
	// return supportedOptions.includes( option );
	return /^\d(.\d+)?$/mg.test(String(option))
}

export function normalizeOptions(configuredOptions) {
	return configuredOptions.map(optionDefinition).filter(option => !!option);
}

export function buildDefinition( options ) {
	const definition = {
		model: {
			key: 'lineHeight',
			values: options.slice()
		},
		view: {}
	};

	for ( const option of options ) {
		definition.view[ option ] = {
			key: 'style',
			value: {
				'line-height': option
			}
		};
	}

	return definition;
}


function optionDefinition( option ) {
	if (typeof option === 'object') {
		return option
	}

	if (option === 'default') {
		return {
			model: undefined,
			title: 'Default'
		};
	}

	const sizePreset = parseFloat(option)

	if (isNaN(sizePreset)) {
		return
	}

	return generatePixelPreset(sizePreset)
}

function generatePixelPreset(size) {
	const sizeName = String(size)

	return {
		title: sizeName,
		model: size,
		view: {
			name: 'span',
			styles: {
				'line-height': sizeName
			},
			priority: 5
		}
	}
}