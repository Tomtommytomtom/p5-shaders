precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

vec3 palette(float t) {
    vec3 a = vec3(0.628,0.738,0.770);
    vec3 b = vec3(-0.612,0.340,0.340);
    vec3 c = vec3(1.047,3.294,1.434);
    vec3 d = vec3(-1.062,-0.172,-1.672);

    return a+b*cos(6.28318*(c*t+d));
}


void main() {
    vec2 fragCoord = gl_FragCoord.xy;

    vec2 uv = fragCoord / iResolution.xy;
    
    uv = (uv - 0.5) * 2.0;
    
    uv.x *= iResolution.x / iResolution.y;
    
    vec2 uv0 = uv;
    
    vec3 finalColor = vec3(0.0);
   
    for(float i = 0.0; i < 3.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i*.4 + iTime);

        d = sin(d*8.0 + 
        iTime)/8.0;

        d = abs(d);

        d = pow(0.01 / d,1.4);

        finalColor += col * d;
    }
    
    

    gl_FragColor = vec4(finalColor,1.0);
}