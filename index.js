import 'riot'
var nouislider = require('nouislider')

import './tags/app.html'
import './tags/breakpoint.html'

import './less/main.less'

riot.mixin('nouislider', {nouislider:nouislider}, true)
riot.mount('*')
