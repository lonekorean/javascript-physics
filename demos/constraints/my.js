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
        width: 800,
        height: 500,
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
    wall(400, 0, 800, 20),   // top
    wall(400, 500, 800, 20), // bottom
    wall(0, 250, 20, 500),   // left
    wall(800, 250, 20, 500), // right
]);

// rigid constraint
let rigid1 = Matter.Bodies.circle(150, 160, 30, {
    isStatic: true,
    render: {
        fillStyle: '#868e96'
    }
});
let rigid2 = Matter.Bodies.circle(150, 340, 30, {
    render: {
        fillStyle: '#228be6'
    }
});
let rigidConstraint = Matter.Constraint.create({
    bodyA: rigid1,
    bodyB: rigid2,
    render: {
        lineWidth: 3,
        strokeStyle: '#212529',
    }
});
Matter.World.add(engine.world, [rigid1, rigid2, rigidConstraint]);

// springy constraint
let springy1 = Matter.Bodies.circle(400, 160, 30, {
    isStatic: true,
    render: {
        fillStyle: '#868e96'
    }
});
let springy2 = Matter.Bodies.circle(400, 340, 30, {
    render: {
        fillStyle: '#e64980'
    }
});
let springyConstraint = Matter.Constraint.create({
    bodyA: springy1,
    bodyB: springy2,
    stiffness: 0.01,
    render: {
        lineWidth: 3,
        strokeStyle: '#212529',
    }
});
Matter.World.add(engine.world, [springy1, springy2, springyConstraint]);

// hinge constraint
hingeFilterGroup = Matter.Body.nextGroup(true);
let hinge1 = Matter.Bodies.circle(650, 160, 30, {
    isStatic: true,
    render: {
        fillStyle: '#868e96'
    },
    collisionFilter: { group: hingeFilterGroup }
});
let hinge2 = Matter.Bodies.rectangle(650, 210, 30, 250, {
    render: {
        fillStyle: '#12b886'
    },
    collisionFilter: { group: hingeFilterGroup }
});
let hingeConstraint = Matter.Constraint.create({
    bodyA: hinge1,
    bodyB: hinge2,
    pointB: { x: 0, y: -50 },
    render: {
        lineWidth: 3,
        strokeStyle: '#212529',
    }
});
Matter.World.add(engine.world, [hinge1, hinge2, hingeConstraint]);

// give things a little push
Matter.Body.setVelocity(rigid2, { x: -5, y: 0 });
Matter.Body.setVelocity(springy2, { x: 5, y: 20 });
Matter.Body.setVelocity(hinge2, { x: 10, y: 0 });


Matter.World.add(engine.world, Matter.MouseConstraint.create(engine, {
    mouse: Matter.Mouse.create(render.canvas),
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
}));
