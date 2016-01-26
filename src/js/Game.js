var Game = {

    VERSION: '0.0.1',

    state: 'run', // Current stage of the game e.g. 'run'|'pause'

    /**
     * (Default) options for the game. Some settings might be overridden by the
     * settings in localStorage.
     */
    settings: {
        /**
         * Resolution where the game is original build for. Used to calculate
         * the new resolution on different devices.
         */
        width: 1280,
        height: 720,
        sound: true,
        music: true,
        particles: false
    },

    camera: {},
    renderer: {},

    scenes: {
        game: {
            scene: {},
            objects: []
        }
    },

    /**
     * List with all objects
     */
    elements: [],

    init: function () {

        var camera = new THREE.PerspectiveCamera(75, this.settings.width / this.settings.height, .1, 500);
        camera.position.z = 5;
        var renderer = new THREE.WebGLRenderer();
        var sceneGame = new THREE.Scene();
        this.scenes.game.scene = sceneGame;

        document.body.appendChild(renderer.domElement);

        this.camera = camera;
        this.renderer = renderer;

        this.resize();
        this.update();
        window.addEventListener('resize', this.resize.bind(this));

    },

    /**
     * Callback when screen resolution or orientation changed. Keeps the
     * original aspect ratio and resized and position the canvas.
     */
    resize: function () {

        this.settings.width = window.innerWidth;
        this.settings.height = window.innerHeight;
        this.renderer.setSize(this.settings.width, this.settings.height, true);
        this.camera.aspect = this.settings.width / this.settings.height;

    },

    /**
     * The absolute main render. Requests another animation frame and execture
     * the current this.state() function.
     * @param time
     */
    update: function (time) {

        requestAnimationFrame(this.update.bind(this));
        this[this.state](time);

    },

    run: function (time) {

        this.renderer.render (this.scenes.game.scene, this.camera);

        for (var i = 0; i < this.scenes.game.objects.length; i++) {
            var object = this.scenes.game.objects[i];
            object.update();
        }

    }

};