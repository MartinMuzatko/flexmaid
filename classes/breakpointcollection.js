import Breakpoint from './breakpoint'

export default class BreakpointCollection {
    constructor(breakpoints=[]) {
        this.breakpoints = breakpoints
    }

    add(breakpoint) {
        var hidden = this.getHidden()
        if (hidden) {
            breakpoint = hidden
        }

        breakpoint.label = ''
        var pixel = breakpoint.pixel
        if (this.getEquallyLabeledItems(breakpoint).length == 1) {
            var breakpointPushIndex = 0
            this.breakpoints.filter((item, index) => {
                if (pixel >= item.pixel) {
                    breakpointPushIndex = index + 1
                }
            })

            var newBreakpoint = new Breakpoint('', 320, false, true)
            this.breakpoints.splice(breakpointPushIndex, 0, newBreakpoint)
            breakpoint.show()
            this.select(newBreakpoint)
            return newBreakpoint
        }
        return false
    }

    getEquallyLabeledItems(breakpoint) {
        return this.breakpoints.filter(item => {
            return item.label === breakpoint.label
        })
    }

    select(breakpoint) {
        this.breakpoints.map(function(bp){
            bp.selected = bp.label == breakpoint.label ? true : false
        })
    }

    getHidden(breakpoint) {
        return this.breakpoints.filter((breakpoint) => {
            return !breakpoint.visible
        })[0]
    }

    getSelected() {
        return this.breakpoints.filter((breakpoint) => {
            return breakpoint.selected
        })[0]
    }
}
