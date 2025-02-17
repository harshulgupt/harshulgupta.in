FSS = {
    FRONT:0,
    BACK:1,
    DOUBLE:2,
    SVGNS:"http://www.w3.org/2000/svg"
};

FSS.Array = typeof Float32Array === "function" ? Float32Array :Array;

FSS.Utils = {
    isNumber:function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
};

(function() {
    var lastTime = 0;
    var vendors = [ "ms", "moz", "webkit", "o" ];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currentTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currentTime + timeToCall);
            }, timeToCall);
            lastTime = currentTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

Math.PIM2 = Math.PI * 2;

Math.PID2 = Math.PI / 2;

Math.randomInRange = function(min, max) {
    return min + (max - min) * Math.random();
};

Math.clamp = function(value, min, max) {
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
};

FSS.Vector3 = {
    create:function(x, y, z) {
        var vector = new FSS.Array(3);
        this.set(vector, x, y, z);
        return vector;
    },
    clone:function(a) {
        var vector = this.create();
        this.copy(vector, a);
        return vector;
    },
    set:function(target, x, y, z) {
        target[0] = x || 0;
        target[1] = y || 0;
        target[2] = z || 0;
        return this;
    },
    setX:function(target, x) {
        target[0] = x || 0;
        return this;
    },
    setY:function(target, y) {
        target[1] = y || 0;
        return this;
    },
    setZ:function(target, z) {
        target[2] = z || 0;
        return this;
    },
    copy:function(target, a) {
        target[0] = a[0];
        target[1] = a[1];
        target[2] = a[2];
        return this;
    },
    add:function(target, a) {
        target[0] += a[0];
        target[1] += a[1];
        target[2] += a[2];
        return this;
    },
    addVectors:function(target, a, b) {
        target[0] = a[0] + b[0];
        target[1] = a[1] + b[1];
        target[2] = a[2] + b[2];
        return this;
    },
    addScalar:function(target, s) {
        target[0] += s;
        target[1] += s;
        target[2] += s;
        return this;
    },
    subtract:function(target, a) {
        target[0] -= a[0];
        target[1] -= a[1];
        target[2] -= a[2];
        return this;
    },
    subtractVectors:function(target, a, b) {
        target[0] = a[0] - b[0];
        target[1] = a[1] - b[1];
        target[2] = a[2] - b[2];
        return this;
    },
    subtractScalar:function(target, s) {
        target[0] -= s;
        target[1] -= s;
        target[2] -= s;
        return this;
    },
    multiply:function(target, a) {
        target[0] *= a[0];
        target[1] *= a[1];
        target[2] *= a[2];
        return this;
    },
    multiplyVectors:function(target, a, b) {
        target[0] = a[0] * b[0];
        target[1] = a[1] * b[1];
        target[2] = a[2] * b[2];
        return this;
    },
    multiplyScalar:function(target, s) {
        target[0] *= s;
        target[1] *= s;
        target[2] *= s;
        return this;
    },
    divide:function(target, a) {
        target[0] /= a[0];
        target[1] /= a[1];
        target[2] /= a[2];
        return this;
    },
    divideVectors:function(target, a, b) {
        target[0] = a[0] / b[0];
        target[1] = a[1] / b[1];
        target[2] = a[2] / b[2];
        return this;
    },
    divideScalar:function(target, s) {
        if (s !== 0) {
            target[0] /= s;
            target[1] /= s;
            target[2] /= s;
        } else {
            target[0] = 0;
            target[1] = 0;
            target[2] = 0;
        }
        return this;
    },
    cross:function(target, a) {
        var x = target[0];
        var y = target[1];
        var z = target[2];
        target[0] = y * a[2] - z * a[1];
        target[1] = z * a[0] - x * a[2];
        target[2] = x * a[1] - y * a[0];
        return this;
    },
    crossVectors:function(target, a, b) {
        target[0] = a[1] * b[2] - a[2] * b[1];
        target[1] = a[2] * b[0] - a[0] * b[2];
        target[2] = a[0] * b[1] - a[1] * b[0];
        return this;
    },
    min:function(target, value) {
        if (target[0] < value) {
            target[0] = value;
        }
        if (target[1] < value) {
            target[1] = value;
        }
        if (target[2] < value) {
            target[2] = value;
        }
        return this;
    },
    max:function(target, value) {
        if (target[0] > value) {
            target[0] = value;
        }
        if (target[1] > value) {
            target[1] = value;
        }
        if (target[2] > value) {
            target[2] = value;
        }
        return this;
    },
    clamp:function(target, min, max) {
        this.min(target, min);
        this.max(target, max);
        return this;
    },
    limit:function(target, min, max) {
        var length = this.length(target);
        if (min !== null && length < min) {
            this.setLength(target, min);
        } else if (max !== null && length > max) {
            this.setLength(target, max);
        }
        return this;
    },
    dot:function(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    },
    normalise:function(target) {
        return this.divideScalar(target, this.length(target));
    },
    negate:function(target) {
        return this.multiplyScalar(target, -1);
    },
    distanceSquared:function(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        var dz = a[2] - b[2];
        return dx * dx + dy * dy + dz * dz;
    },
    distance:function(a, b) {
        return Math.sqrt(this.distanceSquared(a, b));
    },
    lengthSquared:function(a) {
        return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    },
    length:function(a) {
        return Math.sqrt(this.lengthSquared(a));
    },
    setLength:function(target, l) {
        var length = this.length(target);
        if (length !== 0 && l !== length) {
            this.multiplyScalar(target, l / length);
        }
        return this;
    }
};

FSS.Vector4 = {
    create:function(x, y, z, w) {
        var vector = new FSS.Array(4);
        this.set(vector, x, y, z);
        return vector;
    },
    set:function(target, x, y, z, w) {
        target[0] = x || 0;
        target[1] = y || 0;
        target[2] = z || 0;
        target[3] = w || 0;
        return this;
    },
    setX:function(target, x) {
        target[0] = x || 0;
        return this;
    },
    setY:function(target, y) {
        target[1] = y || 0;
        return this;
    },
    setZ:function(target, z) {
        target[2] = z || 0;
        return this;
    },
    setW:function(target, w) {
        target[3] = w || 0;
        return this;
    },
    add:function(target, a) {
        target[0] += a[0];
        target[1] += a[1];
        target[2] += a[2];
        target[3] += a[3];
        return this;
    },
    multiplyVectors:function(target, a, b) {
        target[0] = a[0] * b[0];
        target[1] = a[1] * b[1];
        target[2] = a[2] * b[2];
        target[3] = a[3] * b[3];
        return this;
    },
    multiplyScalar:function(target, s) {
        target[0] *= s;
        target[1] *= s;
        target[2] *= s;
        target[3] *= s;
        return this;
    },
    min:function(target, value) {
        if (target[0] < value) {
            target[0] = value;
        }
        if (target[1] < value) {
            target[1] = value;
        }
        if (target[2] < value) {
            target[2] = value;
        }
        if (target[3] < value) {
            target[3] = value;
        }
        return this;
    },
    max:function(target, value) {
        if (target[0] > value) {
            target[0] = value;
        }
        if (target[1] > value) {
            target[1] = value;
        }
        if (target[2] > value) {
            target[2] = value;
        }
        if (target[3] > value) {
            target[3] = value;
        }
        return this;
    },
    clamp:function(target, min, max) {
        this.min(target, min);
        this.max(target, max);
        return this;
    }
};

FSS.Color = function(hex, opacity) {
    this.rgba = FSS.Vector4.create();
    this.hex = hex || "#000000";
    this.opacity = FSS.Utils.isNumber(opacity) ? opacity :1;
    this.set(this.hex, this.opacity);
};

FSS.Color.prototype = {
    set:function(hex, opacity) {
        hex = hex.replace("#", "");
        var size = hex.length / 3;
        this.rgba[0] = parseInt(hex.substring(size * 0, size * 1), 16) / 255;
        this.rgba[1] = parseInt(hex.substring(size * 1, size * 2), 16) / 255;
        this.rgba[2] = parseInt(hex.substring(size * 2, size * 3), 16) / 255;
        this.rgba[3] = FSS.Utils.isNumber(opacity) ? opacity :this.rgba[3];
        return this;
    },
    hexify:function(channel) {
        var hex = Math.ceil(channel * 255).toString(16);
        if (hex.length === 1) {
            hex = "0" + hex;
        }
        return hex;
    },
    format:function() {
        var r = this.hexify(this.rgba[0]);
        var g = this.hexify(this.rgba[1]);
        var b = this.hexify(this.rgba[2]);
        this.hex = "#" + r + g + b;
        return this.hex;
    }
};

FSS.Object = function() {
    this.position = FSS.Vector3.create();
};

FSS.Object.prototype = {
    setPosition:function(x, y, z) {
        FSS.Vector3.set(this.position, x, y, z);
        return this;
    }
};

FSS.Light = function(ambient, diffuse) {
    FSS.Object.call(this);
    this.ambient = new FSS.Color(ambient || "#FFFFFF");
    this.diffuse = new FSS.Color(diffuse || "#FFFFFF");
    this.ray = FSS.Vector3.create();
};

FSS.Light.prototype = Object.create(FSS.Object.prototype);

FSS.Vertex = function(x, y, z) {
    this.position = FSS.Vector3.create(x, y, z);
};

FSS.Vertex.prototype = {
    setPosition:function(x, y, z) {
        FSS.Vector3.set(this.position, x, y, z);
        return this;
    }
};

FSS.Triangle = function(a, b, c) {
    this.a = a || new FSS.Vertex();
    this.b = b || new FSS.Vertex();
    this.c = c || new FSS.Vertex();
    this.vertices = [ this.a, this.b, this.c ];
    this.u = FSS.Vector3.create();
    this.v = FSS.Vector3.create();
    this.centroid = FSS.Vector3.create();
    this.normal = FSS.Vector3.create();
    this.color = new FSS.Color();
    this.polygon = document.createElementNS(FSS.SVGNS, "polygon");
    this.polygon.setAttributeNS(null, "stroke-linejoin", "round");
    this.polygon.setAttributeNS(null, "stroke-miterlimit", "1");
    this.polygon.setAttributeNS(null, "stroke-width", "1");
    this.computeCentroid();
    this.computeNormal();
};

FSS.Triangle.prototype = {
    computeCentroid:function() {
        this.centroid[0] = this.a.position[0] + this.b.position[0] + this.c.position[0];
        this.centroid[1] = this.a.position[1] + this.b.position[1] + this.c.position[1];
        this.centroid[2] = this.a.position[2] + this.b.position[2] + this.c.position[2];
        FSS.Vector3.divideScalar(this.centroid, 3);
        return this;
    },
    computeNormal:function() {
        FSS.Vector3.subtractVectors(this.u, this.b.position, this.a.position);
        FSS.Vector3.subtractVectors(this.v, this.c.position, this.a.position);
        FSS.Vector3.crossVectors(this.normal, this.u, this.v);
        FSS.Vector3.normalise(this.normal);
        return this;
    }
};

FSS.Geometry = function() {
    this.vertices = [];
    this.triangles = [];
    this.dirty = false;
};

FSS.Geometry.prototype = {
    update:function() {
        if (this.dirty) {
            var t, triangle;
            for (t = this.triangles.length - 1; t >= 0; t--) {
                triangle = this.triangles[t];
                triangle.computeCentroid();
                triangle.computeNormal();
            }
            this.dirty = false;
        }
        return this;
    }
};

FSS.Plane = function(width, height, segments, slices) {
    FSS.Geometry.call(this);
    this.width = width || 100;
    this.height = height || 100;
    this.segments = segments || 4;
    this.slices = slices || 4;
    this.segmentWidth = this.width / this.segments;
    this.sliceHeight = this.height / this.slices;
    var x, y, v0, v1, v2, v3, vertex, triangle, vertices = [], offsetX = this.width * -.5, offsetY = this.height * .5;
    for (x = 0; x <= this.segments; x++) {
        vertices.push([]);
        for (y = 0; y <= this.slices; y++) {
            vertex = new FSS.Vertex(offsetX + x * this.segmentWidth, offsetY - y * this.sliceHeight);
            vertices[x].push(vertex);
            this.vertices.push(vertex);
        }
    }
    for (x = 0; x < this.segments; x++) {
        for (y = 0; y < this.slices; y++) {
            v0 = vertices[x + 0][y + 0];
            v1 = vertices[x + 0][y + 1];
            v2 = vertices[x + 1][y + 0];
            v3 = vertices[x + 1][y + 1];
            t0 = new FSS.Triangle(v0, v1, v2);
            t1 = new FSS.Triangle(v2, v1, v3);
            this.triangles.push(t0, t1);
        }
    }
};

FSS.Plane.prototype = Object.create(FSS.Geometry.prototype);

FSS.Material = function(ambient, diffuse) {
    this.ambient = new FSS.Color(ambient || "#444444");
    this.diffuse = new FSS.Color(diffuse || "#FFFFFF");
    this.slave = new FSS.Color();
};

FSS.Mesh = function(geometry, material) {
    FSS.Object.call(this);
    this.geometry = geometry || new FSS.Geometry();
    this.material = material || new FSS.Material();
    this.side = FSS.FRONT;
    this.visible = true;
};

FSS.Mesh.prototype = Object.create(FSS.Object.prototype);

FSS.Mesh.prototype.update = function(lights, calculate) {
    var t, triangle, l, light, illuminance;
    this.geometry.update();
    if (calculate) {
        for (t = this.geometry.triangles.length - 1; t >= 0; t--) {
            triangle = this.geometry.triangles[t];
            FSS.Vector4.set(triangle.color.rgba);
            for (l = lights.length - 1; l >= 0; l--) {
                light = lights[l];
                FSS.Vector3.subtractVectors(light.ray, light.position, triangle.centroid);
                FSS.Vector3.normalise(light.ray);
                illuminance = FSS.Vector3.dot(triangle.normal, light.ray);
                if (this.side === FSS.FRONT) {
                    illuminance = Math.max(illuminance, 0);
                } else if (this.side === FSS.BACK) {
                    illuminance = Math.abs(Math.min(illuminance, 0));
                } else if (this.side === FSS.DOUBLE) {
                    illuminance = Math.max(Math.abs(illuminance), 0);
                }
                FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.ambient.rgba, light.ambient.rgba);
                FSS.Vector4.add(triangle.color.rgba, this.material.slave.rgba);
                FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.diffuse.rgba, light.diffuse.rgba);
                FSS.Vector4.multiplyScalar(this.material.slave.rgba, illuminance);
                FSS.Vector4.add(triangle.color.rgba, this.material.slave.rgba);
            }
            FSS.Vector4.clamp(triangle.color.rgba, 0, 1);
        }
    }
    return this;
};

FSS.Scene = function() {
    this.meshes = [];
    this.lights = [];
};

FSS.Scene.prototype = {
    add:function(object) {
        if (object instanceof FSS.Mesh && !~this.meshes.indexOf(object)) {
            this.meshes.push(object);
        } else if (object instanceof FSS.Light && !~this.lights.indexOf(object)) {
            this.lights.push(object);
        }
        return this;
    },
    remove:function(object) {
        if (object instanceof FSS.Mesh && ~this.meshes.indexOf(object)) {
            this.meshes.splice(this.meshes.indexOf(object), 1);
        } else if (object instanceof FSS.Light && ~this.lights.indexOf(object)) {
            this.lights.splice(this.lights.indexOf(object), 1);
        }
        return this;
    }
};

FSS.Renderer = function() {
    this.width = 0;
    this.height = 0;
    this.halfWidth = 0;
    this.halfHeight = 0;
};

FSS.Renderer.prototype = {
    setSize:function(width, height) {
        if (this.width === width && this.height === height) return;
        this.width = width;
        this.height = height;
        this.halfWidth = this.width * .5;
        this.halfHeight = this.height * .5;
        return this;
    },
    clear:function() {
        return this;
    },
    render:function(scene) {
        return this;
    }
};

FSS.CanvasRenderer = function() {
    FSS.Renderer.call(this);
    this.element = document.createElement("canvas");
    this.element.style.display = "block";
    this.element.setAttribute("id", "myCanvas");
    this.context = this.element.getContext("2d");
    this.setSize(this.element.width, this.element.height);
};

FSS.CanvasRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.CanvasRenderer.prototype.setSize = function(width, height) {
    FSS.Renderer.prototype.setSize.call(this, width, height);
    this.element.width = width;
    this.element.height = height;
    this.context.setTransform(1, 0, 0, -1, this.halfWidth, this.halfHeight);
    return this;
};

FSS.CanvasRenderer.prototype.clear = function() {
    FSS.Renderer.prototype.clear.call(this);
    this.context.clearRect(-this.halfWidth, -this.halfHeight, this.width, this.height);
    return this;
};

FSS.CanvasRenderer.prototype.render = function(scene) {
    FSS.Renderer.prototype.render.call(this, scene);
    var m, mesh, t, triangle, color;
    this.clear();
    this.context.lineJoin = "round";
    this.context.lineWidth = 1;
    for (m = scene.meshes.length - 1; m >= 0; m--) {
        mesh = scene.meshes[m];
        if (mesh.visible) {
            mesh.update(scene.lights, true);
            for (t = mesh.geometry.triangles.length - 1; t >= 0; t--) {
                triangle = mesh.geometry.triangles[t];
                color = triangle.color.format();
                this.context.beginPath();
                this.context.moveTo(triangle.a.position[0], triangle.a.position[1]);
                this.context.lineTo(triangle.b.position[0], triangle.b.position[1]);
                this.context.lineTo(triangle.c.position[0], triangle.c.position[1]);
                this.context.closePath();
                this.context.strokeStyle = color;
                this.context.fillStyle = color;
                this.context.stroke();
                this.context.fill();
            }
        }
    }
    return this;
};

FSS.WebGLRenderer = function() {
    FSS.Renderer.call(this);
    this.element = document.createElement("canvas");
    this.element.style.display = "block";
    this.vertices = null;
    this.lights = null;
    var parameters = {
        preserveDrawingBuffer:false,
        premultipliedAlpha:true,
        antialias:true,
        stencil:true,
        alpha:true
    };
    this.gl = this.getContext(this.element, parameters);
    this.unsupported = !this.gl;
    if (this.unsupported) {
        return "WebGL is not supported by your browser.";
    } else {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.setSize(this.element.width, this.element.height);
    }
};

FSS.WebGLRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.WebGLRenderer.prototype.getContext = function(canvas, parameters) {
    var context = false;
    try {
        if (!(context = canvas.getContext("experimental-webgl", parameters))) {
            throw "Error creating WebGL context.";
        }
    } catch (error) {
        console.error(error);
    }
    return context;
};

FSS.WebGLRenderer.prototype.setSize = function(width, height) {
    FSS.Renderer.prototype.setSize.call(this, width, height);
    if (this.unsupported) return;
    this.element.width = width;
    this.element.height = height;
    this.gl.viewport(0, 0, width, height);
    return this;
};

FSS.WebGLRenderer.prototype.clear = function() {
    FSS.Renderer.prototype.clear.call(this);
    if (this.unsupported) return;
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    return this;
};

FSS.WebGLRenderer.prototype.render = function(scene) {
    FSS.Renderer.prototype.render.call(this, scene);
    if (this.unsupported) return;
    var m, mesh, t, tl, triangle, l, light, attribute, uniform, buffer, data, location, update = false, lights = scene.lights.length, index, v, vl, vetex, vertices = 0;
    this.clear();
    if (this.lights !== lights) {
        this.lights = lights;
        if (this.lights > 0) {
            this.buildProgram(lights);
        } else {
            return;
        }
    }
    if (!!this.program) {
        for (m = scene.meshes.length - 1; m >= 0; m--) {
            mesh = scene.meshes[m];
            if (mesh.geometry.dirty) update = true;
            mesh.update(scene.lights, false);
            vertices += mesh.geometry.triangles.length * 3;
        }
        if (update || this.vertices !== vertices) {
            this.vertices = vertices;
            for (attribute in this.program.attributes) {
                buffer = this.program.attributes[attribute];
                buffer.data = new FSS.Array(vertices * buffer.size);
                index = 0;
                for (m = scene.meshes.length - 1; m >= 0; m--) {
                    mesh = scene.meshes[m];
                    for (t = 0, tl = mesh.geometry.triangles.length; t < tl; t++) {
                        triangle = mesh.geometry.triangles[t];
                        for (v = 0, vl = triangle.vertices.length; v < vl; v++) {
                            vertex = triangle.vertices[v];
                            switch (attribute) {
                              case "side":
                                this.setBufferData(index, buffer, mesh.side);
                                break;

                              case "position":
                                this.setBufferData(index, buffer, vertex.position);
                                break;

                              case "centroid":
                                this.setBufferData(index, buffer, triangle.centroid);
                                break;

                              case "normal":
                                this.setBufferData(index, buffer, triangle.normal);
                                break;

                              case "ambient":
                                this.setBufferData(index, buffer, mesh.material.ambient.rgba);
                                break;

                              case "diffuse":
                                this.setBufferData(index, buffer, mesh.material.diffuse.rgba);
                                break;
                            }
                            index++;
                        }
                    }
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.buffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, buffer.data, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(buffer.location);
                this.gl.vertexAttribPointer(buffer.location, buffer.size, this.gl.FLOAT, false, 0, 0);
            }
        }
        this.setBufferData(0, this.program.uniforms.resolution, [ this.width, this.height, this.width ]);
        for (l = lights - 1; l >= 0; l--) {
            light = scene.lights[l];
            this.setBufferData(l, this.program.uniforms.lightPosition, light.position);
            this.setBufferData(l, this.program.uniforms.lightAmbient, light.ambient.rgba);
            this.setBufferData(l, this.program.uniforms.lightDiffuse, light.diffuse.rgba);
        }
        for (uniform in this.program.uniforms) {
            buffer = this.program.uniforms[uniform];
            location = buffer.location;
            data = buffer.data;
            switch (buffer.structure) {
              case "3f":
                this.gl.uniform3f(location, data[0], data[1], data[2]);
                break;

              case "3fv":
                this.gl.uniform3fv(location, data);
                break;

              case "4fv":
                this.gl.uniform4fv(location, data);
                break;
            }
        }
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices);
    return this;
};

FSS.WebGLRenderer.prototype.setBufferData = function(index, buffer, value) {
    if (FSS.Utils.isNumber(value)) {
        buffer.data[index * buffer.size] = value;
    } else {
        for (var i = value.length - 1; i >= 0; i--) {
            buffer.data[index * buffer.size + i] = value[i];
        }
    }
};

FSS.WebGLRenderer.prototype.buildProgram = function(lights) {
    if (this.unsupported) return;
    var vs = FSS.WebGLRenderer.VS(lights);
    var fs = FSS.WebGLRenderer.FS(lights);
    var code = vs + fs;
    if (!!this.program && this.program.code === code) return;
    var program = this.gl.createProgram();
    var vertexShader = this.buildShader(this.gl.VERTEX_SHADER, vs);
    var fragmentShader = this.buildShader(this.gl.FRAGMENT_SHADER, fs);
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        var error = this.gl.getError();
        var status = this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS);
        console.error("Could not initialise shader.\nVALIDATE_STATUS: " + status + "\nERROR: " + error);
        return null;
    }
    this.gl.deleteShader(fragmentShader);
    this.gl.deleteShader(vertexShader);
    program.code = code;
    program.attributes = {
        side:this.buildBuffer(program, "attribute", "aSide", 1, "f"),
        position:this.buildBuffer(program, "attribute", "aPosition", 3, "v3"),
        centroid:this.buildBuffer(program, "attribute", "aCentroid", 3, "v3"),
        normal:this.buildBuffer(program, "attribute", "aNormal", 3, "v3"),
        ambient:this.buildBuffer(program, "attribute", "aAmbient", 4, "v4"),
        diffuse:this.buildBuffer(program, "attribute", "aDiffuse", 4, "v4")
    };
    program.uniforms = {
        resolution:this.buildBuffer(program, "uniform", "uResolution", 3, "3f", 1),
        lightPosition:this.buildBuffer(program, "uniform", "uLightPosition", 3, "3fv", lights),
        lightAmbient:this.buildBuffer(program, "uniform", "uLightAmbient", 4, "4fv", lights),
        lightDiffuse:this.buildBuffer(program, "uniform", "uLightDiffuse", 4, "4fv", lights)
    };
    this.program = program;
    this.gl.useProgram(this.program);
    return program;
};

FSS.WebGLRenderer.prototype.buildShader = function(type, source) {
    if (this.unsupported) return;
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        console.error(this.gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
};

FSS.WebGLRenderer.prototype.buildBuffer = function(program, type, identifier, size, structure, count) {
    var buffer = {
        buffer:this.gl.createBuffer(),
        size:size,
        structure:structure,
        data:null
    };
    switch (type) {
      case "attribute":
        buffer.location = this.gl.getAttribLocation(program, identifier);
        break;

      case "uniform":
        buffer.location = this.gl.getUniformLocation(program, identifier);
        break;
    }
    if (!!count) {
        buffer.data = new FSS.Array(count * size);
    }
    return buffer;
};

FSS.WebGLRenderer.VS = function(lights) {
    var shader = [ "precision mediump float;", "#define LIGHTS " + lights, "attribute float aSide;", "attribute vec3 aPosition;", "attribute vec3 aCentroid;", "attribute vec3 aNormal;", "attribute vec4 aAmbient;", "attribute vec4 aDiffuse;", "uniform vec3 uResolution;", "uniform vec3 uLightPosition[LIGHTS];", "uniform vec4 uLightAmbient[LIGHTS];", "uniform vec4 uLightDiffuse[LIGHTS];", "varying vec4 vColor;", "void main() {", "vColor = vec4(0.0);", "vec3 position = aPosition / uResolution * 2.0;", "for (int i = 0; i < LIGHTS; i++) {", "vec3 lightPosition = uLightPosition[i];", "vec4 lightAmbient = uLightAmbient[i];", "vec4 lightDiffuse = uLightDiffuse[i];", "vec3 ray = normalize(lightPosition - aCentroid);", "float illuminance = dot(aNormal, ray);", "if (aSide == 0.0) {", "illuminance = max(illuminance, 0.0);", "} else if (aSide == 1.0) {", "illuminance = abs(min(illuminance, 0.0));", "} else if (aSide == 2.0) {", "illuminance = max(abs(illuminance), 0.0);", "}", "vColor += aAmbient * lightAmbient;", "vColor += aDiffuse * lightDiffuse * illuminance;", "}", "vColor = clamp(vColor, 0.0, 1.0);", "gl_Position = vec4(position, 1.0);", "}" ].join("\n");
    return shader;
};

FSS.WebGLRenderer.FS = function(lights) {
    var shader = [ "precision mediump float;", "varying vec4 vColor;", "void main() {", "gl_FragColor = vColor;", "}" ].join("\n");
    return shader;
};

FSS.SVGRenderer = function() {
    FSS.Renderer.call(this);
    this.element = document.createElementNS(FSS.SVGNS, "svg");
    this.element.setAttribute("xmlns", FSS.SVGNS);
    this.element.setAttribute("version", "1.1");
    this.element.style.display = "block";
    this.setSize(300, 150);
};

FSS.SVGRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.SVGRenderer.prototype.setSize = function(width, height) {
    FSS.Renderer.prototype.setSize.call(this, width, height);
    this.element.setAttribute("width", width);
    this.element.setAttribute("height", height);
    return this;
};

FSS.SVGRenderer.prototype.clear = function() {
    FSS.Renderer.prototype.clear.call(this);
    for (var i = this.element.childNodes.length - 1; i >= 0; i--) {
        this.element.removeChild(this.element.childNodes[i]);
    }
    return this;
};

FSS.SVGRenderer.prototype.render = function(scene) {
    FSS.Renderer.prototype.render.call(this, scene);
    var m, mesh, t, triangle, points, style;
    for (m = scene.meshes.length - 1; m >= 0; m--) {
        mesh = scene.meshes[m];
        if (mesh.visible) {
            mesh.update(scene.lights, true);
            for (t = mesh.geometry.triangles.length - 1; t >= 0; t--) {
                triangle = mesh.geometry.triangles[t];
                if (triangle.polygon.parentNode !== this.element) {
                    this.element.appendChild(triangle.polygon);
                }
                points = this.formatPoint(triangle.a) + " ";
                points += this.formatPoint(triangle.b) + " ";
                points += this.formatPoint(triangle.c);
                style = this.formatStyle(triangle.color.format());
                triangle.polygon.setAttributeNS(null, "points", points);
                triangle.polygon.setAttributeNS(null, "style", style);
            }
        }
    }
    return this;
};

FSS.SVGRenderer.prototype.formatPoint = function(vertex) {
    return this.halfWidth + vertex.position[0] + "," + (this.halfHeight - vertex.position[1]);
};

FSS.SVGRenderer.prototype.formatStyle = function(color) {
    var style = "fill:" + color + ";";
    style += "stroke:" + color + ";";
    return style;
};

(function() {
    var MESH = {
        width:.8,
        height:.7,
        depth:12,
        segments:16,
        slices:8,
        xRange:.57,
        yRange:.68,
        zRange:1,
        ambient:"#555555",
        diffuse:"#000000",
        speed:.0014
    };
    var LIGHT = {
        count:2,
        xyScalar:1,
        zOffset:88,
        ambient:"#cc3fad",
        diffuse:"#f7f5f2",
        speed:2e-4,
        gravity:500,
        dampening:.95,
        minLimit:10,
        maxLimit:null,
        minDistance:20,
        maxDistance:400,
        autopilot:true,
        draw:false,
        bounds:FSS.Vector3.create(),
        step:FSS.Vector3.create(Math.randomInRange(.2, 1), Math.randomInRange(.2, 1), Math.randomInRange(.2, 1))
    };
    var RENDER = {
        renderer:"canvas"
    };
    var now, start = Date.now();
    var center = FSS.Vector3.create();
    var attractor = FSS.Vector3.create();
    var container = document.getElementById("container");
    var output = document.getElementById("output");
    var renderer, scene, mesh, geometry, material;
    var canvasRenderer;
    var gui, autopilotController;
    function initialise() {
        createRenderer();
        createScene();
        createMesh();
        createLights();
        addEventListeners();
        resize(container.offsetWidth, container.offsetHeight);
        animate();
    }
    function createRenderer() {
        canvasRenderer = new FSS.CanvasRenderer();
        setRenderer(RENDER.renderer);
    }
    function setRenderer(index) {
        if (renderer) {
            output.removeChild(renderer.element);
        }
        renderer = canvasRenderer;
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        output.appendChild(renderer.element);
    }
    function createScene() {
        scene = new FSS.Scene();
    }
    function createMesh() {
        scene.remove(mesh);
        renderer.clear();
        geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.segments, MESH.slices);
        material = new FSS.Material(MESH.ambient, MESH.diffuse);
        mesh = new FSS.Mesh(geometry, material);
        scene.add(mesh);
        var v, vertex;
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
            vertex = geometry.vertices[v];
            vertex.anchor = FSS.Vector3.clone(vertex.position);
            vertex.step = FSS.Vector3.create(Math.randomInRange(.2, 1), Math.randomInRange(.2, 1), Math.randomInRange(.2, 1));
            vertex.time = Math.randomInRange(0, Math.PIM2);
        }
    }
    function createLights() {
        var l, light;
        for (l = scene.lights.length - 1; l >= 0; l--) {
            light = scene.lights[l];
            scene.remove(light);
        }
        renderer.clear();
        for (l = 0; l < LIGHT.count; l++) {
            light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
            light.ambientHex = light.ambient.format();
            light.diffuseHex = light.diffuse.format();
            scene.add(light);
            light.mass = Math.randomInRange(.5, 1);
            light.velocity = FSS.Vector3.create();
            light.acceleration = FSS.Vector3.create();
            light.force = FSS.Vector3.create();
            light.ring = document.createElementNS(FSS.SVGNS, "circle");
            light.ring.setAttributeNS(null, "stroke", light.ambientHex);
            light.ring.setAttributeNS(null, "stroke-width", "0.5");
            light.ring.setAttributeNS(null, "fill", "none");
            light.ring.setAttributeNS(null, "r", "10");
            light.core = document.createElementNS(FSS.SVGNS, "circle");
            light.core.setAttributeNS(null, "fill", light.diffuseHex);
            light.core.setAttributeNS(null, "r", "4");
        }
    }
    function resize(width, height) {
        renderer.setSize(width, height);
        FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
        createMesh();
    }
    function animate() {
        now = Date.now() - start;
        update();
        render();
        requestAnimationFrame(animate);
    }
    function update() {
        var ox, oy, oz, l, light, v, vertex, offset = MESH.depth / 2;
        FSS.Vector3.copy(LIGHT.bounds, center);
        FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);
        FSS.Vector3.setZ(attractor, LIGHT.zOffset);
        if (LIGHT.autopilot) {
            ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
            oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
            FSS.Vector3.set(attractor, LIGHT.bounds[0] * ox, LIGHT.bounds[1] * oy, LIGHT.zOffset);
        }
        for (l = scene.lights.length - 1; l >= 0; l--) {
            light = scene.lights[l];
            FSS.Vector3.setZ(light.position, LIGHT.zOffset);
            var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT.minDistance, LIGHT.maxDistance);
            var F = LIGHT.gravity * light.mass / D;
            FSS.Vector3.subtractVectors(light.force, attractor, light.position);
            FSS.Vector3.normalise(light.force);
            FSS.Vector3.multiplyScalar(light.force, F);
            FSS.Vector3.set(light.acceleration);
            FSS.Vector3.add(light.acceleration, light.force);
            FSS.Vector3.add(light.velocity, light.acceleration);
            FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
            FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
            FSS.Vector3.add(light.position, light.velocity);
        }
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
            vertex = geometry.vertices[v];
            ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
            oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
            oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
            FSS.Vector3.set(vertex.position, MESH.xRange * geometry.segmentWidth * ox, MESH.yRange * geometry.sliceHeight * oy, MESH.zRange * offset * oz - offset);
            FSS.Vector3.add(vertex.position, vertex.anchor);
        }
        geometry.dirty = true;
    }
    function render() {
        renderer.render(scene);
        if (LIGHT.draw) {
            var l, lx, ly, light;
            for (l = scene.lights.length - 1; l >= 0; l--) {
                light = scene.lights[l];
                lx = light.position[0];
                ly = light.position[1];
                renderer.context.lineWidth = .5;
                renderer.context.beginPath();
                renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
                renderer.context.strokeStyle = light.ambientHex;
                renderer.context.stroke();
                renderer.context.beginPath();
                renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
                renderer.context.fillStyle = light.diffuseHex;
                renderer.context.fill();
            }
        }
    }
    function addEventListeners() {
        window.addEventListener("resize", onWindowResize);
    }
    function onMouseMove(event) {
        FSS.Vector3.set(attractor, event.x, renderer.height - event.y);
        FSS.Vector3.subtract(attractor, center);
    }
    function onWindowResize(event) {
        resize(container.offsetWidth, container.offsetHeight);
        render();
    }
    if (!isMobile) {
        initialise();
    }
})();