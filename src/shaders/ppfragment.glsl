precision highp float;

uniform sampler2D tDiffuse;
uniform vec3 u_luminance;
uniform vec3 u_baseColor;
uniform float u_contrast;
uniform float u_time;
uniform float u_noise;
uniform int u_behavior;
uniform float u_hardness;

varying vec2 vUv;

float rand(float x){
    return fract(cos(mod(dot(vec2(x,x),vec2(13.9898,8.141)),3.14))*43758.5453);
}

void main() {
    vec3 color;

    if(u_behavior == 0){
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

    }else if(u_behavior == 1){

        float redOffset   =  0.009 * u_hardness;
        float greenOffset =  0.006 * u_hardness;
        float blueOffset  = -0.006 * u_hardness;

        vec2 direction = vUv - vec2(0,0);

        color.r = texture2D(tDiffuse, vUv + (direction * vec2(redOffset  ))).r;
        color.g = texture2D(tDiffuse, vUv + (direction * vec2(greenOffset))).g;
        color.b = texture2D(tDiffuse, vUv + (direction * vec2(blueOffset ))).b;
    }
    
    gl_FragColor = vec4(color, 1.0);

}