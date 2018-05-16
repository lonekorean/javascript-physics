function initChamfers() {
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

    // no chamfer
    Matter.World.add(engine.world, Matter.Bodies.rectangle(150, 250, 100, 200, {
        angle: Math.PI * 0.25,
        render: {
            fillStyle: '#228be6'
        }
    }));

    // some chamfer
    Matter.World.add(engine.world, Matter.Bodies.rectangle(400, 250, 100, 200, {
        chamfer: { radius: 25 },
        angle: Math.PI * 0.25,
        render: {
            fillStyle: '#7950f2'
        }
    }));

    // much chamfer
    Matter.World.add(engine.world, Matter.Bodies.rectangle(650, 250, 100, 200, {
        chamfer: { radius: 50 },
        angle: Math.PI * 0.25,
        render: {
            fillStyle: '#e64980'
        }
    }));

    Matter.World.add(engine.world, Matter.MouseConstraint.create(engine, {
        mouse: Matter.Mouse.create(render.canvas),
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    }));

    // for Matter Tools
    return {
        engine: engine,
        render: render,
        canvas: render.canvas,
        runner: runner,
        
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
}
