function initCustomShapes() {
    // vertices that define the concave shape
    // similar to SVG paths, it's a list of space-separated x/y coordinates
    // DON'T FORGET: add poly-decomp.js to the page
    const CONCAVE_PATH = '0 0 100 50 200 0 200 200 100 150 0 200 0 0';

    function wall(x, y, width, height) {
        return Matter.Bodies.rectangle(x, y, width, height, {
            isStatic: true,
            render: {
                fillStyle: '#868e96'
            }
        });
    }

    function concave(x, y, color) {
        let vertices = Matter.Vertices.fromPath(CONCAVE_PATH);
        return Matter.Bodies.fromVertices(x, y, vertices, {
            isStatic: false,
            render: {
                fillStyle: color,

                // add stroke and line width to fill in slight gaps between fragments
                strokeStyle: color,
                lineWidth: 1
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

    Matter.World.add(engine.world, concave(150, 200, '#7950f2'));
    Matter.World.add(engine.world, concave(400, 200, '#15aabf'));
    Matter.World.add(engine.world, concave(650, 200, '#fab005'));

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
