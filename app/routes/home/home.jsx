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
          alt: 'A Future of Call Center Analytics',
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
          alt: 'TTS Avatar Sales Agent',
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
        title="Full Stack Website For Australian Based Real Estate Bussiness."
        description="Build a full stack Website with a proper sturcture and handled deployement and hosting integrated Azure Blob and Real-Time Database"
        buttonText="Visit Website"
        buttonLink="https://gangarealestate.com.au/"
        model={{
          type: 'laptop',
          alt: 'Full Stack Website With Career Portal',
          textures: [
            {
              srcSet: `${websiteTexture} 800w, ${websiteTextureLarge} 1920w`,
              placeholder: websiteTexturePlaceholder,
            },
          ],
        }}
      />
      <Footer />
    </div>
  );
};
