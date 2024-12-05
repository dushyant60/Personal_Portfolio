#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

uniform float time;
varying vec2 vUv;
varying vec3 newPosition;
varying float noise;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
  #include <clipping_planes_fragment>

  // Dominant blue base with dynamic shifts
  vec3 baseColor = vec3(0.2, 0.4 + 0.4 * sin(time + vUv.x * 6.28), 0.8 + 0.2 * cos(time + vUv.y * 6.28));
  
  // Add noise-driven variations to enhance texture richness
  vec3 colorVariation = vec3(0.1 * noise, 0.1 * noise, noise * 0.5);
  vec3 finalColors = baseColor + colorVariation;

  // Pulsing blue glow for emissive
  vec3 dynamicEmissive = emissive + vec3(0.1, 0.2, 0.6 * (0.5 + 0.5 * sin(time * 2.0)));

  // Create diffuse color with blue dominance
  vec4 diffuseColor = vec4(finalColors * (1.0 - noise), opacity);

  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = dynamicEmissive;

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <specularmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <emissivemap_fragment>

  // Standard Phong lighting calculations
  #include <lights_phong_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // Ambient occlusion
  #include <aomap_fragment>

  // Final light accumulation
  vec3 outgoingLight = reflectedLight.directDiffuse 
                     + reflectedLight.indirectDiffuse 
                     + reflectedLight.directSpecular 
                     + reflectedLight.indirectSpecular 
                     + totalEmissiveRadiance;

  // Environment mapping and post-processing
  #include <envmap_fragment>

  // Output final color with dominant blue and glow
  gl_FragColor = vec4(outgoingLight * finalColors, diffuseColor.a);

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}
