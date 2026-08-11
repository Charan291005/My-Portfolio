import { Metadata } from 'next';
import ResumeViewer from '@/components/ResumeViewer';

export const metadata: Metadata = {
  title: 'Resume | Shree Charan N',
  description: 'Cybersecurity Engineer & Developer Resume',
};

export default function ResumePage() {
  return <ResumeViewer />;
}
