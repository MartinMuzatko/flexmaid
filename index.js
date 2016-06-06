import 'riot'
var noUiSlider = require('nouislider')

import './tags/app.html'
import './tags/breakpoint.html'

import './less/main.less'

riot.mixin('noUiSlider', {noUiSlider:noUiSlider}, true)
riot.mount('*')
