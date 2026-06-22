import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport } from '~/hooks';
import { useEffect, useRef, useState } from 'react';
import { throttle } from '~/utils/throttle';
import {
  AmbientLight,
  DirectionalLight,
  IcosahedronGeometry,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Group,
  TorusGeometry,
} from 'three';
import styles from './tip-of-iceberg.module.css';

const springConfig = {
  stiffness: 40,
  damping: 25,
  mass: 1.5,
};

export function TipOfIceberg({ id, visible, sectionRef, ...rest }) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const canvasRef = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const icebergGroup = useRef();
  const lights = useRef();

  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);

  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);

  useEffect(() => {
    if (!canvasRef.current) return;
    const width = canvasRef.current.clientWidth || 300;
    const height = canvasRef.current.clientHeight || 300;

    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.current.setSize(width, height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.current = new PerspectiveCamera(45, width / height, 0.1, 100);
    camera.current.position.set(0, 0, 8);

    scene.current = new Scene();
    icebergGroup.current = new Group();
    scene.current.add(icebergGroup.current);

    // Build the Iceberg geometry
    const geometry = new IcosahedronGeometry(2.0, 1);
    const positionAttribute = geometry.attributes.position;
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);
      // Displace vertices to make it look organic
      const noise = (Math.sin(x * 2.5) + Math.cos(y * 2.5) + Math.sin(z * 2.5)) * 0.25;
      // Stiffen base a bit to look like it flares out under water
      const flare = y < 0 ? 1.2 : 1.0;
      positionAttribute.setXYZ(i, x * flare + noise, y + noise, z * flare + noise);
    }
    geometry.computeVertexNormals();

    // Core Solid material
    const solidMaterial = new MeshPhongMaterial({
      color: theme === 'light' ? 0x008080 : 0x5ec0e4,
      emissive: theme === 'light' ? 0x0a1b24 : 0x112233,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.6,
    });
    const solidMesh = new Mesh(geometry, solidMaterial);
    icebergGroup.current.add(solidMesh);

    // Wireframe overlay
    const wireframeMaterial = new MeshPhongMaterial({
      color: theme === 'light' ? 0x111111 : 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new Mesh(geometry, wireframeMaterial);
    icebergGroup.current.add(wireframeMesh);

    // "Water line" wireframe ring
    const ringGeo = new TorusGeometry(2.7, 0.04, 6, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ringMaterial = new MeshPhongMaterial({
      color: theme === 'light' ? 0x008080 : 0x4682b4,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new Mesh(ringGeo, ringMaterial);
    ringMesh.position.y = -0.5; // Slightly below center
    icebergGroup.current.add(ringMesh);

    // Light sources
    const ambientLight = new AmbientLight(0xffffff, theme === 'light' ? 1.4 : 0.8);
    const dirLight1 = new DirectionalLight(0x5ec0e4, theme === 'light' ? 2.5 : 3.0);
    dirLight1.position.set(5, 5, 5);
    const dirLight2 = new DirectionalLight(0xffffff, 1.0);
    dirLight2.position.set(-5, -5, 2);

    lights.current = [ambientLight, dirLight1, dirLight2];
    lights.current.forEach(light => scene.current.add(light));

    return () => {
      geometry.dispose();
      solidMaterial.dispose();
      wireframeMaterial.dispose();
      ringGeo.dispose();
      ringMaterial.dispose();
      if (renderer.current) {
        renderer.current.dispose();
      }
    };
  }, [theme]);

  // Adjust resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !renderer.current || !camera.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      renderer.current.setSize(width, height);
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse moves for tilting
  useEffect(() => {
    const onMouseMove = throttle(event => {
      const { innerWidth, innerHeight } = window;
      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      };

      rotationY.set(position.x * 0.8);
      rotationX.set(position.y * 0.8);
    }, 100);

    if (isInViewport && !reduceMotion) {
      window.addEventListener('mousemove', onMouseMove);
    }
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId;
    const start = Date.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (icebergGroup.current) {
        const elapsed = (Date.now() - start) * 0.001;
        // Float animation
        icebergGroup.current.position.y = Math.sin(elapsed) * 0.15;
        // Default rotations
        icebergGroup.current.rotation.y = elapsed * 0.08 + rotationY.get();
        icebergGroup.current.rotation.x = rotationX.get();
        icebergGroup.current.rotation.z = Math.cos(elapsed * 0.5) * 0.05;
      }

      if (renderer.current && scene.current && camera.current) {
        renderer.current.render(scene.current, camera.current);
      }
    };

    if (isInViewport && !reduceMotion) {
      animate();
    } else if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.showcase}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={visible || focused}>
          {({ visible: sectionVisible }) => (
            <>
              <div className={styles.details}>
                <div aria-hidden className={styles.index}>
                  <Divider
                    notchWidth="64px"
                    notchHeight="8px"
                    collapsed={!sectionVisible}
                    collapseDelay={1000}
                  />
                  <span className={styles.indexNumber} data-visible={sectionVisible}>
                    04
                  </span>
                </div>
                <Heading
                  level={3}
                  as="h2"
                  className={styles.title}
                  data-visible={sectionVisible}
                  id={titleId}
                >
                  This is just the tip of the iceberg
                </Heading>
                <Text className={styles.description} data-visible={sectionVisible} as="p">
                  See all my other projects, experimental works, and open-source contributions on my GitHub profile.
                </Text>
                <div className={styles.button} data-visible={sectionVisible}>
                  <Button iconHoverShift href="https://github.com/dushyant60" iconEnd="arrow-right">
                    See All Projects
                  </Button>
                </div>
              </div>
              <div className={styles.preview}>
                <canvas
                  aria-hidden
                  className={styles.canvas}
                  data-visible={sectionVisible}
                  ref={canvasRef}
                />
              </div>
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
