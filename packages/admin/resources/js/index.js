import Chart from 'chart.js/auto'
import Collapse from '@alpinejs/collapse'
import Focus from '@alpinejs/focus'
import Mousetrap from '@danharrin/alpine-mousetrap'
import Persist from '@alpinejs/persist'
import Tooltip from '@ryangjchandler/alpine-tooltip'

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(Collapse)
    window.Alpine.plugin(Focus)
    window.Alpine.plugin(Mousetrap)
    window.Alpine.plugin(Persist)
    window.Alpine.plugin(Tooltip)

    window.Alpine.store('sidebar', {
        isOpen: window.Alpine.$persist(true).as('isOpen'),

        collapsedGroups: window.Alpine.$persist([]).as('collapsedGroups'),

        groupIsCollapsed: function (group) {
            return this.collapsedGroups.includes(group)
        },

        collapseGroup: function (group) {
            if (this.collapsedGroups.includes(group)) {
                return
            }

            this.collapsedGroups = this.collapsedGroups.concat(group)
        },

        toggleCollapsedGroup: function (group) {
            this.collapsedGroups = this.collapsedGroups.includes(group)
                ? this.collapsedGroups.filter(
                      (collapsedGroup) => collapsedGroup !== group,
                  )
                : this.collapsedGroups.concat(group)
        },

        close: function () {
            this.isOpen = false
        },

        open: function () {
            this.isOpen = true
        },
    })

    window.Alpine.store(
        'theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
    )

    window.addEventListener('dark-mode-toggled', (event) => {
        window.Alpine.store('theme', event.detail)
    })

    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
            window.Alpine.store('theme', event.matches ? 'dark' : 'light')
        })
})

Chart.defaults.font.family = `'DM Sans', sans-serif`
Chart.defaults.color = '#6b7280'

window.Chart = Chart