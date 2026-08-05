import { Box, Typography } from '@mui/material';
import {
  SiAngular,
  SiCss,
  SiDotnet,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import { VscAzureDevops } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';
import { LuBoxes, LuDatabase, LuGitPullRequest, LuRefreshCw, LuWorkflow } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import SectionHeader from './ui/SectionHeader';
import { RESUME_CONTENT_WIDTH, SECTION_VERTICAL_PADDING } from '../theme';

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
      { label: 'JavaScript', icons: [SiJavascript] },
      { label: 'Angular', icons: [SiAngular] },
      { label: 'Vue.js', icons: [SiVuedotjs] },
      { label: 'HTML & CSS', icons: [SiHtml5, SiCss] },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { label: '.NET / C#', icons: [SiDotnet] },
      { label: 'Entity Framework', icons: [LuBoxes] },
      { label: 'Node.js', icons: [SiNodedotjs] },
      { label: 'REST APIs', icons: [TbApi] },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { label: 'SQL Server', icons: [LuDatabase] },
      { label: 'MySQL', icons: [SiMysql] },
    ],
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { label: 'Azure DevOps', icons: [VscAzureDevops] },
      { label: 'Git', icons: [SiGit] },
      { label: 'CI/CD', icons: [LuWorkflow] },
    ],
  },
  {
    category: 'Development Practices',
    skills: [
      { label: 'Code Review', icons: [LuGitPullRequest] },
      { label: 'Agile Development', icons: [LuRefreshCw] },
    ],
  },
];

const Skills = () => (
  <Box id="skills" sx={{ py: SECTION_VERTICAL_PADDING, px: { xs: 3, md: 6 } }}>
    <SectionHeader title="Skills" />

    <Box
      component="ul"
      sx={{
        maxWidth: RESUME_CONTENT_WIDTH,
        mx: 'auto',
        my: 0,
        p: 0,
        listStyle: 'none',
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
            '&:first-of-type': { pt: 0 },
            '&:last-of-type': { pb: 0, borderBottom: 'none' },
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
