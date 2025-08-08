const ResumeTemplate6 = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 px-8 bg-white shadow-md border border-gray-300 text-sm">
      <div className="flex flex-row justify-between mb-3">
        <div className="flex flex-col space-x-0.5">
          <h3 className="text-xl font-bold">Arjun Patel</h3>
          <p>Bachelor of Technology</p>
          <p>Computer Science Engineering</p>
          <p>Indian Institute of Technology, Bombay</p>
        </div>
        <div className="flex flex-col space-x-2 items-end text-blue-700 mt-1">
          <p className="text-black">+91-987-654-3210</p>
          <p>arjun.patel@email.com</p>
          <p>linkedin.com/in/arjunpatel</p>
          <p className="mr-2">github.com/arjunpatel</p>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="font-bold">
          <span className="text-lg font-semibold">E</span>DUCATION
        </h3>
        <div className="h-0.25 bg-black w-full mb-2"></div>
        <table className="w-full border border-black text-sm">
          <thead>
            <tr className="font-semibold bg-gray-200">
              <th className="w-1/4 border border-black p-1 text-center">
                Degree/Certificate
              </th>
              <th className="w-2/5 border border-black p-1 text-center">
                Institute/Board
              </th>
              <th className="w-1/4 border border-black p-1 text-center">
                CGPA/Percentage
              </th>
              <th className="w-1/4 border border-black p-1 text-center">
                Year
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-black p-1 text-center">
                B.Tech, Computer Science
              </td>
              <td className="border border-black p-1 text-center">
                Indian Institute of Technology, Bombay
              </td>
              <td className="border border-black p-1 text-center">9.2 CGPA</td>
              <td className="border border-black p-1 text-center">2023</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="border border-black p-1 text-center">
                Higher Secondary (12th)
              </td>
              <td className="border border-black p-1 text-center">
                Delhi Public School, Mumbai
              </td>
              <td className="border border-black p-1 text-center">87%</td>
              <td className="border border-black p-1 text-center">2019</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="border border-black p-1 text-center">
                Secondary (10th)
              </td>
              <td className="border border-black p-1 text-center">
                St. Xavier&apos;s School, Mumbai
              </td>
              <td className="border border-black p-1 text-center">92%</td>
              <td className="border border-black p-1 text-center">2017</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-3">
        <h3 className="font-bold">
          <span className="text-lg font-semibold">E</span>XPERIENCE
        </h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div className="mt-2">
          <div className="flex flex-row justify-between">
            <h4 className="font-semibold">Software Engineer</h4>
            <p className="font-semibold">Jun 2023 - Present</p>
          </div>
          <p className="text-gray-600">Google India, Bangalore</p>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Designed and implemented scalable web applications using React and
              TypeScript.
            </li>
            <li>
              Led a team of 5 developers to deliver a project 2 weeks ahead of
              schedule.
            </li>
            <li>Optimized backend APIs, reducing latency by 30%.</li>
          </ul>
        </div>
        <div className="mt-4">
          <div className="flex flex-row justify-between">
            <h4 className="font-semibold">Intern - Software Developer</h4>
            <p className="font-semibold">May 2022 - Jul 2022</p>
          </div>
          <p className="text-gray-600">Amazon India, Hyderabad</p>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Developed microservices using Python and Flask for an internal
              tool.
            </li>
            <li>Conducted code reviews and improved team coding standards.</li>
            <li>
              Assisted in debugging and resolving critical production issues.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-3">
        <h3 className="font-bold">
          <span className="text-lg font-semibold">P</span>ROJECTS
        </h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div className="pt-1.5">
          <div className="flex flex-row justify-between">
            <h4 className="font-semibold">Task Management Web App</h4>
            <p className="font-semibold">Jan 2023 - Mar 2023</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Built a task management application using React, Node.js, and
              MongoDB.
            </li>
            <li>
              Implemented features like user authentication, task prioritization, and real-time notifications.
            </li>
            <li>
              Deployed the app on Heroku, achieving 95% uptime and serving over 200 users.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <div className="flex flex-row justify-between">
            <h4 className="font-semibold">AI Chatbot</h4>
            <p className="font-semibold">Aug 2022 - Oct 2022</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Developed an AI-powered chatbot using Python and TensorFlow.
            </li>
            <li>
              Integrated natural language processing for improved user interaction and added a sentiment analysis feature.
            </li>
            <li>
              Tested the chatbot with 500+ user inputs, achieving 85% accuracy in response generation.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-3">
        <h3 className="font-bold">
          <span className="text-lg font-semibold">S</span>KILLS
        </h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>
            <span className="font-semibold">Languages:</span> JavaScript,
            Python, TypeScript
          </li>
          <li>
            <span className="font-semibold">Frameworks:</span> React, Node.js,
            Flask
          </li>
          <li>
            <span className="font-semibold">Tools:</span> Git, Docker, AWS
          </li>
        </ul>
      </div>
      <div className="mb-3">
        <h3 className="font-bold">
          <span className="text-lg font-semibold">C</span>ERTIFICATIONS
        </h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>AWS Certified Solutions Architect</li>
          <li>Google Professional Machine Learning Engineer</li>
          <li>Microsoft Certified: Azure Developer Associate</li>
        </ul>
      </div>
      <div className="mb-1">
        <h3 className="font-bold">
          <span className="text-lg font-semibold">A</span>CHIEVEMENTS
        </h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>
            Selected as a Google Summer of Code (GSoC) Contributor in 2022.
          </li>
          <li>Received Best Project Award at IIT Bombay Tech Fest 2023.</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate6;