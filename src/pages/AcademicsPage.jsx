// src/components/Academics.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  ClipboardCheck,
  Calendar,
  ChevronRight,
  School,
  UserCheck,
  FileText,
  Award,
  Sparkles
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────
const academicsData = {
  levels: [
    { name: 'Preschool', classes: 'Play Group – Prep', icon: School },
    { name: 'Primary School', classes: 'Class I – V', icon: BookOpen },
    { name: 'Middle School', classes: 'Class VI – VIII', icon: Users },
    { name: 'Secondary School', classes: 'Class IX – X', icon: GraduationCap },
  ],
  
  ageCriteria: [
    { class: 'Play Group', age: '2.5+ Years' },
    { class: 'Nursery', age: '3+ Years' },
    { class: 'Prep', age: '4+ Years' },
    { class: 'Class I', age: '5+ Years' },
    { class: 'Class II', age: '6+ Years' },
    { class: 'Class III', age: '7+ Years' },
    { class: 'Class IV', age: '8+ Years' },
    { class: 'Class V', age: '9+ Years' },
    { class: 'Class VI', age: '10+ Years' },
    { class: 'Class VII', age: '11+ Years' },
    { class: 'Class VIII', age: '12+ Years' },
    { class: 'Class IX', age: '13+ Years' },
    { class: 'Class X', age: '14+ Years' },
  ],

  requirements: [
    'Seats are offered subject to availability.',
    'Applicants may be required to complete an admission assessment.',
    'Parents or guardians may be invited for an interview.',
    'Previous academic records may be requested for higher classes.',
  ],

  testSubjects: [
    { level: 'Prep – Class II', subjects: 'English, Mathematics' },
    { level: 'Class III – V', subjects: 'English, Urdu, Mathematics' },
    { level: 'Class VI – VIII', subjects: 'English, Urdu, Mathematics, Science' },
    { level: 'Class IX – X', subjects: 'English, Mathematics, Science' },
  ],

  admissionSteps: [
    { step: 'Complete the registration form.', icon: FileText },
    { step: 'Submit the required documents.', icon: ClipboardCheck },
    { step: 'Appear in the admission assessment.', icon: Calendar },
    { step: 'Attend a parent/student interview.', icon: Users },
    { step: 'Receive admission confirmation.', icon: UserCheck },
    { step: 'Submit the admission fee.', icon: Award },
    { step: 'Start your academic journey.', icon: Sparkles },
  ]
};

// ─── Tabs Data ────────────────────────────────────────────────────
const tabs = [
  { id: 'levels', label: 'Academic Levels' },
  { id: 'age-criteria', label: 'Age Eligibility' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'process', label: 'Process' },
];

// ─── Sub-components ──────────────────────────────────────────────

// Tab Button Component
const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-lg ${
      isActive
        ? 'bg-[#001830] text-white shadow-md shadow-[#001830]/20'
        : 'text-gray-600 hover:text-[#001830] hover:bg-[#001830]/5'
    }`}
  >
    {tab.label}
  </button>
);

// Section Header Component
const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <span className="text-[#0068A8] font-semibold text-sm uppercase tracking-wider">
      Admissions
    </span>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001830] mt-2">
      {title}
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
      {subtitle}
    </p>
  </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────
const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState('levels');

  const renderContent = () => {
    switch (activeTab) {
      case 'levels':
        return <LevelsTab />;
      case 'age-criteria':
        return <AgeCriteriaTab />;
      case 'requirements':
        return <RequirementsTab />;
      case 'assessment':
        return <AssessmentTab />;
      case 'process':
        return <ProcessTab />;
      default:
        return null;
    }
  };

  return (
    <section id="academics" className="py-16 md:py-28 bg-white relative overflow-hidden">
      
      {/* Background Decorative Elements - Very Subtle */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#001830]/3 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#E4E454]/3 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <SectionHeader 
          title="Admissions"
          subtitle="Join our academic community and embark on a journey of excellence"
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={setActiveTab}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

// ─── Tab Components ──────────────────────────────────────────────

// Academic Levels Tab
const LevelsTab = () => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
    <h3 className="text-xl font-bold text-[#001830] mb-6">Academic Levels</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#001830] text-white">
            <th className="p-3 text-left rounded-tl-lg">Level</th>
            <th className="p-3 text-left">Classes</th>
            <th className="p-3 text-left rounded-tr-lg">Description</th>
          </tr>
        </thead>
        <tbody>
          {academicsData.levels.map((level, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-[#f8f9ff] transition-colors">
              <td className="p-3 font-medium text-[#001830]">{level.name}</td>
              <td className="p-3 text-gray-600">{level.classes}</td>
              <td className="p-3 text-gray-500 text-sm">
                {level.name === 'Preschool' && 'Early childhood education foundation'}
                {level.name === 'Primary School' && 'Building core academic skills'}
                {level.name === 'Middle School' && 'Developing critical thinking'}
                {level.name === 'Secondary School' && 'Preparing for higher education'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Age Criteria Tab
const AgeCriteriaTab = () => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
    <h3 className="text-xl font-bold text-[#001830] mb-6">Age Eligibility Criteria</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#001830] text-white">
            <th className="p-3 text-left rounded-tl-lg">Class</th>
            <th className="p-3 text-left rounded-tr-lg">Minimum Age</th>
          </tr>
        </thead>
        <tbody>
          {academicsData.ageCriteria.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-[#f8f9ff] transition-colors">
              <td className="p-3 font-medium text-[#001830]">{item.class}</td>
              <td className="p-3 text-gray-600">{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Requirements Tab
const RequirementsTab = () => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
    <h3 className="text-xl font-bold text-[#001830] mb-6">Admission Requirements</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {academicsData.requirements.map((req, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 bg-[#f8f9ff] p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <div className="w-6 h-6 rounded-full bg-[#188454]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ChevronRight className="w-4 h-4 text-[#188454]" />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{req}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// Assessment Tab
const AssessmentTab = () => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
    <h3 className="text-xl font-bold text-[#001830] mb-6">Admission Assessment</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#001830] text-white">
            <th className="p-3 text-left rounded-tl-lg">Class Level</th>
            <th className="p-3 text-left rounded-tr-lg">Assessment Subjects</th>
          </tr>
        </thead>
        <tbody>
          {academicsData.testSubjects.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-[#f8f9ff] transition-colors">
              <td className="p-3 font-medium text-[#001830]">{item.level}</td>
              <td className="p-3 text-gray-600">{item.subjects}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Process Tab
const ProcessTab = () => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
    <h3 className="text-xl font-bold text-[#001830] mb-6">Admission Process</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {academicsData.admissionSteps.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          className="flex items-center gap-4 bg-[#f8f9ff] p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#001830]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#001830] transition-colors duration-300">
            <span className="text-sm font-bold text-[#001830] group-hover:text-white transition-colors duration-300">
              {index + 1}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-[#188454] flex-shrink-0" />
              <p className="text-gray-600 text-sm leading-relaxed">{item.step}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AcademicsPage;