#define PHONG

uniform float time;
varying vec2 vUv;
varying vec3 vDistortedPosition;
varying float vHeight;

#include <common>
#include <uv_pars_vertex>
#include <normal_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

    #include <uv_vertex>
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>

    // Generate new abstract motion using sine and noise
    float wave = sin(position.y * 4.0 + time * 3.0) * 0.3;
    float spiral = sin(position.x * position.z * 2.0 + time) * 0.01;

    // Add a height-dependent displacement for unique abstract forms
    float heightDisplacement = cos(position.y * 2.0 + time) * 0.4;
    vec3 distortion = vec3(
        wave + spiral,
        heightDisplacement,
        sin(position.z * 3.0 + time * 1.5) * 0.1
    );

    vec3 updatedPosition = position + distortion;
    vHeight = distortion.y; // Pass height effect to the fragment shader
    vDistortedPosition = updatedPosition;

    vec4 mvPosition = modelViewMatrix * vec4(updatedPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
    #include <shadowmap_vertex>
}
