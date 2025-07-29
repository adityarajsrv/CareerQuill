import {
  BoltIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'AI-Powered Suggestions',
    icon: <BoltIcon className="h-8 w-8 text-blue-500" />,
    text: 'Smart recommendations for content, skills, and formatting based on your industry and role.',
  },
  {
    title: 'ATS-Compatible Templates',
    icon: <DocumentTextIcon className="h-8 w-8 text-blue-500" />,
    text: 'Professionally designed templates that pass Applicant Tracking Systems with ease.',
  },
  {
    title: 'Section-by-Section Editing',
    icon: <PencilSquareIcon className="h-8 w-8 text-blue-500" />,
    text: 'Intuitive editor that lets you customize every part of your resume with precision.',
  },
  {
    title: 'Real-Time Preview',
    icon: <EyeIcon className="h-8 w-8 text-blue-500" />,
    text: 'See your changes instantly with a live preview feature as you build.',
  },
  {
    title: 'One-Click PDF Export',
    icon: <ArrowDownTrayIcon className="h-8 w-8 text-blue-500" />,
    text: 'Download your polished resume in multiple formats, optimized for any application.',
  },
  {
    title: 'ATS Scorer',
    icon: <CheckBadgeIcon className="h-8 w-8 text-blue-500" />,
    text: 'Evaluate your resume’s ATS compatibility with a detailed score and improvement tips.',
  },
];

const Features = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-4">
          Everything You Need to <span className='text-blue-500'>Succeed</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 text-center mb-10 max-w-3xl mx-auto">
          Powerful features designed to help you create resumes that get results
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;