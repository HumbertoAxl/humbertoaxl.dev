import { useEffect, useRef } from 'react';
import { Box, GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MAX_RENDER_PIXELS = 14_700_000;

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
out vec4 outColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  float n = hash21(p);
  return vec2(n, hash21(p + n + 19.19));
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);
  for (int octave = 0; octave < 5; octave++) {
    value += amplitude * noise(p);
    p = rotation * p * 2.04 + vec2(11.7, 7.3);
    amplitude *= 0.5;
  }
  return value;
}

float starLayer(vec2 world, float density, float threshold) {
  vec2 grid = world * density;
  vec2 id = floor(grid);
  vec2 cell = fract(grid) - 0.5;
  vec2 offset = (hash22(id) - 0.5) * 0.7;
  float seed = hash21(id + 17.31);
  float radius = mix(0.035, 0.13, pow(seed, 8.0));
  float point = smoothstep(radius, 0.0, length(cell - offset));
  return point * smoothstep(threshold, 1.0, seed);
}

float purpleFilament(
  vec2 page,
  vec2 world,
  vec2 center,
  vec2 radius,
  vec2 offset
) {
  vec2 q = (page - center) / radius;
  float envelope = exp(-dot(q, q) * 1.65);
  float first = 1.0 - abs(2.0 * fbm(world * 8.5 + offset) - 1.0);
  float second = 1.0 - abs(2.0 * fbm(world * 18.0 + offset * 2.1) - 1.0);
  return envelope * pow(first, 4.6) * (0.35 + pow(second, 3.2));
}

void main() {
  vec2 resolution = max(u_resolution, vec2(1.0));
  vec2 page = gl_FragCoord.xy / resolution;
  vec2 world = gl_FragCoord.xy / resolution.y;
  float documentAspect = resolution.x / resolution.y;

  vec2 domainWarp = vec2(
    fbm(world * 1.7 + vec2(2.1, 8.4)),
    fbm(world * 1.7 + vec2(9.3, 1.6))
  );
  float largeCloud = fbm(world * 4.0 + domainWarp * 1.8);
  float fineCloud = fbm(world * 10.5 + domainWarp * 2.7);
  float grain = 1.0 - abs(2.0 * fbm(world * 22.0 + domainWarp * 3.4) - 1.0);

  // The reference composition: dark upper space, then one diagonal Milky Way.
  float centerLine = 0.735 - page.x * 0.165;
  float irregularDistance = page.y - centerLine
    + (largeCloud - 0.5) * 0.018
    + (fineCloud - 0.5) * 0.006;
  float distanceToBand = abs(irregularDistance);

  float outerHalo = exp(-pow(distanceToBand / 0.082, 1.7));
  float stellarCloud = exp(-pow(distanceToBand / 0.046, 1.34));
  float denseDisc = exp(-pow(distanceToBand / 0.022, 1.18));
  float granularDisc = stellarCloud
    * smoothstep(0.3, 0.78, fineCloud)
    * (0.25 + pow(grain, 4.0));

  float coreEnvelope = exp(
    -pow((page.x - 0.66) / 0.24, 2.0)
    -pow(irregularDistance / 0.058, 2.0)
  );
  float dustNoise = fbm(world * 16.0 + vec2(13.0, 4.0));
  float dustLane = exp(
    -pow(
      abs(page.y - centerLine + (dustNoise - 0.5) * 0.009) / 0.0105,
      1.38
    )
  );

  vec3 color = vec3(0.0018, 0.0034, 0.013);
  float quietSpace = fbm(world * 1.2 + vec2(8.0, 3.0));
  color += vec3(0.004, 0.011, 0.032) * (0.35 + quietSpace * 0.42);

  color += vec3(0.012, 0.043, 0.13)
    * outerHalo
    * (0.22 + largeCloud * 0.56);
  color += vec3(0.03, 0.105, 0.29)
    * stellarCloud
    * (0.24 + largeCloud * 0.5);
  color += vec3(0.20, 0.27, 0.54)
    * granularDisc
    * (0.42 + fineCloud * 0.58);
  color += vec3(0.42, 0.55, 0.82)
    * denseDisc
    * (0.12 + granularDisc * 0.48);
  color += vec3(0.46, 0.5, 0.72)
    * coreEnvelope
    * (0.11 + fineCloud * 0.18);
  color += vec3(0.24, 0.07, 0.31)
    * stellarCloud
    * smoothstep(0.57, 0.78, largeCloud)
    * 0.44;
  color *= 1.0 - dustLane * 0.82;

  // Sparse violet structures below the main galaxy, never a second full-width band.
  float purpleLeft = purpleFilament(
    page,
    world,
    vec2(0.10, 0.40),
    vec2(0.14, 0.105),
    vec2(2.0, 17.0)
  );
  float purpleMiddle = purpleFilament(
    page,
    world,
    vec2(0.57, 0.29),
    vec2(0.18, 0.15),
    vec2(23.0, 5.0)
  );
  float purpleRight = purpleFilament(
    page,
    world,
    vec2(0.86, 0.43),
    vec2(0.12, 0.095),
    vec2(7.0, 29.0)
  );
  color += vec3(0.19, 0.035, 0.33) * purpleLeft * 0.72;
  color += vec3(0.13, 0.028, 0.27) * purpleMiddle * 0.62;
  color += vec3(0.23, 0.045, 0.37) * purpleRight * 0.58;

  // Sparse space stars; density rises only inside the Milky Way.
  float ambientStars = starLayer(world + vec2(3.1, 7.3), 68.0, 0.991);
  ambientStars += starLayer(world * 1.27 + vec2(17.0, 2.0), 124.0, 0.996) * 0.7;
  float bandStars = starLayer(world + vec2(9.0, 13.0), 185.0, 0.958) * stellarCloud;
  bandStars += starLayer(world * 1.61 + vec2(31.0, 5.0), 310.0, 0.978) * denseDisc;
  float purpleStars = starLayer(world + vec2(21.0, 19.0), 155.0, 0.987)
    * min(1.0, purpleLeft + purpleMiddle + purpleRight);

  vec3 starColor = mix(
    vec3(0.67, 0.79, 1.0),
    vec3(1.0, 0.86, 0.74),
    hash21(floor(world * 124.0)) * 0.22
  );
  color += starColor * (
    ambientStars * 0.72
    + bandStars * 1.16
    + purpleStars * 0.48
  );

  // Keep the outer edges calm on both narrow and ultrawide documents.
  float edgeShade = smoothstep(0.5, 0.02, min(page.x, 1.0 - page.x));
  color *= 1.0 - edgeShade * 0.19;
  float topCalm = smoothstep(0.7, 1.0, page.y);
  color *= 1.0 - topCalm * 0.12;
  float bottomCalm = smoothstep(0.18, 0.0, page.y);
  color *= 1.0 - bottomCalm * 0.18;
  color *= documentAspect > 0.78 ? 0.92 : 1.0;
  color = pow(color, vec3(0.86));

  outColor = vec4(color, 1.0);
}`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function drawFallback(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#03040f');
  gradient.addColorStop(0.38, '#07142f');
  gradient.addColorStop(0.58, '#0c1230');
  gradient.addColorStop(1, '#03030d');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

const SpaceBackground = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const root = document.getElementById('root')!;
    if (!canvas || !root) return;

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    let resizeFrame = 0;

    if (!gl) {
      const resizeFallback = () => {
        canvas.width = Math.max(1, root.clientWidth);
        canvas.height = Math.max(1, root.scrollHeight);
        drawFallback(canvas);
      };
      const fallbackObserver = new ResizeObserver(resizeFallback);
      fallbackObserver.observe(root);
      resizeFallback();
      return () => fallbackObserver.disconnect();
    }

    const webgl = gl;
    const vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(webgl, webgl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      drawFallback(canvas);
      return;
    }

    const program = webgl.createProgram();
    const buffer = webgl.createBuffer();
    if (!program || !buffer) return;

    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader);
    webgl.linkProgram(program);
    if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
      drawFallback(canvas);
      return;
    }

    const positionLocation = webgl.getAttribLocation(program, 'a_position');
    const resolutionLocation = webgl.getUniformLocation(program, 'u_resolution');
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(
      webgl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      webgl.STATIC_DRAW,
    );
    webgl.useProgram(program);
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

    function renderDocument() {
      const cssWidth = Math.max(1, root.clientWidth);
      const cssHeight = Math.max(1, root.scrollHeight);
      const maxTextureSize = webgl.getParameter(webgl.MAX_TEXTURE_SIZE) as number;
      const desiredScale = Math.min(window.devicePixelRatio || 1, 2);
      const renderScale = Math.min(
        desiredScale,
        Math.sqrt(MAX_RENDER_PIXELS / (cssWidth * cssHeight)),
        maxTextureSize / cssWidth,
        maxTextureSize / cssHeight,
      );

      canvas.width = Math.max(1, Math.round(cssWidth * renderScale));
      canvas.height = Math.max(1, Math.round(cssHeight * renderScale));
      webgl.viewport(0, 0, canvas.width, canvas.height);
      webgl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      webgl.drawArrays(webgl.TRIANGLES, 0, 3);
    }

    function scheduleRender() {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(renderDocument);
    }

    const documentObserver = new ResizeObserver(scheduleRender);
    documentObserver.observe(root);
    window.addEventListener('resize', scheduleRender);
    renderDocument();

    return () => {
      documentObserver.disconnect();
      window.removeEventListener('resize', scheduleRender);
      window.cancelAnimationFrame(resizeFrame);
      webgl.deleteBuffer(buffer);
      webgl.deleteProgram(program);
      webgl.deleteShader(vertexShader);
      webgl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          '#root': {
            position: 'relative',
            isolation: 'isolate',
            minHeight: '100vh',
          },
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          overflow: 'hidden',
          backgroundColor: '#03030d',
          opacity: theme.palette.mode === 'dark' ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      >
        <Box
          component="canvas"
          ref={canvasRef}
          sx={{ width: '100%', height: '100%', display: 'block' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'linear-gradient(180deg, rgba(3,3,13,0.22) 0%, rgba(3,3,13,0.1) 42%, rgba(3,3,13,0.2) 100%)',
              md: 'linear-gradient(90deg, rgba(3,3,13,0.28) 0%, rgba(3,3,13,0.08) 48%, rgba(3,3,13,0.04) 78%, rgba(3,3,13,0.14) 100%)',
            },
          }}
        />
      </Box>
    </>
  );
};

export default SpaceBackground;
