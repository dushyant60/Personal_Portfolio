import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, lazy, useMemo, Suspense} from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import styles from './contact.module.css';

import { Earth, EarthSection } from '../projects.call-center-analysis/earth';
import { ThemeProvider } from '~/components/theme-provider';
import {
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;


export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const actionData = useActionData();
  const { state } = useNavigation();
  const sending = state === 'submitting';

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:dushyantsom60@gmail.com?subject=Portfolio message from ${email.value}&body=${encodeURIComponent(message.value)}`;
    window.location.href = mailtoLink;
  };

  return (
    
    <Section className={styles.contact}>
    <Transition unmount in={!actionData?.success} timeout={1600}>
      {({ status, nodeRef }) => (
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <Heading
            className={styles.title}
            data-status={status}
            level={3}
            as="h1"
            style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
          >
            <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
          </Heading>
          <Divider
            className={styles.divider}
            data-status={status}
            style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
          />
          {/* Hidden honeypot field to identify bots */}
          <Input
            className={styles.botkiller}
            label="Name"
            name="name"
            maxLength={MAX_EMAIL_LENGTH}
          />
          <Input
            required
            className={styles.input}
            data-status={status}
            style={getDelay(tokens.base.durationXS, initDelay)}
            autoComplete="email"
            label="Your email"
            type="email"
            name="email"
            maxLength={MAX_EMAIL_LENGTH}
            {...email}
          />
          <Input
            required
            multiline
            className={styles.input}
            data-status={status}
            style={getDelay(tokens.base.durationS, initDelay)}
            autoComplete="off"
            label="Message"
            name="message"
            maxLength={MAX_MESSAGE_LENGTH}
            {...message}
          />
          <Transition
            unmount
            in={!sending && actionData?.errors}
            timeout={msToNum(tokens.base.durationM)}
          >
            {({ status: errorStatus, nodeRef }) => (
              <div
                className={styles.formError}
                ref={nodeRef}
                data-status={errorStatus}
                style={cssProps({
                  height: errorStatus ? errorRef.current?.offsetHeight : 0,
                })}
              >
                <div className={styles.formErrorContent} ref={errorRef}>
                  <div className={styles.formErrorMessage}>
                    <Icon className={styles.formErrorIcon} icon="error" />
                    {actionData?.errors?.email}
                    {actionData?.errors?.message}
                  </div>
                </div>
              </div>
            )}
          </Transition>
          <Button
            className={styles.button}
            data-status={status}
            data-sending={sending}
            style={getDelay(tokens.base.durationM, initDelay)}
            disabled={sending}
            loading={sending}
            loadingText="Sending..."
            icon="send"
            type="submit"
          >
            Send message
          </Button>
        </form>
      )}
    </Transition>
  
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
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
