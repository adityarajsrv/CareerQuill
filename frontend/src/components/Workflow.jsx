import {
  UserIcon,
  DocumentTextIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const Workflow = () => {
  const steps = [
    {
      number: 1,
      icon: <UserIcon className="h-8 w-8 text-blue-500" />,
      title: 'Enter Your Details',
      description: 'Add your work experience, education, and skills. Our smart forms guide you through each section.',
    },
    {
      number: 2,
      icon: <DocumentTextIcon className="h-8 w-8 text-blue-500" />,
      title: 'Select a Template',
      description: 'Choose from our collection of professional, ATS-friendly templates designed by experts.',
    },
    {
      number: 3,
      icon: <SparklesIcon className="h-8 w-8 text-blue-500" />,
      title: 'Customize with AI',
      description: 'Let our AI optimize your content for your target role and industry for maximum impact.',
    },
    {
      number: 4,
      icon: <ArrowDownTrayIcon className="h-8 w-8 text-blue-500" />,
      title: 'Download Resume',
      description: 'Export as PDF, save online, or share directly with employers. Your resume, your way.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Create your perfect resume in just four simple steps
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0 sm:space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <span className="text-blue-600 font-semibold">{step.number}</span>
              </div>
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-base sm:text-lg text-gray-600 mt-10">
          Ready to get started? Your next career move is just minutes away.
        </p>
      </div>
    </section>
  );
};

export default Workflow;