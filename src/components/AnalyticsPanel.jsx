import React from 'react';

function AnalyticsPanel({ data, resumeId, features, onSave, onDownload, onEmail, onWhatsapp }) {
  // Simple word count by concatenating text
  const getAllText = () => {
    let text = `${data.profile.fullName} ${data.profile.summary} `;
    data.experience.forEach(exp => {
      text += `${exp.company} ${exp.role} ${exp.duration} ${exp.description} `;
    });
    data.education.forEach(edu => {
      text += `${edu.institution} ${edu.degree} ${edu.years} `;
    });
    text += data.skills.join(' ');
    return text.trim();
  };

  const text = getAllText();
  const charCount = text.length;
  // Simple word count, split by whitespace
  const words = text ? text.split(/\s+/) : [];
  const wordCount = words.length > 0 && words[0] !== "" ? words.length : 0;
  
  // Paragraph count (approximate using newlines in summary and descriptions + sections)
  // Let's just say 1 + each description + summary is a paragraph
  const paraCount = 1 + (data.profile.summary ? 1 : 0) + data.experience.filter(e => e.description).length;

  // Reading time (assume 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="tools-panel">
      <div className="analytics">
        <div className="analytics-item">
          ID: <span>{resumeId}</span>
        </div>
        <div className="analytics-item">
          Words: <span style={{ color: wordCount > 700 ? 'red' : 'inherit' }}>{wordCount}</span>
        </div>
        <div className="analytics-item">
          Chars: <span>{charCount}</span>
        </div>
        <div className="analytics-item">
          Paragraphs: <span>{paraCount}</span>
        </div>
        <div className="analytics-item">
          Read Time: <span>{readingTime} min</span>
        </div>
        {wordCount > 700 && (
          <span className="warning" style={{ margin: 0 }}>Warning: Word count exceeds 700!</span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="btn" onClick={onSave}>Save Progress</button>
        {features.download && <button className="btn btn-secondary" onClick={onDownload}>Get PDF</button>}
        {features.email && <button className="btn btn-secondary" onClick={onEmail}>Email</button>}
        {features.whatsapp && <button className="btn btn-secondary" onClick={onWhatsapp}>WhatsApp</button>}
      </div>
    </div>
  );
}

export default AnalyticsPanel;
