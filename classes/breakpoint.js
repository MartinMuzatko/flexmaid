export default class Breakpoint {
    constructor(label, pixel, visible = true, selected = false) {
        this.label = label
        this.pixel = pixel
        this.visible = visible
        this.selected = selected
    }

    setLabel(label) {
        this.label = label
    }

    setPixel(pixel) {
        this.pixel = pixel
    }

    show() {
        this.visible = true
    }

    hide() {
        this.visible = false
    }
}
