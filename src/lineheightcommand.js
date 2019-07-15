import Command from '@ckeditor/ckeditor5-core/src/command'
import first from '@ckeditor/ckeditor5-utils/src/first'
// import { isDefault } from './utils'

const LINE_HEIGHT = 'lineHeight'

export default class LineHeightCommand extends Command {
    refresh() {
        const firstBlock = first( this.editor.model.document.selection.getSelectedBlocks() )

        this.isEnabled = !!firstBlock && this._canSetLineHeight( firstBlock )

        this.value = ( this.isEnabled && firstBlock.hasAttribute( LINE_HEIGHT ) ) ? firstBlock.getAttribute( LINE_HEIGHT ) : '1'
    }

    execute ( options = {} ) {
        const editor = this.editor
        const model = editor.model
        const doc = model.document

        console.log(model.schema.getDefinitions())

        // const value = '0'
        const value = options.value

        model.change( writer => {
            const blocks = Array.from( doc.selection.getSelectedBlocks() ).filter( block => this._canSetLineHeight( block ) )
            const currentLineHeight = blocks[0].getAttribute( LINE_HEIGHT )

            const removeLineHeight = /* isDefault( value ) ||  */currentLineHeight === value || typeof value === 'undefined'

            console.log(value, currentLineHeight === value, typeof value === 'undefined')

            if ( removeLineHeight ) {
                removeLineHeightFromSelection( blocks, writer )
            }
            else {
                setLineHeightOnSelection( blocks, writer, value )
            }
        } )
    }

    _canSetLineHeight( block ) {
        return this.editor.model.schema.checkAttribute( block, LINE_HEIGHT )
    }
}

function removeLineHeightFromSelection( blocks, writer ) {
    for (const block of blocks ) {
        console.log('removing')
        writer.removeAttribute( LINE_HEIGHT, block )
    }
}

function setLineHeightOnSelection( blocks, writer, lineHeight ) {
    for (const block of blocks ) {
        console.log('setting', block, lineHeight)
        writer.setAttribute( LINE_HEIGHT, lineHeight, block )
    }
}