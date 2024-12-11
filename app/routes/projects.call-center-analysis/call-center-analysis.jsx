import vachLarge from '~/assets/vach-backgroundLarge.png';
import backgroundvach from '~/assets/vach-background.png';
import vachComponentLightLarge from '~/assets/vachComponentLarge.png';
import vachComponentLightPlaceholder from '~/assets/spr-components-light-placeholder.png';
import vachComponentLight from '~/assets/vachComponent.png';
import vachDesignSystemLightLarge from '~/assets/vachDesignSystemLarge.png';
import vachDesignSystemLightPlaceholder from '~/assets/spr-design-system-light-placeholder.png';
import vachDesignSystemLight from '~/assets/vachDesignSystem.png';
import vachTextureLightLarge from '~/assets/vachTextureLarge.png';
import vachTextureLightPlaceholder from '~/assets/spr-lesson-builder-light-placeholder.jpg';
import vachTextureLight from '~/assets/vachTexture.png';
import vachMotionLarge from '~/assets/vach-backgroundLarge.png';
import vachMotionPlaceholder from '~/assets/spr-motion-placeholder.jpg';
import vachMotion from '~/assets/vach_video.mp4';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { media } from '~/utils/style';
import styles from './call-center-analysis.module.css';

const title = 'Revolutionizing Call Center Operations with AI';
const description =
  'I developed this transformative project while working at Onelogica, an AI-based start-up. The platform leverages advanced technologies and Azure cloud services to enhance call center efficiency, offering real-time transcription, sentiment analysis, and intelligent recommendations for agents.';
const roles = [
  'AI Integration',
  'Front End Development',
  'System Architecture',
  'Azure Cloud Services',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const CallCenterAnalysis = () => {
  const { theme } = useTheme();

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={0.8}
          src={backgroundvach}
          srcSet={`${vachLarge} 1080w, ${backgroundvach} 2160w`}
        />
        <ProjectHeader
          title={title}
          description={description}
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${vachTextureLight} 1280w, ${vachTextureLightLarge} 2560w`}
              width={1280}
              height={800}
              placeholder={vachTextureLightPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Real-time call transcription interface."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Target Users</ProjectSectionHeading>
            <ProjectSectionText>
              This application is specifically crafted for call center agents, focusing on enhancing their efficiency and facilitating seamless communication. It addresses the dynamic challenges faced during live calls and post-call evaluations.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              srcSet={`${vachComponentLight} 1024w, ${vachComponentLightLarge} 2048w`}
              width={1024}
              height={800}
              placeholder={vachComponentLightPlaceholder}
              alt="Real-time sentiment analysis dashboard."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
              <ProjectSectionText>
                The application provides real-time transcription to help agents track conversations without detailed note-taking. It includes dynamic sentiment analysis to assess customer emotions, offering tailored suggestions for responses and questions. These features enhance interaction quality and enable agents to handle calls effectively.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              srcSet={`${vachDesignSystemLight} 1280w, ${vachDesignSystemLightLarge} 2560w`}
              width={1280}
              height={800}
              placeholder={vachDesignSystemLightPlaceholder}
              alt="Call playback and summary interface."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Functional Capabilities</ProjectSectionHeading>
              <ProjectSectionText>
                The platform allows easy access to call recordings with playback controls for reviewing past interactions. Automatic call summaries capture key details for future reference. A dedicated notes section enables agents to document insights, complemented by search and tagging features for quick information retrieval.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns width="full">
            <ProjectSectionContent width="full">
              <ProjectTextRow width="s">
                <ProjectSectionHeading>Security and Future Potential</ProjectSectionHeading>
                <ProjectSectionText>
                  The application ensures secure user access and data privacy compliance. It is scalable for organizational growth, with planned integrations for CRM systems, advanced analytics, and supervisor monitoring tools. These features aim to improve operational efficiency and foster innovation.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <Image
              raised
              className={styles.video}
              srcSet={`${vachMotion} 1280w, ${vachMotionLarge} 2560w`}
              width={1280}
              height={800}
              placeholder={vachMotionPlaceholder}
              alt="Interactive call handling and training interface."
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
