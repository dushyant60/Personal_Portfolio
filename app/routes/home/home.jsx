import avatarTexture2Large from '~/assets/avatarTexture2Large.png';
import avatarTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import avatarTexture2 from '~/assets/avatarTexture2.png';
import avatarTextureLarge from '~/assets/avatarTextureLarge.png';
import avatarTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import avatarTexture from '~/assets/avatarTexture.png';
import vachTextureLarge from '~/assets/vachTextureLarge.png';
import vachTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import vachTexture from '~/assets/vachTexture.png';
import websiteTexture from '~/assets/website_image.png';
import websiteTextureLarge from '~/assets/website_image_large.png';
import websiteTexturePlaceholder from '~/assets/website_image_placeholder.jpg'
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState, lazy, useMemo, Suspense } from 'react';
import config from '~/config.json';
import styles from './home.module.css';
import { Earth, EarthSection } from '../projects.call-center-analysis/earth';
import { ThemeProvider } from '~/components/theme-provider';
import {
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: '',
    description: `Design portfolio of ${config.name} — a Application Developer working currently on Web applications with a focus on motion, experience design, Deployement, AI-Driven application and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="The Future of Call Center Analytics"
        description="Created a Full Stack Gen-AI driven web application for call center analytics."
        buttonText="View project"
        buttonLink="/projects/call-center-analysis"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: `${vachTexture} 1280w, ${vachTextureLarge} 2560w`,
              placeholder: vachTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="TTS Avatar Sales Agent."
        description="An fully functional TTS Avatar Assistance for handleing the sales, demo and pitching for automobiles industry."
        buttonText="View Project"
        buttonLink="https://github.com/dushyant60/Video_Avatar/blob/main/README.md"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${avatarTexture} 375w, ${avatarTextureLarge} 750w`,
              placeholder: avatarTexturePlaceholder,
            },
            {
              srcSet: `${avatarTexture2} 375w, ${avatarTexture2Large} 750w`,
              placeholder: avatarTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Full Stack Website With Career Portal."
        description="Build a full stack Website with a seprate Career module for a start-up to manage hiring applicants."
        buttonText="Visit Website"
        buttonLink="https://onelogica.com"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: `${websiteTexture} 800w, ${websiteTextureLarge} 1920w`,
              placeholder: websiteTexturePlaceholder,
            },
          ],
        }}
      />

      <ThemeProvider theme="dark" data-invert>
        <Suspense>
          <Earth
            className={styles.earth}
            hideMeshes={useMemo(
              () => ['Atmosphere', 'EarthPartial', 'Chunk', 'EarthFull'],
              []
            )}
            position={useMemo(() => [0, 0, 0], [])}
            labels={useMemo(
              () => [
                {
                  position: [0.54, 0.19, 0.18],
                  text: 'Pacific ring of fire',
                  hidden: true,
                },
                {
                  position: [0.47, -0.38, 0.04],
                  text: 'Ruapehu',
                  hidden: true,
                },
                {
                  position: [0.22, 0.44, -0.35],
                  text: 'St. Helens',
                  hidden: true,
                },
                {
                  position: [0.16, -0.06, 0.58],
                  text: 'Krakatoa',
                  hidden: true,
                },
                {
                  position: [0.11, 0.2, -0.56],
                  text: 'Parícutin',
                  hidden: true,
                },
                {
                  position: [0.52, 0.2, -0.23],
                  text: 'Kīlauea',
                  hidden: true,
                },
                {
                  position: [-0.24, 0.75, 0.24],
                  text: 'Mantle',
                  delay: 800,
                  hidden: true,
                },
                {
                  position: [-0.24, 0.55, 0.24],
                  text: 'Outer core',
                  delay: 800,
                  hidden: true,
                },
                {
                  position: [-0.24, 0.35, 0.24],
                  text: 'Inner core',
                  delay: 800,
                  hidden: true,
                },
              ],
              []
            )}
            scale={0.6}
          >
            <EarthSection
              scrim
              animations={['0:loop']}
              camera={[0, 0, 1.5]}
              meshes={['Atmosphere', 'EarthFull']}
            >
              <ProjectSection>
                <ProjectSectionContent>
                  <ProjectTextRow center>
                    <ProjectSectionHeading>
                      Hello, Welcome to my Earth!
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      Harnessing a good expertise in application development, deployment,
                      testing, and cloud solutions.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[0, 0, 2.4]}
              meshes={['Atmosphere', 'EarthFull']}
            />
            <EarthSection
              animations={['0:loop']}
              camera={[1.14, -1.39, 0.94]}
              meshes={['Atmosphere', 'EarthFull']}
            >
              <ProjectSection>
                <ProjectSectionContent width="xl">
                  <ProjectTextRow justify="end" width="s">
                  <img 
              src="app\routes\home\WebDevImg.png" 
              alt="Web Development" 
              style={{ width: '100%', marginBottom: '20px', float: 'left',}} 
            />
                    <ProjectSectionHeading level={4} as="h3">
                      Mastering Modern Web Development
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      I am proficient in a comprehensive tech stack that includes HTML,
                      CSS, JavaScript, Bootstrap, jQuery, React, Node.js, Express,
                      MongoDB, and Azure CosmosDB. With expertise in TypeScript basics,
                      GitHub, Bash, and Visual Studio Code, I streamline development
                      workflows to build dynamic and responsive applications. My work
                      focuses on delivering interactive user experiences with attention to
                      detail and functionality.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.17, 0.69, -1.47]}
              meshes={['Atmosphere', 'EarthFull']}
              labels={[
                'Pacific ring of fire',
                'Ruapehu',
                'St. Helens',
                'Krakatoa',
                'Parícutin',
                'Kīlauea',
              ]}
            >
              <ProjectSection>
                <ProjectSectionContent width="xl">
                  <ProjectTextRow justify="start" width="s">
                  <img 
              src="app\routes\home\CloudImg.png" 
              alt="Web Development" 
              style={{ width: '80%', marginBottom: '20px', float: 'left',}} 
            />
                    <ProjectSectionHeading level={4} as="h3">
                      Cloud and Deployment Excellence
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      My experience in cloud hosting and deployment is centered around
                      Azure, where I have leveraged services such as Azure Web App
                      Services, ACR, Azure VM, and Azure AI Foundry to create scalable and
                      efficient solutions. I integrate AI-driven features into
                      applications to solve real-world challenges, ensuring robust and
                      future-ready deployments.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.81, 0.51, 0.43]}
              meshes={['Atmosphere', 'EarthFull']}
              labels={[
                'Pacific ring of fire',
                'Ruapehu',
                'St. Helens',
                'Krakatoa',
                'Parícutin',
                'Kīlauea',
              ]}
            />
            <EarthSection
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['EarthPartial', 'Chunk']}
              labels={['Mantle', 'Outer core', 'Inner core']}
            >
              <ProjectSection>
                <ProjectSectionContent width="xl">
                  <ProjectTextRow justify="end" width="s">
                  <img 
              src="app\routes\home\AIandLLMImg.png" 
              alt="Web Development" 
              style={{ width: '100%', marginBottom: '20px', float: 'left',}} 
            />
                    <ProjectSectionHeading level={4} as="h3">
                      Pioneering AI and LLM Applications
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      I specialize in designing and optimizing prompts for AI models,
                      ensuring improved relevance and performance. My work in
                      Retrieval-Augmented Generation (RAG) and the integration of large
                      language models (LLMs) has enabled innovative AI-driven applications
                      capable of handling complex queries and delivering impactful
                      solutions.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              scrimReverse
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['Atmosphere', 'EarthFull']}
            />
          </Earth>
        </Suspense>
      </ThemeProvider>
      <Footer />
    </div>
  );
};
