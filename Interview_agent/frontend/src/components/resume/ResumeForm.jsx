import React from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

function FormInput({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value ?? ''}
        className="bg-[#070B14] border border-white/10 text-slate-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
      />
    </div>
  )
}

function FormTextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value ?? ''}
        rows={rows}
        className="bg-[#070B14] border border-white/10 text-slate-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600 resize-none font-sans leading-relaxed"
      />
    </div>
  )
}

function EntryCard({ children, onRemove }) {
  return (
    <div className="relative overflow-hidden bg-[#070B14] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-md">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-rose-500/20 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Remove entry"
      >
        <FiTrash2 size={13} />
      </button>
      <div className="relative flex flex-col gap-3 pr-6">{children}</div>
    </div>
  )
}

export function ResumeForm({ step, data, setData }) {
  if (step === 1) {
    return (
      <div className="flex flex-col gap-3.5">
        <FormInput
          label="Full Name"
          placeholder="e.g. Alex Vance"
          onChange={(v) => setData({ ...data, name: v })}
          value={data.name}
        />

        <FormInput
          label="Email Address"
          placeholder="alex@example.com"
          onChange={(v) => setData({ ...data, email: v })}
          value={data.email}
        />

        <FormInput
          label="Phone Number"
          placeholder="+1 (555) 019-2834"
          onChange={(v) => setData({ ...data, phone: v })}
          value={data.phone}
        />

        <FormInput
          label="Location"
          placeholder="San Francisco, CA"
          onChange={(v) => setData({ ...data, location: v })}
          value={data.location}
        />

        <FormInput
          label="LinkedIn Profile"
          placeholder="linkedin.com/in/alexvance"
          onChange={(v) => setData({ ...data, linkedin: v })}
          value={data.linkedin}
        />

        <FormInput
          label="GitHub Profile"
          placeholder="github.com/alexvance"
          value={data.github}
          onChange={(v) => setData({ ...data, github: v })}
        />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-3.5">
        <FormTextArea
          label="Professional Summary"
          placeholder="Backend Engineer with 3+ years of experience building scalable microservices in Node.js and Go..."
          rows={6}
          onChange={(v) => setData({ ...data, summary: v })}
          value={data.summary}
        />
        <p className="text-[11px] font-mono text-slate-500">
          Tip: Highlight your primary technical stack, years of experience, and a notable accomplishment.
        </p>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="flex flex-col gap-3.5">
        <FormTextArea
          label="Technical & Core Skills (Comma Separated)"
          placeholder="TypeScript, React, Node.js, Express, PostgreSQL, Redis, Docker, Kubernetes, AWS, System Design"
          rows={5}
          onChange={(v) => setData({ ...data, skills: v })}
          value={data.skills}
        />
        <p className="text-[11px] font-mono text-slate-500">
          Separate each skill with a comma. ATS parsers match keywords against job requisitions.
        </p>
      </div>
    )
  }

  if (step === 4) {
    const addExp = () => {
      setData({
        ...data,
        experience: [
          ...(data.experience || []),
          { company: '', role: '', duration: '', description: '' },
        ],
      })
    }

    const removeExp = (index) => {
      setData({
        ...data,
        experience: data.experience.filter((_, i) => i !== index),
      })
    }

    const updateExp = (index, field, value) => {
      const updated = data.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
      setData({ ...data, experience: updated })
    }

    return (
      <div className="flex flex-col gap-3.5">
        {(!data.experience || data.experience.length === 0) && (
          <div className="text-center py-6 px-4 rounded-xl border border-dashed border-white/10 text-xs text-slate-500 font-mono">
            No work experience logged yet. Click below to add an entry.
          </div>
        )}

        {data.experience?.map((exp, index) => (
          <EntryCard key={index} onRemove={() => removeExp(index)}>
            <FormInput
              label="Company Name"
              placeholder="e.g. Acme Corp"
              onChange={(v) => updateExp(index, 'company', v)}
              value={exp.company}
            />
            <FormInput
              label="Job Role / Title"
              placeholder="Senior Software Engineer"
              onChange={(v) => updateExp(index, 'role', v)}
              value={exp.role}
            />
            <FormInput
              label="Duration"
              placeholder="Jan 2022 – Present"
              onChange={(v) => updateExp(index, 'duration', v)}
              value={exp.duration}
            />
            <FormTextArea
              label="Key Responsibilities & Impact"
              placeholder={'• Spearheaded REST API migration to microservices\n• Reduced p99 latency by 45%'}
              rows={4}
              onChange={(v) => updateExp(index, 'description', v)}
              value={exp.description}
            />
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addExp}
          className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all cursor-pointer"
        >
          <FiPlus size={14} /> Add Experience Entry
        </button>
      </div>
    )
  }

  if (step === 5) {
    const addPro = () => {
      setData({
        ...data,
        projects: [
          ...(data.projects || []),
          { name: '', techStack: '', github: '', description: '' },
        ],
      })
    }

    const removePro = (index) => {
      setData({
        ...data,
        projects: data.projects.filter((_, i) => i !== index),
      })
    }

    const updatePro = (index, field, value) => {
      const updated = data.projects.map((pro, i) =>
        i === index ? { ...pro, [field]: value } : pro
      )
      setData({ ...data, projects: updated })
    }

    return (
      <div className="flex flex-col gap-3.5">
        {(!data.projects || data.projects.length === 0) && (
          <div className="text-center py-6 px-4 rounded-xl border border-dashed border-white/10 text-xs text-slate-500 font-mono">
            No projects added yet. Click below to showcase a project.
          </div>
        )}

        {data.projects?.map((pro, index) => (
          <EntryCard key={index} onRemove={() => removePro(index)}>
            <FormInput
              label="Project Title"
              placeholder="e.g. Distributed Task Queue"
              onChange={(v) => updatePro(index, 'name', v)}
              value={pro.name}
            />
            <FormInput
              label="Technologies Used"
              placeholder="React, Go, Redis, Docker"
              value={pro.techStack}
              onChange={(v) => updatePro(index, 'techStack', v)}
            />
            <FormInput
              label="GitHub Repository / Live Demo"
              placeholder="github.com/alexvance/task-queue"
              value={pro.github}
              onChange={(v) => updatePro(index, 'github', v)}
            />
            <FormTextArea
              label="Project Description & Metrics"
              placeholder="Architected an event-driven task distribution worker handling 10k jobs/sec."
              rows={3}
              value={pro.description}
              onChange={(v) => updatePro(index, 'description', v)}
            />
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addPro}
          className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all cursor-pointer"
        >
          <FiPlus size={14} /> Add Project Entry
        </button>
      </div>
    )
  }

  if (step === 6) {
    const addEdu = () => {
      setData({
        ...data,
        education: [
          ...(data.education || []),
          { college: '', degree: '', branch: '', cgpa: '', year: '' },
        ],
      })
    }

    const removeEdu = (index) => {
      setData({
        ...data,
        education: data.education.filter((_, i) => i !== index),
      })
    }

    const updateEdu = (index, field, value) => {
      const updated = data.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
      setData({ ...data, education: updated })
    }

    return (
      <div className="flex flex-col gap-3.5">
        {(!data.education || data.education.length === 0) && (
          <div className="text-center py-6 px-4 rounded-xl border border-dashed border-white/10 text-xs text-slate-500 font-mono">
            No education history added yet. Click below to add an entry.
          </div>
        )}

        {data.education?.map((edu, index) => (
          <EntryCard key={index} onRemove={() => removeEdu(index)}>
            <FormInput
              label="College / University"
              placeholder="University of California, Berkeley"
              value={edu.college}
              onChange={(v) => updateEdu(index, 'college', v)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Degree"
                placeholder="B.S."
                value={edu.degree}
                onChange={(v) => updateEdu(index, 'degree', v)}
              />
              <FormInput
                label="Major / Branch"
                placeholder="Computer Science"
                value={edu.branch}
                onChange={(v) => updateEdu(index, 'branch', v)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="GPA / Score"
                placeholder="3.85 / 4.0"
                value={edu.cgpa}
                onChange={(v) => updateEdu(index, 'cgpa', v)}
              />
              <FormInput
                label="Graduation Year / Duration"
                placeholder="2020 – 2024"
                value={edu.year}
                onChange={(v) => updateEdu(index, 'year', v)}
              />
            </div>
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addEdu}
          className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all cursor-pointer"
        >
          <FiPlus size={14} /> Add Education Entry
        </button>
      </div>
    )
  }

  return null
}

export default ResumeForm
