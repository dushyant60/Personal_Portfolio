#define PHONG

uniform float time;
uniform vec3 baseColor;
uniform vec3 highlightColor;
varying vec3 vDistortedPosition;
varying float vHeight;

#include <common>
#include <dithering_pars_fragment>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

    #include <clipping_planes_fragment>

    // New dynamic color palette based on height and time
    float heightFactor = abs(vHeight);
    vec3 colorShift = mix(baseColor, highlightColor, heightFactor);
    vec3 pulse = sin(vDistortedPosition * 105.0 + time) * 0.8 + 0.1;
    vec3 dynamicColor = colorShift * pulse;

    // Combine lighting and the abstract colors
    vec3 lightEffect = vec3(0.5) + 0.5 * dynamicColor;

    // Final combination with noise-like variation
    vec4 finalColor = vec4(lightEffect * (vHeight + 1.0), 1.0);

    #include <logdepthbuf_fragment>
    #include <dithering_fragment>
    #include <fog_fragment>

    gl_FragColor = finalColor;
}
