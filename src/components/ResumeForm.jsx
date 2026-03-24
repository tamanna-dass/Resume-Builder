import React, { useState } from 'react';

function ResumeForm({ data, onChange, onArrayAdd, onArrayRemove }) {
  const [skillInput, setSkillInput] = useState('');
  const [skillWarning, setSkillWarning] = useState('');
  const [suggestion, setSuggestion] = useState('');

  // Auto capitalization suggestion logic for skills
  const handleSkillChange = (e) => {
    const val = e.target.value;
    setSkillInput(val);

    // Simple auto-capitalization suggestion
    if (val.length > 0 && val === val.toLowerCase()) {
      const suggested = val.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (suggested !== val) {
        setSuggestion(suggested);
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }

    // Check for duplicates
    if (data.skills.map(s => s.toLowerCase()).includes(val.toLowerCase())) {
      setSkillWarning('Warning: You have already added this skill!');
    } else {
      setSkillWarning('');
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    
    // Check duplicate again on add
    if (data.skills.map(s => s.toLowerCase()).includes(skillInput.trim().toLowerCase())) {
      setSkillWarning('Skill already exists!');
      return;
    }

    // Add to data
    onArrayAdd('skills', skillInput.trim());
    setSkillInput('');
    setSuggestion('');
    setSkillWarning('');
  };

  const applySuggestion = (e) => {
    e.preventDefault();
    setSkillInput(suggestion);
    setSuggestion('');
  };

  return (
    <div>
      <h2>Personal Details</h2>
      <div className="repeating-item">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={data.profile.fullName}
            onChange={(e) => onChange('profile', 'fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={data.profile.email}
            onChange={(e) => onChange('profile', 'email', e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={data.profile.phone}
            onChange={(e) => onChange('profile', 'phone', e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label>Summary / Objective</label>
          <textarea
            rows="4"
            value={data.profile.summary}
            onChange={(e) => onChange('profile', 'summary', e.target.value)}
            placeholder="A brief about yourself..."
          ></textarea>
        </div>
      </div>

      <h2>Education</h2>
      {data.education.map((edu, index) => (
        <div key={index} className="repeating-item">
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => onChange('education', 'institution', e.target.value, index)}
              placeholder="University Name"
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => onChange('education', 'degree', e.target.value, index)}
              placeholder="B.S. in Computer Science"
            />
          </div>
          <div className="form-group">
            <label>Years</label>
            <input
              type="text"
              value={edu.years}
              onChange={(e) => onChange('education', 'years', e.target.value, index)}
              placeholder="2018 - 2022"
            />
          </div>
          <button className="btn btn-danger" onClick={() => onArrayRemove('education', index)}>Remove Education</button>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => onArrayAdd('education', { institution: '', degree: '', years: '' })}>
        + Add Education
      </button>

      <h2 style={{ marginTop: '2rem' }}>Experience</h2>
      {data.experience.map((exp, index) => (
        <div key={index} className="repeating-item">
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => onChange('experience', 'company', e.target.value, index)}
              placeholder="Company Name"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={exp.role}
              onChange={(e) => onChange('experience', 'role', e.target.value, index)}
              placeholder="Software Engineer"
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              value={exp.duration}
              onChange={(e) => onChange('experience', 'duration', e.target.value, index)}
              placeholder="Jan 2020 - Present"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={exp.description}
              onChange={(e) => onChange('experience', 'description', e.target.value, index)}
              placeholder="What did you do?"
            ></textarea>
          </div>
          <button className="btn btn-danger" onClick={() => onArrayRemove('experience', index)}>Remove Experience</button>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => onArrayAdd('experience', { company: '', role: '', duration: '', description: '' })}>
        + Add Experience
      </button>

      <h2 style={{ marginTop: '2rem' }}>Skills</h2>
      <div className="repeating-item">
        <div className="form-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            value={skillInput}
            onChange={handleSkillChange}
            placeholder="e.g. React"
          />
          <button className="btn" onClick={addSkill}>Add</button>
        </div>
        
        {suggestion && (
          <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            Did you mean: <button className="btn-secondary" style={{ padding: '0.2rem 0.5rem', marginLeft: '0.5rem' }} onClick={applySuggestion}>{suggestion}</button>?
          </div>
        )}

        {skillWarning && <span className="warning">{skillWarning}</span>}

        <div className="skills-list" style={{ marginTop: '1rem' }}>
          {data.skills.map((skill, index) => (
            <div key={index} className="skill-badge">
              {skill}
              <button
                style={{ marginLeft: '0.5rem', cursor: 'pointer', border: 'none', background: 'transparent', color: '#e74c3c' }}
                onClick={() => onArrayRemove('skills', index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <br/> <br/>
    </div>
  );
}

export default ResumeForm;
