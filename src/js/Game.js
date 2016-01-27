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

    assets: {
        walrus: {
            name: 'walrus',
            type: 'obj',
            file: 'assets/players/Walrus.obj',
            object: {}
        },
        walrusTexture: {
            name: 'walrusTexture',
            type: 'texture',
            file: 'assets/players/Walrus.png',
            object: {}
        }
    },

    /**
     * List with all objects
     */
    elements: [],

    init: function (callback) {

        var camera = new THREE.PerspectiveCamera(75, this.settings.width / this.settings.height, .1, 500);
        var renderer = new THREE.WebGLRenderer();
        var sceneGame = new THREE.Scene();
        this.scenes.game.scene = sceneGame;

        document.body.appendChild(renderer.domElement);

        this.camera = camera;
        this.renderer = renderer;

        this.resize();
        this.update();
        window.addEventListener('resize', this.resize.bind(this));

        var manager = new THREE.LoadingManager(callback);
        for (var key in this.assets) {
            var asset = this.assets[key];
            switch (asset.type) {
                case 'obj':
                    var loader = new THREE.OBJLoader( manager );
                    loader.load(asset.file, function ( object ) {
                        this.object = object;
                    }.bind(asset));
                break;
                case 'texture':
                    var loader = new THREE.ImageLoader( manager );
                    loader.load(asset.file, function ( image ) {
                        this.object = new THREE.Texture();
                        this.object.image = image;
                        this.object.needsUpdate = true;
                    }.bind(asset));
                break;
            }
        }

        //manager.onLoad = Game.Levels.level1;

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
        this.camera.updateProjectionMatrix();

    },

    resetScene: function(scene) {

        scene = scene || 'game';

        for (var i = 0; i < this.scenes[scene].objects.length; i++) {
            var element = this.scenes[scene].objects[i];
            element.remove();
        }

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