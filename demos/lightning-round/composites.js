function initComposites() {
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

    // adjacent composite
    let adjacent1 = Matter.Bodies.rectangle(150, 200, 100, 100, {
        render: {
            fillStyle: '#228be6'
        }
    });
    let adjacent2 = Matter.Bodies.rectangle(150, 300, 100, 100, {
        render: {
            fillStyle: '#fa5252'
        }
    });
    let adjacentComposite = Matter.Body.create({
        parts: [adjacent1, adjacent2]
    });
    Matter.World.add(engine.world, adjacentComposite);

    // overlapping composite
    let overlapping1 = Matter.Bodies.circle(400, 250, 80, {
        render: {
            fillStyle: '#12b886'
        }
    });
    let overlapping2 = Matter.Bodies.rectangle(400, 250, 60, 280, {
        render: {
            fillStyle: '#7950f2'
        }
    });
    let overlappingComposite = Matter.Body.create({
        parts: [overlapping1, overlapping2]
    });
    Matter.World.add(engine.world, overlappingComposite);

    // separated composite
    let separated1 = Matter.Bodies.circle(650, 210, 30, {
        render: {
            fillStyle: '#15aabf'
        }
    });
    let separated2 = Matter.Bodies.circle(570, 290, 30, {
        render: {
            fillStyle: '#e64980'
        }
    });
    let separated3 = Matter.Bodies.circle(730, 290, 30, {
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
