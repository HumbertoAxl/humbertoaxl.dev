import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Typography } from '@mui/material';

const jobs = [
  {
    company: 'Western Australian Public Sector',
    description: `• Designed and implemented new features for Angular-based web applications.
                  • Enhanced .NET APIs by introducing new calls and improving existing ones.
                  • Collaborated closely with customers to understand their needs, translating them
                  into technical requirements.
                  • Supported older applications in VB and C#.
                  • Provided support to less experienced developers by engaging in pair coding
                  sessions and offering constructive feedback on their code.`,
    from: 'February 2023',
    to: 'Current',
  },
  {
    company: 'Calytrix Technologies',
    description: 'Yeah it was alright',
    from: 'February 2022',
    to: 'February 2023',
  },
  {
    company: 'Ferimport',
    description: 'Brasil-sil-sil',
    from: 'November 2020',
    to: 'December 2021',
  },
];

export default function LeftAlignedTimeline() {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.3,
        },
      }}>
      {jobs.map((job) => (
        <TimelineItem>
          <TimelineOppositeContent>
            {job.from} - {job.to}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ p: '2px 16px' }}>
            <Typography variant="h6">{job.company}</Typography>
            <Typography whiteSpace={"pre-line"}>{job.description}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
