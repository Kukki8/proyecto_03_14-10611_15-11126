precision highp float;

uniform sampler2D tDiffuse;
uniform vec3 u_luminance;
uniform vec3 u_baseColor;
uniform float u_contrast;
uniform float u_time;
uniform float u_noise;
uniform int u_behaviour;

varying vec2 vUv;

float rand(float x){
    return fract(cos(mod(dot(vec2(x,x),vec2(13.9898,8.141)),3.14))*43758.5453);
}

void main() {
    vec3 color;

    if(u_behaviour == 0){
        vec2 uv = vUv - 0.5;

        float distanceFromCenter = length( vUv - vec2(0.5,0.5) );
        
        float vignetteAmount;
        
        vignetteAmount = 1.0 - distanceFromCenter;
        vignetteAmount = smoothstep(0.1, 1.0, vignetteAmount);

        color = texture2D(tDiffuse, vUv).rgb;
        vec3 visionColor = u_baseColor;
        float grain = rand(uv.x) + uv.y;
        color += rand(grain * u_time) * u_noise;

        color = dot(color,u_luminance) * visionColor;

        color *=  vignetteAmount*1.0;
        color *= u_contrast;
    }
    
    gl_FragColor = vec4(color, 1.0);

}