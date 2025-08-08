const ResumeTemplate3 = () => {
  return (
    <div className="max-w-3xl mx-auto py-4 px-6 bg-white shadow-md border border-gray-300 text-sm">
      <h3 className="text-lg font-bold mb-1 text-blue-500">John Doe</h3>
      <div className="flex flex-row space-x-2 mb-2 text-gray-500">
        <p>+1 (415) 555-9876 |</p>
        <p>john.doe@outlook.com |</p>
        <p>linkedin.com/in/johndoe-ml |</p>
        <p>github.com/johndoe-dev</p>
      </div>
      <p className="mb-2 text-xs">
        Skilled Software Engineer with 5+ years of experience in machine learning and full-stack web development. Proficient in Python (Pandas, NumPy, Scikit-learn, PyTorch, YOLOv8), SQL, and React, with expertise in building scalable ML models, data pipelines, and responsive web applications. Passionate about leveraging data-driven insights to solve complex problems.
      </p>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Education</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div className="mt-2">
          <div className="flex flex-row justify-between mb-0.5">
            <h4 className="font-semibold">
              Massachusetts Institute of Technology
            </h4>
            <p>Sep 2015 - May 2019</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Bachelor of Science in Computer Science and Artificial Intelligence</p>
            <p>GPA: 3.9/4.0</p>
          </div>
        </div>
      </div>
      <div className="mb-3 text-gray-700">
        <h3 className="font-bold py-1 text-blue-500">Work Experience</h3>
        <div className="h-0.25 w-full bg-black"></div>
        <div className="mt-2">
          <h4 className="font-semibold">Machine Learning Engineer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">DataWave Technologies</p>
            <p>Jul 2020 - Present</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed and deployed end-to-end ML models using PyTorch and YOLOv8 for real-time object detection, improving system accuracy by 20%.</li>
            <li>Built data pipelines with Pandas and SQL, processing 10TB+ datasets for predictive analytics.</li>
            <li>Created interactive dashboards with Streamlit, enabling stakeholders to monitor KPIs in real-time.</li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Software Developer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">TechTrend Innovations</p>
            <p>Jun 2018 - Jun 2020</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed responsive web applications using React, Node.js, and MongoDB, enhancing user engagement by 30%.</li>
            <li>Optimized backend APIs with Express, reducing latency by 15% through efficient query design.</li>
            <li>Contributed to agile sprints, conducting code reviews and improving codebase quality.</li>
          </ul>
        </div>    
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Key Skills</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>
            <span className="font-semibold">Frontend:</span> HTML, CSS, JavaScript, React, Tailwind CSS
          </li>
          <li>
            <span className="font-semibold">Backend:</span> Node.js, Express, MongoDB, RESTful APIs
          </li>
          <li>
            <span className="font-semibold">Machine Learning:</span> Python, Pandas, NumPy, Scikit-learn, PyTorch, YOLOv8
          </li>
          <li>
            <span className="font-semibold">Tools:</span> Jupyter Notebook, PyCharm, Git, Docker, AWS
          </li>
        </ul>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Projects</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div>
          <div className="flex flex-row justify-items-start mb-0.5 space-x-1">
            <h4 className="font-semibold">Real-Time Object Detection System |</h4>
            <a href="https://github.com/johndoe-dev/object-detection" className="text-blue-500 text-style: underline">
              Project Link
            </a>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Built a real-time object detection system using YOLOv8 and PyTorch, achieving 85% accuracy on custom datasets.</li>
            <li>Deployed model on AWS EC2 with Streamlit for live demo, optimizing inference speed by 25%.</li>
          </ul>
        </div>
        <div className="mt-4">
          <div className="flex flex-row justify-items-start mb-0.5 space-x-1">
            <h4 className="font-semibold">E-commerce Web Application |</h4>
            <a href="https://github.com/johndoe-dev/ecommerce" className="text-blue-500 text-style: underline">
              Project Link
              <span className="text-gray-600 font-semibold"> |</span>
            </a>
            <a href="https://ecommerce.johndoe.dev" className="text-blue-500 text-style: underline">
              Live Deployment
            </a>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed a full-stack e-commerce platform with React, Node.js, Express, and MongoDB.</li>
            <li>Implemented JWT-based authentication and Stripe payment integration for secure transactions.</li>
          </ul>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Certifications</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>Deep Learning Specialization (Coursera)</li>
          <li>AWS Certified Machine Learning – Specialty</li>
          <li>Meta Front-End Developer Professional Certificate</li>
        </ul>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Achievements</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>Ranked in top 1% globally on Kaggle for image classification competition (2022).</li>
          <li>Solved 150+ problems on LeetCode, specializing in algorithms and data structures.</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate3;