/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Couchfriends
 * www.couchfriends.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

Game.Levels = {


    level1: function () {

        /**
         * Grid.
         * x, y
         * 0 = open
         * 1 = brick
         * 2 = crate
         */
        var grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 1],
            [1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1],
            [1, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        Game.resetScene();

        var centerX = (grid[0].length / 2) - .5;
        var centerY = (grid.length / 2) + .5;

        var ambientLight = new Game.Element();
        ambientLight.object = new THREE.AmbientLight( 0x404040 );
        ambientLight.add();

        var sunLight = new Game.Element();
        sunLight.object = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        sunLight.object.position.x = centerX;
        sunLight.object.position.y = centerY;
        sunLight.add();

        var spotLight = new Game.Element();
        spotLight.object = new THREE.DirectionalLight( 0xffffff, 1 );
        spotLight.object.color.setHSL( 0.1, 1, 0.95 );
        spotLight.object.position.x = centerX;
        spotLight.object.position.y = centerY;
        spotLight.object.position.z = 5;
        spotLight.add();

        var floor = new Game.Element();

        var texture = THREE.ImageUtils.loadTexture( 'assets/blocks/floor.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 4, 4 );

        var geometry = new THREE.PlaneGeometry( grid[0].length + 11, grid.length + 6 );
        var material =  new THREE.MeshLambertMaterial( { map: texture } );
        var object = new THREE.Mesh( geometry, material );
        object.position.x = centerX;
        object.position.y = centerY;
        object.position.z = -.5;
        floor.object = object;
        floor.add();

        Game.camera.up = new THREE.Vector3(0,0,1);
        Game.camera.position.x = centerX;
        Game.camera.position.y = centerY-1;
        Game.camera.position.z = 8;

        var player = new Game.Player();
        player.init();
        player.add();

        for (var y = 0; y < grid.length; y++) {
            var xRow = grid[y];
            for (var x = 0; x < xRow.length; x++) {
                var tile = grid[y][x];
                if (tile == 0) {
                    continue;
                }
                if (tile == 1) {

                    var block = new Game.BlockStone();

                }
                else if (tile == 2) {

                    var block = new Game.BlockCrate();

                }

                block.init();
                block.object.position.x = x;
                block.object.position.y = y;
                block.add();

            }
        }

    }

};