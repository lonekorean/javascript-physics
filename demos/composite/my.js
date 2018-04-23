function wall(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: '#868e96'
        }
    });
}

// engine
let engine = Matter.Engine.create();

// render
let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: '#f8f9fa'
    }
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// boundary walls
Matter.World.add(engine.world, [
    wall(300, 0, 600, 20),   // top
    wall(300, 400, 600, 20), // bottom
    wall(0, 200, 20, 400),   // left
    wall(600, 200, 20, 400), // right
]);

// adjacent composite
let adjacent1 = Matter.Bodies.rectangle(120, 150, 100, 100, {
    render: {
        fillStyle: '#228be6'
    }
});
let adjacent2 = Matter.Bodies.rectangle(120, 250, 100, 100, {
    render: {
        fillStyle: '#fa5252'
    }
});
let adjacentComposite = Matter.Body.create({
    parts: [adjacent1, adjacent2]
});
Matter.World.add(engine.world, adjacentComposite);

// overlapping composite
let overlapping1 = Matter.Bodies.circle(300, 200, 60, {
    render: {
        fillStyle: '#12b886'
    }
});
let overlapping2 = Matter.Bodies.rectangle(300, 200, 40, 240, {
    render: {
        fillStyle: '#7950f2'
    }
});
let overlappingComposite = Matter.Body.create({
    parts: [overlapping1, overlapping2]
});
Matter.World.add(engine.world, overlappingComposite);

// separated composite
let separated1 = Matter.Bodies.circle(480, 150, 20, {
    render: {
        fillStyle: '#15aabf'
    }
});
let separated2 = Matter.Bodies.circle(420, 200, 20, {
    render: {
        fillStyle: '#e64980'
    }
});
let separated3 = Matter.Bodies.circle(540, 200, 20, {
    render: {
        fillStyle: '#fab005'
    }
});
let separatedComposite = Matter.Body.create({
    parts: [separated1, separated2, separated3]
});
Matter.World.add(engine.world, separatedComposite);



Matter.World.add(engine.world, Matter.MouseConstraint.create(engine, {
    mouse: Matter.Mouse.create(render.canvas),
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
}));
