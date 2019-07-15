import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Model from '@ckeditor/ckeditor5-ui/src/model'
import Collection from '@ckeditor/ckeditor5-utils/src/collection'

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils'

import { isSupported, normalizeOptions } from './utils'

export default class LineHightUI extends Plugin {
    init() {
		const editor = this.editor
		const t = editor.t

		const options = this._getLocalizedOptions()

		const command = editor.commands.get('lineHeight')

		// Register UI component.
		editor.ui.componentFactory.add('lineHeight', locale => {
			const dropdownView = createDropdown(locale)
			addListToDropdown(dropdownView, _prepareListOptions(options, command))

			// Create dropdown model.
			dropdownView.buttonView.set({
				// label: 'Zeilenhöhe',
				label: t('Line Height'),
				icon: editor.config.get( 'lineHeight.icon' ) || '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24"><path fill="#000000" d="M10,13H22V11H10M10,19H22V17H10M10,7H22V5H10M6,7H8.5L5,3.5L1.5,7H4V17H1.5L5,20.5L8.5,17H6V7Z" /></svg>',
				tooltip: true
			})

			dropdownView.extendTemplate({
				attributes: {
					class: [
						'p0thi-ckeditor5-lineHeight-dropdown'
					]
				}
			})

			dropdownView.bind('isEnabled').to(command)

			// Execute command when an item from the dropdown is selected.
			this.listenTo(dropdownView, 'execute', evt => {
				editor.execute(evt.source.commandName, { value: evt.source.commandParam })
				editor.editing.view.focus()
			})

			return dropdownView
		})
	}

	_getLocalizedOptions() {
		const editor = this.editor
		const t = editor.t

		const localizedTitles = {
			// Default: 'Standard'
			Default: t('Default')
		}

		const options = normalizeOptions( editor.config.get('lineHeight.options').filter( option => isSupported( option ) ) )

		return options.map(option => {
			const title = localizedTitles[option.title]

			if (title && title != option.title) {
				// Clone the option to avoid altering the original `namedPresets` from `./utils.js`.
				option = Object.assign({}, option, { title })
			}

			return option
		})
	}
}

function _prepareListOptions(options, command) {
	const itemDefinitions = new Collection()

	for (const option of options) {
		const def = {
			type: 'button',
			model: new Model({
				commandName: 'lineHeight',
				commandParam: option.model,
				label: option.title,
				class: 'p0thi-ckeditor5-lineHeight-dropdown',
				withText: true
			})
		}

		if (option.view && option.view.classes) {
			def.model.set('class', `${def.model.class} ${option.view.classes}`)
		}

		def.model.bind('isOn').to(command, 'value', value => {
			const newValue = value ? parseFloat(value) : value
			return newValue === option.model
		})

		// Add the option to the collection.
		itemDefinitions.add(def)
	}

	return itemDefinitions
}