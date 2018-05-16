MatterTools.Demo.create({
    appendTo: document.body,
    toolbar: {
        exampleSelect: true,
        reset: true,
        fullscreen: true
    },
    examples: [
        {
            id: 'chamfers',
            name: 'Chamfers',
            init: initChamfers,
        }, {
            id: 'custom-shapes',
            name: 'Custom Shapes',
            init: initCustomShapes
        }, {
            id: 'composites',
            name: 'Composites',
            init: initComposites
        }, {
            id: 'constraints',
            name: 'Constraints',
            init: initConstraints
        }, {
            id: 'collision-filters',
            name: 'Collision Filters',
            init: initCollisionFilters
        }, {
            id: 'attractors',
            name: 'Attractors',
            init: initAttractors
        }
    ]
});
