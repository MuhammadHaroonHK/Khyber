// D:\khyber\src\pages\AcademicsPage.jsx
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
    { name: 'Preschool', classes: 'Play Group – Prep', desc: 'Early learning foundation and childhood development.' },
    { name: 'Primary School', classes: 'Class I – V', desc: 'Core academic literacy and base analytical skills.' },
    { name: 'Middle School', classes: 'Class VI – VIII', desc: 'Critical reasoning and structural subject tracking.' },
    { name: 'Secondary School', classes: 'Class IX – X', desc: 'Board exam preparation for higher metrics pathways.' },
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
    { title: 'Seat Availability', text: 'All seat offers are subject to final registration timelines and vacancy limits.' },
    { title: 'Admission Assessment', text: 'Applicants must clear age-appropriate assessment modules matching literacy benchmarks.' },
    { title: 'Parent Interview', text: 'Parents/guardians are invited for a meeting to synchronize developmental milestones.' },
    { title: 'Academic History', text: 'Verified past transfer records and transcript cards must be provided for advanced entry.' },
  ],

  testSubjects: [
    { level: 'Prep – Class II', subjects: 'English, Mathematics', focus: 'Basic Diagnostic' },
    { level: 'Class III – V', subjects: 'English, Urdu, Mathematics', focus: 'Foundational Skill Check' },
    { level: 'Class VI – VIII', subjects: 'English, Urdu, Mathematics, Science', focus: 'Core Competency Evaluation' },
    { level: 'Class IX – X', subjects: 'English, Mathematics, Science', focus: 'Secondary Board Mapping' },
  ],

  admissionSteps: [
    { step: 'Complete the registration form.', description: 'Fill out online portal or collect physical application.', icon: FileText },
    { step: 'Submit the required documents.', description: 'Provide B-Form copies, photos, and past report cards.', icon: ClipboardCheck },
    { step: 'Appear in the admission assessment.', description: 'Scheduled logic and foundational basic subjects test.', icon: Calendar },
    { step: 'Attend a parent/student interview.', description: 'Interactive conversation with our evaluation panel.', icon: Users },
    { step: 'Receive admission confirmation.', description: 'Formal notification issued within 3 working days.', icon: UserCheck },
    { step: 'Submit the admission fee.', description: 'Secure your classroom seat allocation via designated bank branch.', icon: Award },
    { step: 'Start your academic journey.', description: 'Orientation session and formal class schedule commencement.', icon: Sparkles },
  ]
};

const tabs = [
  { id: 'levels', label: 'Academic Levels' },
  { id: 'age-criteria', label: 'Age Eligibility' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'process', label: 'Admission Process' },
];

// ─── Sub-components ──────────────────────────────────────────────

const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={`px-5 py-3 text-sm font-semibold transition-all duration-300 rounded-xl relative ${
      isActive
        ? 'text-white shadow-lg shadow-[#001830]/10'
        : 'text-gray-500 hover:text-[#001830] hover:bg-gray-50'
    }`}
  >
    {isActive && (
      <motion.div
        layoutId="activeTabIndicator"
        className="absolute inset-0 bg-[#001830] rounded-xl -z-10"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
    {tab.label}
  </button>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="px-4 py-1.5 rounded-full bg-[#0068A8]/10 text-[#0068A8] font-bold text-xs uppercase tracking-widest inline-block"
    >
      Admissions
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-black text-[#001830] mt-4 tracking-tight"
    >
      {title}
    </motion.h2>
    <div className="w-16 h-1 bg-[#188454] mx-auto mt-4 rounded-full" />
    <motion.p 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-gray-500 max-w-2xl mx-auto mt-4 text-base md:text-lg font-medium"
    >
      {subtitle}
    </motion.p>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────
const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState('levels');

  const renderContent = () => {
    switch (activeTab) {
      case 'levels': return <LevelsTab />;
      case 'age-criteria': return <AgeCriteriaTab />;
      case 'requirements': return <RequirementsTab />;
      case 'assessment': return <AssessmentTab />;
      case 'process': return <ProcessTab />;
      default: return null;
    }
  };

  return (
    <section id="academics" className="py-20 md:py-32 bg-[#FAFBFD] relative overflow-hidden min-h-screen">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0068A8]/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#188454]/5 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <SectionHeader 
          title="Academic Framework"
          subtitle="Explore entry criteria, procedural timelines, and structural education pathways designed for exceptional learners."
        />

        {/* Tab Switcher */}
        <div className="bg-white p-2 rounded-2xl shadow-xs border border-gray-100 max-w-3xl mx-auto mb-12 flex flex-wrap gap-1 justify-center overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={setActiveTab}
            />
          ))}
        </div>

        {/* Content Render Stage */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ─── Refactored Modern Table Components ───────────────────────────

const LevelsTab = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#001830] text-white">
            <th className="p-4 text-sm font-semibold tracking-wide uppercase">Academic Level</th>
            <th className="p-4 text-sm font-semibold tracking-wide uppercase">Assigned Classes</th>
            <th className="p-4 text-sm font-semibold tracking-wide uppercase">Curriculum Scope</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {academicsData.levels.map((level, index) => (
            <tr key={index} className="hover:bg-gray-50/70 transition-colors">
              <td className="p-4 font-bold text-[#001830] text-sm md:text-base">{level.name}</td>
              <td className="p-4 text-sm font-medium text-[#0068A8] whitespace-nowrap">{level.classes}</td>
              <td className="p-4 text-sm text-gray-500 leading-relaxed">{level.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AgeCriteriaTab = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
      <h3 className="text-base font-bold text-[#001830]">Age Threshold Matrix</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-[#001830] border-b border-gray-200">
            <th className="p-4 text-xs font-bold uppercase tracking-wider">Class Target</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-right">Minimum Age Cutoff</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {academicsData.ageCriteria.map((item, index) => (
            <tr key={index} className="hover:bg-[#0068A8]/5 transition-colors duration-150">
              <td className="p-4 text-sm font-bold text-gray-700">{item.class}</td>
              <td className="p-4 text-sm font-extrabold text-[#188454] text-right whitespace-nowrap">{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RequirementsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {academicsData.requirements.map((req, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start"
      >
        <div className="w-8 h-8 rounded-lg bg-[#188454]/10 flex items-center justify-center text-[#188454] flex-shrink-0">
          <ChevronRight className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-[#001830] mb-1">{req.title}</h4>
          <p className="text-gray-500 text-sm leading-relaxed">{req.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const AssessmentTab = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#001830] text-white">
            <th className="p-4 text-sm font-semibold tracking-wide uppercase">Class Level</th>
            <th className="p-4 text-sm font-semibold tracking-wide uppercase">Evaluation Subjects</th>
            <th className="p-4 text-sm font-semibold tracking-wide uppercase">Assessment Objective</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {academicsData.testSubjects.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50/70 transition-colors">
              <td className="p-4 font-bold text-[#001830] text-sm whitespace-nowrap">{item.level}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.subjects.split(', ').map((subject, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-[#001830] rounded text-xs font-bold uppercase tracking-wider">
                      {subject}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.focus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProcessTab = () => (
  <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-8 py-2">
    {academicsData.admissionSteps.map((item, index) => {
      const Icon = item.icon;
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="relative pl-8 md:pl-10 group"
        >
          {/* Timeline Dot Indicator */}
          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:border-[#001830] group-hover:text-[#001830] transition-colors duration-300 shadow-xs z-10">
            {index + 1}
          </div>
          
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#188454] group-hover:bg-[#001830] group-hover:text-white transition-all duration-300">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#001830]">{item.step}</h4>
              <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

export default AcademicsPage;