import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FlaskConical, ExternalLink } from 'lucide-react';

const studies = [
  {
    title: 'Stress & Anxiety Support',
    journal: 'Indian Journal of Psychological Medicine',
    year: '2012',
    finding: 'KSM-66® showed significant reduction in stress and anxiety scores in adults.',
    link: '#',
  },
  {
    title: 'Cognitive Function & Memory',
    journal: 'Journal of Dietary Supplements',
    year: '2017',
    finding: 'Participants showed improved executive function, attention, and information processing speed.',
    link: '#',
  },
  {
    title: 'Physical Performance',
    journal: 'Journal of the International Society of Sports Nutrition',
    year: '2015',
    finding: 'Enhanced cardiorespiratory endurance and improved quality of life in healthy adults.',
    link: '#',
  },
  {
    title: 'Sleep Quality Improvement',
    journal: 'Cureus Journal of Medical Science',
    year: '2019',
    finding: 'Significant improvement in sleep quality and sleep onset latency.',
    link: '#',
  },
];

export function ScienceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 text-sage-700 font-medium hover:text-sage-800 transition-colors group cursor-pointer">
          <span className="flex items-center gap-1.5 bg-sage-100 px-3 py-1.5 rounded-full text-sm">
            <FlaskConical className="w-4 h-4" />
            24+ clinical studies
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-charcoal-900 flex items-center gap-3">
            <FlaskConical className="w-6 h-6 text-sage-700" />
            Clinical Research on KSM-66®
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <p className="text-charcoal-600">
            KSM-66® is the most extensively studied ashwagandha extract on the market. 
            Here are some key findings from peer-reviewed research:
          </p>

          <div className="space-y-4">
            {studies.map((study, idx) => (
              <div key={idx} className="bg-sage-50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-900">{study.title}</h4>
                    <p className="text-sm text-charcoal-500 mt-1">
                      {study.journal} • {study.year}
                    </p>
                    <p className="text-sm text-charcoal-600 mt-2">
                      {study.finding}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Note:</span> These studies were conducted on KSM-66® 
              Ashwagandha extract. Individual results may vary. This information is for educational 
              purposes and does not constitute medical advice.
            </p>
          </div>

          <p className="text-center text-sm text-charcoal-400">
            View all 24+ studies at{' '}
            <a 
              href="https://ksm66ashwagandha.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sage-700 hover:underline inline-flex items-center gap-1"
            >
              ksm66ashwagandha.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
