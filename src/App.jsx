import './App.css'

function App() {

  return (
    <div className='flex flex-col w-full font-secondary'>
      <div className='flex flex-row w-full h-screen overflow-hidden'>
        <div className='flex flex-col p-4 w-4/5 items-start justify-end py-28'>
          <span className='text-5xl font-bold uppercase font-sans mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text'>Automation Consultant</span>
          <span className='bg-primary text-white uppercase text-md px-1 mb-3'>I&apos;m Bal Ranjith</span>
          <span>Structural engineer turned software developer. I help construction firms streamline processes with tech solutions.</span>
        </div>
      </div>

      {/* What we do and why */}
      <div className='flex flex-col w-full'>
        <div className='flex flex-col bg-primary text-white px-8 py-16 gap-8'>
          <div className='text-3xl'>Why we need this</div>
          <span>The construction industry, steeped in tradition, is slow to embrace new tech.</span>
          <span>Tight margins hinder training, leaving us behind industries that thrive on innovation. Manual processes and a lack of tech awareness limit our potential.</span>
          <span>While AI fears loom, we miss the opportunity to leverage it for efficiency gains, allowing larger corporations to outpace us.</span>
        </div>
        <div className='flex flex-col bg-white text-primary px-8 py-16 gap-8'>
          <div className='text-3xl'>How I can help</div>
          <span>As a former structural engineer turned software developer, I&apos;ve seen firsthand the inefficiencies plaguing the construction industry.</span>
          <span>I specialise in creating user-friendly, automated solutions that streamline processes, reduce manual labour, and boost efficiency.</span>
          <span>My apps have been deployed worldwide, benefiting firms of all sizes, generating savings of £1000s.</span>
        </div>
      </div>

      {/* Projects */}
      <div className='flex bg-secondary p-14 uppercase text-4xl text-primary'>
        My projects
      </div>

      <div className='flex min-h-screen flex-col p-8 text-primary gap-4'>
        <span className='text-3xl'>Hazard manager</span>
        <span>A hazard management tool that seamlessly integrates with industry-standard software like ArcGIS and Revit, providing a centralised hub for risk tracking and collaboration.</span>
        <span>By mapping hazards directly onto drawings or 3D models, teams can easily identify, assess, and mitigate potential risks throughout the project lifecycle.</span>
        <span>This intuitive tool eliminates the inefficiencies of manual tracking methods, ensuring enhanced safety and efficiency on construction sites.</span>
        <div className='flex-1 flex flex-row'>
          <img src='assets/Hazard - map.jpg' className='w-2/3 object-contain mix-blend-darken'/>
          <img src='assets/Hazard - model.jpg' className='w-1/2 object-contain place-self-end mix-blend-darken -ml-12'/>
        </div>
      </div>
       
      <div className='flex min-h-screen flex-col p-8 bg-primary text-white gap-4'>
        <span className='text-3xl'>AI drawing checking</span>
        <span>An AI powered drawing checker that streamlines the document review process.</span>
        <span>This tool automates the verification of essential details like revision numbers and statuses, eliminating the time-consuming manual checks.</span>
        <span>By leveraging machine learning, it accurately identifies and flags errors, saving countless hours and reducing project delays.</span>
        <span>This solution empowers engineering teams and document controllers to focus on high-value tasks, improving efficiency and reducing costs throughout the project lifecycle.</span>
        <img src="assets/drawing_checker.svg" alt="Drawing checker" />
      </div>

      <div className='flex min-h-screen flex-col p-8 text-primary gap-4'>
        <span className='text-3xl'>Digitising forms</span>
        <span>A streamlined workflow where manual processes are replaced by intuitive digital forms.</span>
        <span>By leveraging Autodesk Construction Cloud, this solution automates data collection, storage, and process execution.</span>
        <span>This empowers teams to focus on high-value tasks while streamlining operations.</span>
        <span>The user-friendly interface and seamless integration with ACC ensure a smooth transition to digital workflows, enhancing efficiency and productivity throughout the project lifecycle.</span>
        <img src="assets/digitising_forms.svg" alt="Digitising forms" />
      </div>

      <div className='flex min-h-screen flex-col p-8 bg-primary text-white gap-4'>
        <span className='text-3xl'>Automated exports</span>
        <span>A streamlined workflow where data transfer and formatting are automated.</span>
        <span>This solution, developed using VBA and Python, streamlines data collection, formatting, and distribution.</span>
        <span>By automating these routine tasks, you can free up your team&apos;s time for more strategic and value-added activities, improving efficiency and productivity.</span>
        <img src="assets/formatting.svg" alt="Formatting raw output of data to useful insights" className='brightness-0 invert mt-16' />
      </div>

      <div className='flex flex-col bg-secondary py-14 px-5 gap-10'>
        <span className='text-3xl text-white uppercase text-center'>What I use</span>
        <div className='flex flex-row flex-wrap min-gap-2 justify-evenly'>
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            <img src="assets/react.svg" alt="React" className="brightness-0 invert h-12" />
          </a>
          <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer">
            <img src="assets/python.svg" alt="Python" className="brightness-0 invert h-12" />
          </a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
            <img src="assets/javascript.svg" alt="JavaScript" className="brightness-0 invert h-12" />
          </a>
          <a href="https://azure.microsoft.com/en-us/" target="_blank" rel="noopener noreferrer">
            <img src="assets/azure.svg" alt="Microsoft Azure" className="brightness-0 invert h-12" />
          </a>
          <a href="https://www.autodesk.com/" target="_blank" rel="noopener noreferrer">
            <img src="assets/autodesk.svg" alt="Autodesk" className="brightness-0 invert h-12" />
          </a>
          <a href="https://products.office.com/en-us/sharepoint/online" target="_blank" rel="noopener noreferrer">
            <img src="assets/sharepoint.svg" alt="SharePoint" className="brightness-0 invert h-12" />
          </a>
        </div>
      </div>

      <div className='flex flex-col bg-accent py-14 px-5 gap-8 items-center'>
        <span className='text-3xl text-white uppercase text-center'>Get in touch</span>
        <div className='flex flex-col gap-3 text-sm font-light'>
          <a href="mailto:balgovind.ranjith@gmail.com" className='flex flex-row gap-3'>
            <img src="assets/mail.svg" alt="Email" className="brightness-0 invert h-6" />
            <span className='text-white font-light'>balgovind.ranjith@gmail.com</span>
          </a>
          <a href="tel:+447401996138" className='flex flex-row gap-3'>
            <img src="assets/call.svg" alt="Phone number" className="brightness-0 invert h-6" />
            <span className='text-white font-light'>+44 7401 996 138</span>
          </a>
          <div className='flex flex-row gap-3'>
            <img src="assets/location.svg" alt="Location" className="brightness-0 invert h-6" />
            <span className='text-white'>London, UK</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
