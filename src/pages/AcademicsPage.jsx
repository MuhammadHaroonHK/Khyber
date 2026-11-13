import { useState } from "react";
import {
  Users,
  ClipboardCheck,
  Calendar,
  ChevronRight,
  UserCheck,
  FileText,
  Award,
  Sparkles,
} from "lucide-react";
import { Reveal } from "../components/Reveal";

const academicsData = {
  levels: [
    { name: "Preschool", classes: "Play Group – Prep", desc: "Early learning foundation and childhood development." },
    { name: "Primary School", classes: "Class I – V", desc: "Core academic literacy and base analytical skills." },
    { name: "Middle School", classes: "Class VI – VIII", desc: "Critical reasoning and structural subject tracking." },
    { name: "Secondary School", classes: "Class IX – X", desc: "Board exam preparation for higher metrics pathways." },
  ],
  ageCriteria: [
    { class: "Play Group", age: "2.5+ Years" },
    { class: "Nursery", age: "3+ Years" },
    { class: "Prep", age: "4+ Years" },
    { class: "Class I", age: "5+ Years" },
    { class: "Class II", age: "6+ Years" },
    { class: "Class III", age: "7+ Years" },
    { class: "Class IV", age: "8+ Years" },
    { class: "Class V", age: "9+ Years" },
    { class: "Class VI", age: "10+ Years" },
    { class: "Class VII", age: "11+ Years" },
    { class: "Class VIII", age: "12+ Years" },
    { class: "Class IX", age: "13+ Years" },
    { class: "Class X", age: "14+ Years" },
  ],
  requirements: [
    { title: "Seat Availability", text: "All seat offers are subject to final registration timelines and vacancy limits." },
    { title: "Admission Assessment", text: "Applicants must clear age-appropriate assessment modules matching literacy benchmarks." },
    { title: "Parent Interview", text: "Parents/guardians are invited for a meeting to synchronize developmental milestones." },
    { title: "Academic History", text: "Verified past transfer records and transcript cards must be provided for advanced entry." },
  ],
  testSubjects: [
    { level: "Prep – Class II", subjects: "English, Mathematics", focus: "Basic Diagnostic" },
    { level: "Class III – V", subjects: "English, Urdu, Mathematics", focus: "Foundational Skill Check" },
    { level: "Class VI – VIII", subjects: "English, Urdu, Mathematics, Science", focus: "Core Competency Evaluation" },
    { level: "Class IX – X", subjects: "English, Mathematics, Science", focus: "Secondary Board Mapping" },
  ],
  admissionSteps: [
    { step: "Complete the registration form.", description: "Fill out online portal or collect physical application.", icon: FileText },
    { step: "Submit the required documents.", description: "Provide B-Form copies, photos, and past report cards.", icon: ClipboardCheck },
    { step: "Appear in the admission assessment.", description: "Scheduled logic and foundational basic subjects test.", icon: Calendar },
    { step: "Attend a parent/student interview.", description: "Interactive conversation with our evaluation panel.", icon: Users },
    { step: "Receive admission confirmation.", description: "Formal notification issued within 3 working days.", icon: UserCheck },
    { step: "Submit the admission fee.", description: "Secure your classroom seat allocation via designated bank branch.", icon: Award },
    { step: "Start your academic journey.", description: "Orientation session and formal class schedule commencement.", icon: Sparkles },
  ],
};

const tabs = [
  { id: "levels", label: "Academic Levels" },
  { id: "age-criteria", label: "Age Eligibility" },
  { id: "requirements", label: "Requirements" },
  { id: "assessment", label: "Assessment" },
  { id: "process", label: "Admission Process" },
];

const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState("levels");

  return (
    <section id="academics" className="py-24 md:py-32 bg-[#FAFBFD] min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header (Immediate paint for fast LCP) */}
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 rounded-full bg-[#0068A8]/10 text-[#0068A8] font-bold text-xs uppercase tracking-widest inline-block">
            Admissions
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#001830] mt-4 tracking-tight">
            Academic Framework
          </h1>
          <div className="w-16 h-1 bg-[#188454] mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Explore entry criteria, procedural timelines, and structural education pathways designed for exceptional learners.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          role="tablist"
          aria-label="Academic information sections"
          className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200/70 max-w-3xl mx-auto mb-10 flex flex-wrap gap-1.5 justify-center"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors duration-150 rounded-xl ${
                  isActive
                    ? "bg-[#001830] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#001830] hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Stage */}
        <div className="min-h-[380px]">
          {activeTab === "levels" && <LevelsTab />}
          {activeTab === "age-criteria" && <AgeCriteriaTab />}
          {activeTab === "requirements" && <RequirementsTab />}
          {activeTab === "assessment" && <AssessmentTab />}
          {activeTab === "process" && <ProcessTab />}
        </div>
      </div>
    </section>
  );
};

const LevelsTab = () => (
  <Reveal variant="zoom-in" duration={450}>
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
            {academicsData.levels.map((level) => (
              <tr key={level.name} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-4 font-bold text-[#001830] text-sm md:text-base">{level.name}</td>
                <td className="p-4 text-sm font-medium text-[#0068A8] whitespace-nowrap">{level.classes}</td>
                <td className="p-4 text-sm text-gray-600 leading-relaxed">{level.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Reveal>
);

const AgeCriteriaTab = () => (
  <Reveal variant="zoom-in" duration={450}>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-base font-bold text-[#001830]">Age Threshold Matrix</h2>
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
            {academicsData.ageCriteria.map((item) => (
              <tr key={item.class} className="hover:bg-[#0068A8]/5 transition-colors">
                <td className="p-4 text-sm font-bold text-gray-700">{item.class}</td>
                <td className="p-4 text-sm font-extrabold text-[#188454] text-right whitespace-nowrap">{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Reveal>
);

const RequirementsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {academicsData.requirements.map((req, index) => (
      <Reveal
        key={req.title}
        variant={index % 2 === 0 ? "slide-left" : "slide-right"}
        delay={index * 75}
        className="h-full"
      >
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start h-full transition-shadow duration-200 hover:shadow-md">
          <div className="w-8 h-8 rounded-lg bg-[#188454]/10 flex items-center justify-center text-[#188454] flex-shrink-0">
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#001830] mb-1">{req.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{req.text}</p>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

const AssessmentTab = () => (
  <Reveal variant="zoom-in" duration={450}>
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
            {academicsData.testSubjects.map((item) => (
              <tr key={item.level} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-4 font-bold text-[#001830] text-sm whitespace-nowrap">{item.level}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.subjects.split(", ").map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-gray-100 text-[#001830] rounded text-xs font-bold uppercase tracking-wider"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{item.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Reveal>
);

const ProcessTab = () => (
  <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-6 py-2">
    {academicsData.admissionSteps.map((item, index) => {
      const Icon = item.icon;
      return (
        <Reveal
          key={item.step}
          variant="fade-up"
          delay={index * 65}
          duration={450}
        >
          <div className="relative pl-8 md:pl-10">
            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#0068A8] flex items-center justify-center text-xs font-bold text-[#001830] shadow-xs">
              {index + 1}
            </div>
            <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 transition-shadow duration-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#188454] flex-shrink-0">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-bold text-sm md:text-base text-[#001830]">{item.step}</h2>
                <p className="text-xs md:text-sm text-gray-600 mt-0.5">{item.description}</p>
              </div>
            </div>
          </div>
        </Reveal>
      );
    })}
  </div>
);

export default AcademicsPage;