import React from 'react';

function ResumePreview({ data }) {
  return (
    <div className="resume-paper" id="resume-pdf-container">
      <h1>{data.profile.fullName || 'Your Name'}</h1>
      
      <div className="resume-contact">
        {data.profile.email && <span>{data.profile.email} </span>}
        {data.profile.phone && <span>| {data.profile.phone}</span>}
      </div>

      {data.profile.summary && (
        <>
          <h2>Summary</h2>
          <p>{data.profile.summary}</p>
        </>
      )}

      {data.experience.length > 0 && (
        <>
          <h2>Experience</h2>
          {data.experience.map((exp, index) => (
            <div className="resume-item" key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="resume-item-main">{exp.role || 'Role'} at {exp.company || 'Company'}</span>
                <span>{exp.duration}</span>
              </div>
              <p className="resume-item-sub">{exp.description}</p>
            </div>
          ))}
        </>
      )}

      {data.education.length > 0 && (
        <>
          <h2>Education</h2>
          {data.education.map((edu, index) => (
            <div className="resume-item" key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="resume-item-main">{edu.degree || 'Degree'}</span>
                <span>{edu.years}</span>
              </div>
              <div className="resume-item-sub">{edu.institution || 'Institution'}</div>
            </div>
          ))}
        </>
      )}

      {data.skills.length > 0 && (
        <>
          <h2>Skills</h2>
          <div className="skills-list" style={{ marginTop: '0.5rem' }}>
            {data.skills.join(' • ')}
          </div>
        </>
      )}
    </div>
  );
}

export default ResumePreview;
