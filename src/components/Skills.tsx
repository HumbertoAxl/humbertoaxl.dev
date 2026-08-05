import { Box, Typography } from '@mui/material';
import {
  SiAngular,
  SiCss,
  SiDocker,
  SiDotnet,
  SiGit,
  SiHtml5,
  SiJira,
  SiMui,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { VscAzure, VscFileCode } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';
import { LuDatabase, LuGitPullRequest, LuRefreshCw, LuUsers, LuWorkflow } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import SectionHeader from './ui/SectionHeader';
import { RESUME_CONTENT_WIDTH } from '../theme';

interface Skill {
  label: string;
  icons: IconType[];
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { label: 'React', icons: [SiReact] },
      { label: 'TypeScript', icons: [SiTypescript] },
      { label: 'Angular', icons: [SiAngular] },
      { label: 'HTML & CSS', icons: [SiHtml5, SiCss] },
      { label: 'Material-UI', icons: [SiMui] },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { label: '.NET / C#', icons: [SiDotnet] },
      { label: 'Node.js', icons: [SiNodedotjs] },
      { label: 'REST APIs', icons: [TbApi] },
      { label: 'VB.NET', icons: [VscFileCode] },
    ],
  },
  {
    category: 'Tools & Cloud',
    skills: [
      { label: 'Git', icons: [SiGit] },
      { label: 'Docker', icons: [SiDocker] },
      { label: 'Azure', icons: [VscAzure] },
      { label: 'SQL Server', icons: [LuDatabase] },
      { label: 'Jira', icons: [SiJira] },
    ],
  },
  {
    category: 'Practices',
    skills: [
      { label: 'Agile / Scrum', icons: [LuRefreshCw] },
      { label: 'Code Review', icons: [LuGitPullRequest] },
      { label: 'Pair Programming', icons: [LuUsers] },
      { label: 'CI/CD', icons: [LuWorkflow] },
    ],
  },
];

const Skills = () => (
  <Box id="skills" sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, md: 6 } }}>
    <SectionHeader title="Skills" />

    <Box
      component="ul"
      sx={{
        maxWidth: RESUME_CONTENT_WIDTH,
        mx: 'auto',
        my: 0,
        p: 0,
        listStyle: 'none',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {skillCategories.map(({ category, skills }) => (
        <Box
          component="li"
          key={category}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              md: 'minmax(190px, 0.75fr) minmax(0, 2.25fr)',
            },
            gap: { xs: 2.25, md: 6 },
            py: { xs: 3, md: 4 },
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, alignSelf: 'start' }}>
            <Box sx={{ width: 18, height: '1px', bgcolor: 'primary.main', opacity: 0.72 }} />
            <Typography
              component="h3"
              sx={{
                color: 'text.primary',
                fontSize: { xs: '1.05rem', md: '1.15rem' },
                fontWeight: 750,
                letterSpacing: '-0.01em',
              }}
            >
              {category}
            </Typography>
          </Box>

          <Box
            component="ul"
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
              },
              columnGap: { xs: 2, md: 4 },
              rowGap: { xs: 1.75, md: 2.25 },
              m: 0,
              p: 0,
              listStyle: 'none',
            }}
          >
            {skills.map(({ label, icons }) => (
              <Box
                component="li"
                key={label}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}
              >
                <Box
                  sx={{
                    width: 34,
                    minWidth: 34,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.4,
                    color: 'primary.main',
                  }}
                >
                  {icons.map((SkillIcon, index) => (
                    <SkillIcon
                      key={label + index}
                      aria-hidden
                      focusable="false"
                      size={icons.length > 1 ? 15 : 19}
                    />
                  ))}
                </Box>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '0.9rem', md: '0.975rem' },
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default Skills;
