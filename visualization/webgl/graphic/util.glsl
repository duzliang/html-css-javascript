attribute vec2 position;
varying vec3 color;

void main(){
  gl_PointSize=1.;
  color=vec3(.5+position*.5,0.);
  gl_Position=vec4(position*.5,1.,1.);
}

precision mediump float;
varying vec3 color;

void main()
{
  gl_FragColor=vec4(color,1.);
}