#ifdef GL_ES
precision mediump float;
varying vec3 color;
#endif

void main() {
  gl_FragColor = vec4(color, 1.0);
}